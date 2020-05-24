//From depedencies
import React from "react";

//From Material-ui
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";

//From util
import Montador from "../../../util/MontadorPorta";
import Carrinho from "../../../util/Carrinho";
import colors from "../../../util/Colors";

//From here
import useStyles, { useQontoStepIconStyles, QontoConnector } from "./style";
import EscolherItems from "../EscolherItem";
import FecharMontagem from "../FecharMontagem";

import ApiProdutos from "../../../services/ApiProdutos";

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

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [btnvalid, setBtnValid] = React.useState(true);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

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
    ApiProdutos.createKit(Montador.getDados()).then((res) => {
      for (let i = 0; i < Montador.getQuantidade(); i++)
        Carrinho.addItem(res.data.id);
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
    <Grid>
      <Grid container direction="row" alignItems="center" justify="center">
        <Box
          borderBottom={2}
          marginBottom={10}
          marginTop={5}
          style={{ borderColor: colors.orangeDark }}
        >
          <Typography variant="h3" className={classes.title}>
            Monte sua porta
          </Typography>
        </Box>
      </Grid>
      <Box border={1} borderColor={colors.orangeDark}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box border={1} borderColor={colors.orangeDark}>
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
      </Box>
    </Grid>
  );
}
