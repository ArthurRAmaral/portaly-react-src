import { makeStyles } from "@material-ui/core/styles";

import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: colors.orangeDarkDark,
    color: colors.white,
    height: 50,
    paddingLeft: 50,
  },
  icon: {
    marginBottom: -6,
    marginRight: 20,
    marginLeft: 20,
  },
  span: {
    marginRight: 20,
  },
  svg: {
    marginBottom: -6,
    paddingLeft: 4,
    paddingRight: 4,
  },
  link: {
    marginBottom: -6,
    marginRight: 20,
    marginLeft: 20,
    color: colors.white,
    fontWeight: "bold",
    "&:hover": {
      fontSize: "1.2em",
    },
  },
}));

export default useStyles;
