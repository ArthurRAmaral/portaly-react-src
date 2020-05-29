import { makeStyles } from "@material-ui/core/styles";

//From util
import colors from "../../util/Colors";

const useStyles = makeStyles((theme) => ({
  title: {
    color: colors.orangeDark,
    fontWeight: "bold",
  },
}));

export default useStyles;
