import { makeStyles } from "@material-ui/core/styles";

import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  second_header: {
    width: "100%",
    height: 53,
    display: "inline-flex",
  },
  menu: {
    width: "84%",
    padding: 0,
    display: "inline-flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  first_div_link: {
    borderLeft: "0px solid",
  },
  div_link: {
    width: "14%",
    height: "100%",
    borderCollapse: "collapse",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.orangeDarkDark,
  },
  link: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: 16,
    height: "100%",
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.orangeDarkDark,
  },
  Line: {
    height: "65%",
    alignSelf: "center",
    color: colors.orangeLight,
    width: "2px",
  },
  botao: {
    width: "16%",
    background: colors.orangeLight,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.orangeDarkDark,
  },
  button_link: {
    height: "100%",
    width: "100%",
    color: colors.orangeDarkDark,
  },
  arrow: {
    marginLeft: "20px",
  },
  texto: {
    color: colors.orangeDarkDark,
  },
}));

export default useStyles;
