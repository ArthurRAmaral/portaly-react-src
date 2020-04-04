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

import EscolherItem from "./EscolherAlizar";
// import EscolherDobradica from "./EscolherDobradica";
// import EscolherFechaduras from "./EscolherFechaduras";
// import EscolherBatente from "./EscolherBatente";
// import EscolherPorta from "./EscolherPorta";

import Footer from "../Footer";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
   },
   button: {
      marginRight: theme.spacing(1),
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
}));

const theme = createMuiTheme({
   palette: {
      primary: {
         // light: will be calculated from palette.primary.main,
         main: "#6d4c41",
         // dark: will be calculated from palette.primary.main,
         // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
         light: "#0066ff",
         main: "#0044ff",
         // dark: will be calculated from palette.secondary.main,
         contrastText: "#ffcc00",
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // Por exemplo, mude de Red 500 para Red 300 ou Red 700.
      tonalOffset: 0.2,
   },
});

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

function getStepContent(step) {
   switch (step) {
      case 0:
         return <EscolherItem categoriaSlug="alizar" />;
      case 1:
         return <EscolherItem categoriaSlug="dobradica" />;
      case 2:
         return <EscolherItem categoriaSlug="fechadura" />;
      case 3:
         return <EscolherItem categoriaSlug="marco-batente" />;
      case 4:
         return <EscolherItem categoriaSlug="porta" />;
      case 5:
         return <Footer />;
      default:
         return "Unknown step";
   }
}

export default function HorizontalLinearStepper() {
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();

   const isStepOptional = (step) => {
      return getOptionalSteps().includes(step);
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

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
                        <StepLabel {...labelProps}>{label}</StepLabel>
                     </Step>
                  );
               })}
            </Stepper>
            <div>
               {activeStep === steps.length ? (
                  <div>
                     <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                     </Typography>
                     <Button onClick={handleReset} className={classes.button}>
                        Reset
                     </Button>
                  </div>
               ) : (
                  <div>
                     <Card className={classes.instructions}>
                        {getStepContent(activeStep)}
                     </Card>
                     <div>
                        <Button
                           disabled={activeStep === 0}
                           onClick={handleBack}
                           className={classes.button}
                        >
                           Back
                        </Button>
                        {isStepOptional(activeStep) && (
                           <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSkip}
                              className={classes.button}
                           >
                              Skip
                           </Button>
                        )}

                        <Button
                           focusVisibleClassName="btn"
                           variant="contained"
                           color="primary"
                           onClick={handleNext}
                           className={classes.button}
                        >
                           {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </ThemeProvider>
      </div>
   );
}
