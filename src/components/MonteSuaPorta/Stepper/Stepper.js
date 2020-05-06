import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import EscolherItems from "../EscolherItem";

import Montador from "../../../util/MontadorPorta";
import Carrinho from "../../../util/Carrinho";

import FecharMontagem from "../FecharMontagem";
import ApiProdutos from "../../../util/ApiProdutos";

import useStyles from "./style";
import theme from "./theme";

const maoDeObraID = -1;

function getSteps() {
  return [
    "Alizar",
    "Dobradiça",
    "Fechaduras",
    "Marco/Batente",
    "Porta",
    "Concluir",
  ];
}

function getOptionalSteps() {
  return [];
}

function getStepContent(step, btnHandler) {
  switch (step) {
    case 0:
      return (
        <EscolherItems
          categoriaSlug="alizar"
          key="alizar"
          disabled={btnHandler}
        />
      );
    case 1:
      return (
        <EscolherItems
          categoriaSlug="dobradica"
          key="dobradica"
          disabled={btnHandler}
        />
      );
    case 2:
      return (
        <EscolherItems
          categoriaSlug="fechadura"
          key="fechadura"
          disabled={btnHandler}
        />
      );
    case 3:
      return (
        <EscolherItems
          categoriaSlug="marco-batente"
          key="marco-batente"
          disabled={btnHandler}
        />
      );

    case 4:
      return (
        <EscolherItems
          categoriaSlug="porta"
          key="porta"
          disabled={btnHandler}
        />
      );
    case 5:
      return <FecharMontagem />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [btnvalid, setBtnValid] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

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

  const handleSubmit = () => {
    let q = 0;

    ApiProdutos.createKit(Montador.getDados()).then((res) => {
      for (let i = 0; i < Montador.getQuantidade(); i++)
        Carrinho.addItem(res.data.id);

      // window.location.reload();
    });

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
    Montador.resetMontador();
  };

  function btnHandler(valid) {
    setBtnValid(valid);
  }

  const twoFunctionsHandler = () => {
    btnHandler(true);
    handleNext();
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
                <StepLabel {...labelProps}>{label}</StepLabel>
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
                {getStepContent(activeStep, btnHandler)}
              </Card>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Voltar
                </Button>
                {/* {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Pular
                  </Button>
                )} */}
                {activeStep === steps.length - 1 ? (
                  <Button
                    focusVisibleClassName="btn"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    Adicionar ao Carrinho
                  </Button>
                ) : (
                  <Button
                    focusVisibleClassName="btn"
                    variant="contained"
                    color="primary"
                    onClick={twoFunctionsHandler}
                    className={classes.button}
                    disabled={btnvalid}
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
