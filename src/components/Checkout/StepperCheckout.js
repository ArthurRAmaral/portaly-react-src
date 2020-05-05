import React from "react";
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

import clsx from "clsx";
import Carrinho from "./Carrinho";
import Cadastro from "./Cadastro";
import Frete from "./Frete";
import Pagamento from "./Pagamento";
import useStyles from "./styles/style";
import theme from "./styles/theme";
import useStepIconStyles from "./styles/IconStyle";
import funcoesCarrinho from "../../util/Carrinho";

import PagSeguro from "../../util/PagSeguro";
import btnPagSeguro from "../../util/btnPagSeguro";
import ApiProdutos from "../../services/ApiProdutos";
import ApiPedidos from "../../services/ApiPedidos";

function getSteps() {
  return ["Carrinho", "Cadastro", "Frete", "Pagamento"];
}

function getOptionalSteps() {
  return [];
}

function getStepContent(step, validCode) {
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
        const dadosProdutos = await createPagseguroProducts();
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

            pagamento(dadosCadastro, dadosFrete);
            // if (dados.dadosProdutos.length > 0) controle = true;
            console.log(codigo);
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

function btnHandler() {
  return !funcoesCarrinho.getItensCarrinho().length;
}

const createPagseguroProducts = async () => {
  const arrayItens = [];
  for (const item of funcoesCarrinho.getItensCarrinho()) {
    const responseItem = await ApiProdutos.getProduto(item.product_id);
    const itemToPush = {
      id: item.product_id,
      description: responseItem.data.name,
      amount: responseItem.data.price.split(".")[1]
        ? responseItem.data.price
        : responseItem.data.price + ".00",
      quantity: parseInt(item.quantity),
      weight: parseFloat(responseItem.data.weight)
        ? parseFloat(responseItem.data.weight)
        : 1,
    };
    arrayItens.push(itemToPush);
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

const pagamento = (dadosCadastro, dadosFrete) => {
  if (contador === 1) {
    ApiPedidos.createOrder({
      payment_method: "delete",
      payment_method_title: "delete",
      set_paid: false,
      billing: dadosCadastro,
      shipping: dadosFrete,
      line_items: funcoesCarrinho.getItensCarrinho(),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
};

let dados = null;

// (async () => {
//   //Cria Ordem
//   pagamento();
//   //Forma array de produtos
//   const dadosProdutos = await createPagseguroProducts();
//   //Froma json de comprador
//   const dadosComprador = await createPagseguroBuyer();
//   //Forma json de entrega
//   const dadosEntrega = await createPagseguroShipping();

//   dados = {
//     dadosProdutos,
//     dadosComprador,
//     dadosEntrega,
//   };

//   PagSeguro.gerarPagamento(dados).then((codigo) => {
//     // if (dados.dadosProdutos.length > 0) controle = true;
//     console.log(codigo);
//     code = codigo;
//     // setBtnCode(code);
//   });
// })();

let contador = 0;

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [finalCcode, setCode] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function validCode(code) {
    if (!finalCcode) {
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

  const handleSubmit = async () => {};

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
                {getStepContent(activeStep, validCode)}
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
                  finalCcode ? (
                    btnPagSeguro(finalCcode)
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
                    disabled={btnHandler()}
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
