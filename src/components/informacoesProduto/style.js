import { makeStyles } from "@material-ui/core/styles";

import colors from "../../util/Colors";

const useStyles = makeStyles((theme) => ({
  caminho: {
    color: colors.orange,
    marginBottom: 10,
    fontSize: 15,
  },
  title: {
    color: colors.orange,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 30,
  },
  texto: {
    color: colors.orange,
    marginBottom: 10,
    fontSize: 20,
  },
  divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  price: {
    color: colors.orange,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
  },
  icon: {
    color: colors.orange,
    marginRight: 5,
  },
  quantidade: {
    color: colors.orange,
    fontSize: 20,
  },
  button: {
    backgroundColor: colors.orangeDark,
    "&:hover": {
      backgroundColor: colors.orange,
    },
  },
}));

export default useStyles;
