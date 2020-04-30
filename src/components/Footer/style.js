// From dependencies
import { makeStyles } from "@material-ui/core/styles";

//From utils
import colors from "../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: colors.orangeLightLight,
  },
  direitos: {
    backgroundColor: colors.orangeDarkDark,
    minHeight: 50,
  },
  portaly: {
    maxWidth: 250,
    maxHeight: 100,
  },
  titlePagamento: {
    color: colors.orangeDark,
    marginTop: 8,
  },
  tille: {
    color: colors.orangeDark,
    paddingTop: 5,
    paddingBottom: 5,
  },
  pagSeguro: {
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cartao: {
    backgroundColor: colors.orangeLight,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    Height: 20,
    marginRight: 5,
  },
  debito: {
    backgroundColor: colors.orangeLight,
    borderRadius: 5,
    padding: 5,
    minHeight: 30,
    marginRight: 5,
  },
  text: {
    color: colors.orangeDark,
  },
}));

export default useStyles;
