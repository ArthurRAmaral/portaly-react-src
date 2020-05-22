import { makeStyles } from "@material-ui/core/styles";

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
}));

export default useStyles;
