import { createMuiTheme } from "@material-ui/core/styles";

//From util
import colors from "../../util/Colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.orangeDark,
    },
    secondary: {
      light: colors.orangeLight,
      main: colors.orange,
      contrastText: colors.white,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"',
  },
});

export default theme;
