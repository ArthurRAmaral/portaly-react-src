//From dependencies
import { makeStyles } from "@material-ui/core/styles";

//From util
import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 800,
    color: colors.orange,
  },
  img: {
    marginLeft: 15,
    maxWidth: 50,
  },
  textColor: {
    color: colors.orangeDark,
  },
  textTotal: {
    color: colors.orangeDark,
    fontWeight: "bold",
  },
  button: {
    color: colors.white,
    backgroundColor: colors.orangeDark,
    padding: 15,
    "&:focus": {
      backgroundColor: colors.orange,
      color: colors.black,
    },
    "&:hover": {
      backgroundColor: colors.orange,
    },
  },
}));

export default useStyles;
