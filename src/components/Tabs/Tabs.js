//From depedencies
import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

//From Material-ui
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

//from components
import MostrarProdutos from "../MostraProdutos/MostraProdutos";

//From utils
import ApiProdutos from "../../services/ApiProdutos";

//From here
import useStyles from "./style";

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

function getProductByids(setProdutos, setProdutosOnSale) {
  ApiProdutos.getAllPublishedProducts().then((res) => {
    setProdutos(res.data);
  });
  ApiProdutos.getAllOnSaleProducts().then((res) => {
    setProdutosOnSale(res.data);
  });
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [produtos, setProdutos] = React.useState();
  const [produtosOnSale, setProdutosOnSale] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root} id="tabs">
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          centered
        >
          <Tab label="Mais Vendidos" />
          <Tab label="Destaques" />
          <Tab label="Ofertas" />
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
            : getProductByids(setProdutos, setProdutosOnSale)}
        </TabPanel>
        <TabPanel
          className="product_tab"
          value={value}
          index={1}
          dir={theme.direction}
        >
          {produtos
            ? MostrarProdutos(produtos)
            : getProductByids(setProdutos, setProdutosOnSale)}
        </TabPanel>
        <TabPanel
          className="product_tab"
          value={value}
          index={2}
          dir={theme.direction}
        >
          {produtosOnSale
            ? MostrarProdutos(produtosOnSale)
            : getProductByids(setProdutos, setProdutosOnSale)}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
