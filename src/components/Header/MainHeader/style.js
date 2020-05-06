import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../util/Colors'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 150,
    backgroundColor: colors.orangeLightLight,
    padding: theme.spacing(2),
  },
}));

export default useStyles;