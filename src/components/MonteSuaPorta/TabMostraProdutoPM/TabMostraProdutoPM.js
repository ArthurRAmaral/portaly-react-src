//From depedencies
import React from "react";
import PropTypes from "prop-types";

//From Material-ui
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

//From utils
import Montador from "../../../util/MontadorPorta";

//From here
import useStyles from "./style";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { produtosAtuais, categoriaSlug, disabledButton } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const montaKitHandle = (id) => {
    let produto;
    produtosAtuais.forEach((prod) => {
      if (prod.id == id) produto = prod;
    });

    Montador.setItem(categoriaSlug, produto);

    disabledButton(false);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid>
        {produtosAtuais.map((produto, index) => (
          <TabPanel
            key={`image${produto.id}`}
            value={value}
            index={index}
            className={classes.tabPanel}
          >
            <img src={produto.images[0].src} alt="" />
          </TabPanel>
        ))}
      </Grid>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          aria-label="scrollable force tabs example"
        >
          {produtosAtuais.map((produto, index) => (
            <Tab
              className={classes.tab}
              key={`tab${produto.id}`}
              label={
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  onClick={() => montaKitHandle(produto.id)}
                >
                  <Grid item xs={8}>
                    <Typography className={classes.name}>
                      {produto.name}
                    </Typography>
                    <Typography className={classes.title}>
                      {`R$${produto.price}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <img src={produto.images[0].src} alt="" />
                  </Grid>
                </Grid>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
    </Grid>
  );
}
