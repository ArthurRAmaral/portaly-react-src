//From depedencies
import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

//From Material-ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//from components
import MostrarProdutos from "../MostraProdutos";

//From utils
import ApiProdutos from "../../services/ApiProdutos";

//Stylesheet
import "./Tabs.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function getProductByids(setProdutos) {
  ApiProdutos.getAllPublishedProducts().then((res) => {
    setProdutos(res.data);
  });
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [produtos, setProdutos] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handlesetProdutos = (produtos) => {
    setProdutos(produtos);
  };

  return (
    <div className={classes.root} id="tabs">
      <AppBar position="static" className="category_tab" color="default">
        <Tabs
          className="tab"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          aria-label="full width tabs example"
        >
          <Tab label="Mais Vendidos" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          className="product_tab"
          value={value}
          index={0}
          dir={theme.direction}
        >
          {produtos
            ? MostrarProdutos(produtos)
            : getProductByids(handlesetProdutos)}
        </TabPanel>
        <TabPanel
          className="product_tab"
          value={value}
          index={1}
          dir={theme.direction}
        >
          Item Two
        </TabPanel>
        <TabPanel
          className="product_tab"
          value={value}
          index={2}
          dir={theme.direction}
        >
          Item Three
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
