import { makeStyles } from "@material-ui/core/styles";

import colors from "../../util/Colors";

const useStyles = makeStyles((theme) => ({
  title: {
    color: colors.orange,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
    fontSize: 30,
  },
  texto: {
    color: colors.gray,
    marginBottom: 10,
    fontSize: 20,
  },
}));

export default useStyles;
