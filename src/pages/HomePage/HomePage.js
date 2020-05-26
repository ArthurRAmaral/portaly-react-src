//From depedencies
import React from "react";

//From components
import Slide from "../../components/Slide/Slide";
import Tabs from "../../components/Tabs/Tabs";

//From Material-ui
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { ThemeProvider } from "@material-ui/core/styles";

//From here
import theme from "../theme";
import useStyles from "./style";

//From util
import colors from "../../util/Colors";

const HomePage = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "inline-table",
        }}
      >
        <Slide />
        <Grid container direction="column" alignItems="center" justify="center">
          <Box
            borderBottom={1}
            margin={5}
            style={{
              borderColor: colors.orangeDark,
            }}
          >
            <Typography className={classes.title} variant="h3">
              Conheça Nossos Produtos
            </Typography>
          </Box>
          <Divider
            className="line_title_section"
            variant="middle"
            orientation="horizontal"
            flexItem
          />
          <Tabs />
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
