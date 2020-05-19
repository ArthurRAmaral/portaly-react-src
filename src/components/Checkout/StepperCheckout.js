//From depdencies
import React from "react";
import { connect } from "react-redux";

//From Material-ui
import { ThemeProvider } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";

//From checkout
import clsx from "clsx";
import Carrinho from "./Carrinho";
import Cadastro from "./Cadastro";
import Frete from "./Frete";
import Pagamento from "./Pagamento";
import useStyles from "./styles/style";
import theme from "./styles/theme";
import useStepIconStyles from "./styles/IconStyle";
import funcoesCarrinho from "../../util/Carrinho";

//From util
import PagSeguro from "../../util/PagSeguro";
import btnPagSeguro from "../../util/btnPagSeguro";
import ApiPedidos from "../../services/ApiPedidos";
import ApiCupom from "../../services/ApiCupom";

function getSteps() {
  return ["Carrinho", "Cadastro", "Frete", "Pagamento"];
}

function getOptionalSteps() {
  return [];
}

function getStepContent(props, step, validCode) {
  switch (step) {
    case 0:
      return <Carrinho />;
    case 1:
      return <Cadastro />;
    case 2:
      return <Frete />;
    case 3:
      (async () => {
        const varCadastro = "dadosCadastro";
        const varFrete = "dadosFrete";
        let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
        let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));
        //Forma array de produtos
        const dadosProdutos = await createPagseguroProducts(props);
        //Froma json de comprador
        const dadosComprador = await createPagseguroBuyer(dadosCadastro);
        //Forma json de entrega
        const dadosEntrega = await createPagseguroShipping(dadosFrete);

        dados = {
          dadosProdutos,
          dadosComprador,
          dadosEntrega,
        };
        if (dadosProdutos.length > 0 && contador === 0) {
          contador++;
          PagSeguro.gerarPagamento(dados).then((codigo) => {
            //Cria Ordem

            pagamento(props, dadosCadastro, dadosFrete);
            // if (dados.dadosProdutos.length > 0) controle = true;
            code = codigo;
            validCode(code);
            funcoesCarrinho.reset();
          });
        }
      })();
      return <Pagamento />;
    default:
      return "Unknown step";
  }
}

function StepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ShoppingCartIcon />,
    2: <AssignmentIcon />,
    3: <LocalShippingIcon />,
    4: <PaymentIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

let valorCupom = 0;

function btnHandler(quantidade) {
  return !quantidade;
}

const calculaValorItem = (price, cupom, qnt) => {
  valorCupom = Number.parseFloat(valorCupom);
  cupom = Number.parseFloat(cupom);
  const fixPrice = price;
  if (valorCupom === 0) {
    return price.split(".")[1] ? price : price + ".00";
  } else if (valorCupom >= cupom) {
    if (price <= cupom * qnt) {
      price = 1;
      valorCupom = valorCupom - (fixPrice - 1) * qnt;
    } else {
      price = price - valorCupom / qnt;
      valorCupom = 0;
    }
  } else {
    if (price <= valorCupom * qnt) {
      price = 1;
      valorCupom = valorCupom - (fixPrice - 1) * qnt;
    } else {
      price = price - cupom / qnt;
      valorCupom = valorCupom - cupom * qnt;
    }
  }
  return price.toString().split(".")[1] ? price : price + ".00";
};

const calculaCupomAmount = (cupom, qnt, total) => {
  let value;
  valorCupom = cupom[0].amount;
  if (cupom[0].discount_type == "percent") {
    value = (total / 100) * valorCupom;
    valorCupom = value;
    var retorno = (value / qnt).toFixed(2);
    return retorno;
  } else if (cupom[0].discount_type == "fixed_cart") {
    return (valorCupom / qnt).toFixed(2);
  }
};

const calculaQuantidade = (carrinho) => {
  let qnt = 0;
  for (const key in carrinho) {
    if (carrinho[key].quantidade) {
      qnt += carrinho[key].quantidade;
    }
  }
  return qnt;
};

