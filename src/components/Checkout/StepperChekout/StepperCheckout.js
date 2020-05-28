//From depdencies
import React from "react";
import { connect } from "react-redux";

//From Material-ui

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";

//From checkout
import Carrinho from "../Carrinho/Carrinho";
import Cadastro from "../Cadastro";
import Frete from "../Frete";
import Pagamento from "../Pagamento/Pagamento";
import useStyles from "./style";

//From components
import CircleLoading from "../../loading/CircleLoading";

//From util
import PagSeguro from "../../../util/PagSeguro";
import btnPagSeguro from "../../../util/btnPagSeguro";
import ApiCupom from "../../../services/ApiCupom";

//From redux
import { salvaCupom } from "../../../redux/actions/cupomActions";

////////////
// STEPPER//
////////////
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#F0CDB1 0%, #CA9D79 50%, #A9764E 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,#F0CDB1 0%, #CA9D79 50%, #A9764E 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, #F0CDB1 0%, #CA9D79 50%, #A9764E 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, #F0CDB1 0%, #CA9D79 50%, #A9764E 100%)",
  },
});

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

////////////
///Steps////
////////////
function getSteps() {
  return ["MESA", "Cadastro", "Frete", "Pagamento"];
}

function getOptionalSteps() {
  return [];
}

function getStepContent(props, step, validCode, setCode, setValidInputs) {
  switch (step) {
    case 0:
      if (contador === 1) {
        contador = 0;
        code = null;
        setCode(code);
      }
      return <Carrinho />;
    case 1:
      if (contador === 1) {
        contador = 0;
        code = null;
        setCode(code);
      }
      return <Cadastro setValidInputs={setValidInputs} />;
    case 2:
      if (contador === 1) {
        contador = 0;
        code = null;
        setCode(code);
      }
      return <Frete setValidInputs={setValidInputs} />;
    case 3:
      (async () => {
        const varCadastro = "dadosCadastro";
        const varFrete = "dadosFrete";
        let dadosCadastro = JSON.parse(sessionStorage.getItem(varCadastro));
        let dadosFrete = JSON.parse(sessionStorage.getItem(varFrete));
        dados = null;
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
          });
        }
      })();
      return <Pagamento />;
    default:
      return "Unknown step";
  }
}

////////////
///CUPOM////
////////////
let valorCupom = 0;
let totalVal = 0;

const calculaValorItem = (price, cupom, qnt, ids, conditional, id) => {
  if (conditional === "fixed_product" && ids.length > 0) {
    if (ids.indexOf(id) > -1) {
      price = price <= cupom ? 1 : price - cupom;
    }
  } else {
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
  }
  return price.toString().split(".")[1] ? price : price + ".00";
};

const calculaCupomAmount = (cupom, qnt) => {
  if (qnt === 0) {
    return 0;
  }
  let value;
  valorCupom = cupom[0].amount;
  if (cupom[0].discount_type === "percent") {
    value = (totalVal / 100) * valorCupom;
    valorCupom = value;
    var retorno = (value / qnt).toFixed(2);
    return retorno;
  } else if (cupom[0].discount_type === "fixed_cart") {
    return (valorCupom / qnt).toFixed(2);
  } else if (cupom[0].discount_type === "fixed_product") {
    return valorCupom;
  }
};

const calculaQuantidade = (carrinho, cupom) => {
  let qnt = 0;
  for (const key in carrinho) {
    if (key === "kits" && cupom.product_ids.length === 0) {
      const kits = carrinho[key];
      for (const idDoKit in kits) {
        const quantidade = kits[idDoKit].quantidadeDoKit;
        const valor = kits[idDoKit].valorDoKit;
        totalVal += valor * quantidade;
        qnt += quantidade;
      }
    } else if (carrinho[key].quantidade) {
      if (cupom.product_ids.length > 0) {
        if (cupom.product_ids.indexOf(carrinho[key].produto[0].id) > -1) {
          totalVal += parseFloat(carrinho[key].produto[0].price);
          qnt += carrinho[key].quantidade;
        }
      } else {
        totalVal = carrinho.valorTotal;
        qnt += carrinho[key].quantidade;
      }
    }
  }
  return qnt;
};

