import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

//from util
import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    alignItems: theme.shape,
    minHeight: theme.spacing(50),
    width: theme.spacing(100),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepAtual: {
    fontWeight: "bold",
  },
  title: {
    color: colors.orangeDark,
    fontWeight: "bold",
  },
}));

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: colors.orangeDestaque,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: colors.orangeDark,
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: colors.orangeDark,
    },
  },
  completed: {
    "& $line": {
      borderColor: colors.orangeDark,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export default useStyles;

export { useQontoStepIconStyles, QontoConnector };