const createPagseguroProducts = async (props) => {
  let cupom = props.cupom.join("");
  let cupomAmount = 0;
  cupom = await ApiCupom.getCoupon(cupom);
  if (cupom.data.length > 0) {
    if (
      cupom.data[0].minimum_amount <= props.carrinho.valorTotal &&
      cupom.data[0].maximum_amount >= props.carrinho.valorTotal
    ) {
      cupomAmount = await calculaCupomAmount(
        cupom.data,
        calculaQuantidade(props.carrinho),
        props.carrinho.valorTotal
      );
    }
  }
  const arrayItens = [];
  const arrayIds = [];
  for (const key in props.carrinho) {
    let item = props.carrinho[key].produto;
    const variacao = props.carrinho[key].variacao;
    const quantidade = props.carrinho[key].quantidade;
    if (item) {
      item = item[0];
      const itemToPush = {
        id: item.id,
        description: item.name + (variacao ? " (" + variacao + ")" : ""),
        amount: await calculaValorItem(
          item.price,
          cupomAmount,
          parseInt(quantidade)
        ),
        quantity: parseInt(quantidade),
        weight: parseFloat(item.weight) ? parseFloat(item.weight) : 1,
      };
      arrayIds.push(item.id);
      arrayItens.push(itemToPush);
    }
  }
  let idFrete = 1;
  while (arrayIds.includes(idFrete)) idFrete++;

  const valorFrete = props.frete.join("");
  if (valorFrete != 0) {
    const frete = {
      id: idFrete,
      description: "Frete",
      amount: valorFrete.split(".")[1] ? valorFrete : valorFrete + ".00",
      quantity: 1,
      weight: 1,
    };
    arrayItens.push(frete);
  }
  return arrayItens;
};

const createPagseguroBuyer = async (dadosCadastro) => {
  const buyer = {
    name: dadosCadastro.first_name + " " + dadosCadastro.last_name,
    email: dadosCadastro.email,
    phoneAreaCode: dadosCadastro.phone.substring(1, 3),
    phoneNumber: dadosCadastro.phone,
  };

  return buyer;
};

const createPagseguroShipping = async (dadosFrete) => {
  const shipping = {
    type: 1,
    street: dadosFrete.address_2,
    number: dadosFrete.address_1,
    complement: "",
    district: "",
    postalCode: dadosFrete.postcode,
    city: dadosFrete.city,
    state: dadosFrete.state,
    country: dadosFrete.country,
  };
  return shipping;
};

let code;

const pagamento = (props, dadosCadastro, dadosFrete) => {
  const cupom = props.cupom.join("");
  const itensCarrinho = [];
  for (const key in props.carrinho) {
    if (props.carrinho.hasOwnProperty(key)) {
      let element = props.carrinho[key].produto;
      let quantity = props.carrinho[key].quantidade;
      if (element) {
        element = element[0];
        itensCarrinho.push({
          product_id: element.id,
          quantity,
        });
      }
    }
  }
  console.log("props.frete.join()=", props.frete.join(""));
  if (contador === 1) {
    //   ApiPedidos.createOrder({
    //     payment_method: "PagSeguro",
    //     payment_method_title: "delete",
    //     set_paid: false,
    //     billing: dadosCadastro,
    //     shipping: dadosFrete,
    //     shipping_lines: [
    //       {
    //         method_id: "Padrão",
    //         method_title: "Padrão",
    //         total: props.frete.join(""),
    //       },
    //     ],
    //     coupon_lines: [
    //       {
    //         code: cupom,
    //       },
    //     ],
    //     line_items: itensCarrinho,
    //   })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  }
};

let dados = null;

let contador = 0;

function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [finalCode, setCode] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function validCode(code) {
    if (!finalCode) {
      setCode(code);
    }
  }

  const isStepOptional = (step) => getOptionalSteps().includes(step);

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={StepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Produtos adicionados ao carrinho!
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Montar outra
              </Button>
            </div>
          ) : (
            <div>
              <Card className={classes.instructions}>
                {getStepContent(props, activeStep, validCode)}
              </Card>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Voltar
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Pular
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  finalCode ? (
                    btnPagSeguro(finalCode)
                  ) : (
                    <Button
                      focusVisibleClassName="btn"
                      variant="contained"
                      color="primary"
                      disabled
                      className={classes.button}
                    >
                      Finalizar pedido
                    </Button>
                  )
                ) : (
                  <Button
                    focusVisibleClassName="btn"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={btnHandler(props.carrinho.quantidade)}
                  >
                    Próximo
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
  frete: state.frete,
  cupom: state.cupom,
});

export default connect(mapStateToProps, null)(HorizontalLinearStepper);
