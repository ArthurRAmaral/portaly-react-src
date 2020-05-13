import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    maxHeight: 600,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    // maxWidth: 100,
    "& img": {
      OObjectFit: "scale-down",
      maxWidth: 100,
    },
  },
  tabPanel: {
    maxHeight: 600,
    "& img": {
      maxHeight: 550,
    },
  },
}));

export default useStyles;
