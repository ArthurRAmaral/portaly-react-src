import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

//from util
import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(5),
  },
  stepAtual: {
    fontWeight: "bold",
  },
  title: {
    color: colors.orangeDark,
    fontWeight: "bold",
  },
  grid: {
    width: "80%",
    marginBottom: 100,
  },
  cont: {
    fontWeight: "bold",
    fontSize: "16px",
    color: colors.orangeDarkDark,
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