////////////////
///PAGSEGURO////
////////////////
const createPagseguroProducts = async (props) => {
  let cupom = props.cupom.length > 0 ? props.cupom.join("") : "";
  let cupomAmount = 0;
  cupom = await ApiCupom.getCoupon(cupom);
  if (cupom.data.length > 0) {
    if (
      cupom.data[0].maximum_amount < 1 ||
      (cupom.data[0].minimum_amount <= props.carrinho.valorTotal &&
        cupom.data[0].maximum_amount >= props.carrinho.valorTotal)
    ) {
      cupomAmount = await calculaCupomAmount(
        cupom.data,
        calculaQuantidade(props.carrinho, cupom.data[0])
      );
    }
  }
  const arrayItens = [];
  const arrayIds = [];
  for (const key in props.carrinho) {
    let product_ids = [],
      discount_type = "";
    if (cupom.data.length > 0) {
      product_ids = cupom.data[0].product_ids;
      discount_type = cupom.data[0].discount_type;
    }
    if (key === "kits") {
      const kits = props.carrinho[key];
      for (const idDoKit in kits) {
        const kit = kits[idDoKit].kit[0];
        const quantidade = kits[idDoKit].quantidadeDoKit;
        const valor = kits[idDoKit].valorDoKit;
        const itemToPush = {
          id: idDoKit,
          description: kit.description,
          amount: await calculaValorItem(
            valor.toString(),
            cupomAmount,
            parseInt(quantidade),
            product_ids,
            discount_type,
            idDoKit
          ),
          quantity: parseInt(quantidade),
          weight: parseFloat(kit.weight) ? parseFloat(kit.weight) : 1,
        };
        arrayIds.push(idDoKit);
        arrayItens.push(itemToPush);
      }
    } else {
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
            parseInt(quantidade),
            product_ids,
            discount_type,
            item.id
          ),
          quantity: parseInt(quantidade),
          weight: parseFloat(item.weight) ? parseFloat(item.weight) : 1,
        };
        arrayIds.push(item.id);
        arrayItens.push(itemToPush);
      }
    }
  }
  let idFrete = 1;
  while (arrayIds.includes(idFrete)) idFrete++;

  console.log("Frete = ", props.frete);

  const valorFrete = Object.values(props.frete).length
    ? props.frete.join("")
    : "0";

  console.log("valorFrete = ", valorFrete);

  if (valorFrete !== "0") {
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
  const cupom = props.cupom.length > 0 ? props.cupom.join("") : "";
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
  props.salvaCupom("");
};

////////////
///OTHERS///
////////////
function btnHandler(quantidadeTotal) {
  return !quantidadeTotal;
}
let dados = null;
let contador = 0;

////////////////////
///MAIN_FUNCTION////
////////////////////
function HorizontalLinearStepper(props) {
  const classes = useStyles();
  const [finalCode, setCode] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  ///////////////////////
  ////VALIDATE_INPUTS////
  ///////////////////////
  const [validInputs, setValidInputs] = React.useState(true);

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
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
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
              <StepLabel StepIconComponent={StepIcon} {...labelProps} />
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
          <Grid>
            <Grid>
              {getStepContent(
                props,
                activeStep,
                validCode,
                setCode,
                setValidInputs
              )}
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid className={classes.divButtons}>
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
                    <CircleLoading />
                  )
                ) : (
                  <Button
                    focusVisibleClassName="btn"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={
                      btnHandler(props.carrinho.quantidadeTotal) || !validInputs
                    }
                  >
                    Próximo
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}

////////////
///REDUX////
////////////
const mapStateToProps = (state) => ({
  carrinho: state.carrinho,
  frete: state.frete,
  cupom: state.cupom,
});

const mapDispatchToProps = { salvaCupom };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalLinearStepper);
