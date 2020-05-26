import { makeStyles } from "@material-ui/core/styles";

//From util
import colors from "../../../util/Colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: 200,
    "& img": {
      OObjectFit: "scale-down",
      maxWidth: 100,
    },
  },
  tabPanel: {
    width: "100%",
    maxHeight: 600,
    "& img": {
      minHeight: 400,
      maxHeight: 400,
    },
  },
  name: {
    fontSize: "14px",
    color: colors.white,
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    color: colors.white,
  },
  appBar: {
    backgroundColor: colors.orangeDark,
  },
}));

export default useStyles;
