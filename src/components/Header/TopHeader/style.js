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
  svg: {
    marginBottom: -6,
    paddingLeft: 4,
    paddingRight: 4,
  },
  link: {
    marginBottom: -6,
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "bold",
    height: "100%",
    width: "100%"
  },
  text: {
    color: colors.white,
    textTransform: 'capitalize'
  },
  button: {
    height: "100%",
    width: "130px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: colors.orangeDark
    }
  },
}));

export default useStyles;
