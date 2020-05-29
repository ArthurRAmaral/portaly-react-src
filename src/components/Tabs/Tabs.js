//From depedencies
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { connect } from "react-redux";

//From Material-ui
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

//from components
import MostrarProdutos from "../MostraProdutos/MostraProdutos";
import Loading from "../loading/LineLoading";

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

function produtosRecentes(props) {
  let produtos = [];
  Object.values(props.produtos).map((produto) => {
    produto.forEach((prod) => produtos.push(prod));
  });
  produtos = produtos.sort((product1, product2) => {
    const date1 = new Date(product1.date_created);
    const date2 = new Date(product2.date_created);
    return date2 - date1;
  });
  return produtos;
}

function produtosOnSale(props) {
  let produtos = [];
  Object.values(props.produtos).map((produto) => {
    produto.forEach((prod) => produtos.push(prod));
  });
  produtos = produtos.filter((prod) => prod.on_sale);
  return produtos;
}

function produtosAleatoriosHome(props) {
  let produtos = [];
  Object.values(props.produtos).map((produto) => {
    produto.forEach((prod) => produtos.push(prod));
  });
  return shuffleArray(produtos);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Todos Produtos" />
          <Tab label="Mais Recentes" />
          <Tab label="Ofertas" />
        </Tabs>
      </AppBar>
      {!props.produtos ? (
        <Loading className={classes.loading} />
      ) : (
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChange={handleChangeIndex}
        >
          <TabPanel
            className="product_tab"
            value={value}
            index={0}
            dir={theme.direction}
          >
            {MostrarProdutos(produtosAleatoriosHome(props))}
          </TabPanel>
          <TabPanel
            className="product_tab"
            value={value}
            index={1}
            dir={theme.direction}
          >
            {MostrarProdutos(produtosRecentes(props).slice(0, 20))}
          </TabPanel>
          <TabPanel
            className="product_tab"
            value={value}
            index={2}
            dir={theme.direction}
          >
            {MostrarProdutos(produtosOnSale(props))}
          </TabPanel>
        </SwipeableViews>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({ produtos: state.produtos });

export default connect(mapStateToProps, null)(FullWidthTabs);
