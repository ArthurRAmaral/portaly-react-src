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
    // marginBottom: 10,
    marginRight: 20,
  },
  // hover: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   height: '100%',
  //   '&:hover': {
  //     backgroundColor: colors.orangeDark
  //   }
  // }
}));

export default useStyles;
