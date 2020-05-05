//From dependencies
import React from "react";
import { NavLink } from "react-router-dom";

//From utils
import ApiCategorias from "../../../services/ApiCategorias";

//From services
import InitPath from "../../../services/InitPath";

//Materail-ui
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Divider from "@material-ui/core/Divider";

//Stylesheet
import useStyles from "./style";

const getCategorias = (setCategorias) => {
  ApiCategorias.getAllCategorias().then((res) => setCategorias([...res.data]));
};

const Categorias = () => {
  const classes = useStyles();
  const [categorias, setCategorias] = React.useState([]);

  function setCat(categorias) {
    setCategorias(categorias);
  }

  return (
    <div className={classes.second_header}>
      <MenuList className={classes.menu}>
        <div className={classes.div_link}>
          <MenuItem
            exact
            key={`Todos`}
            className={classes.link}
            component={NavLink}
            to={`${InitPath}/`}
          >
            <Typography>Home</Typography>
          </MenuItem>
        </div>
        {!categorias.length
          ? getCategorias(setCat)
          : categorias.map((cat) => (
              <div className={classes.div_link}>
                <Divider
                  className={classes.Line}
                  orientation="vertical"
                  flexItem
                />
                <MenuItem
                  key={`categorias${cat.id}`}
                  className={classes.link}
                  component={NavLink}
                  to={`${InitPath}/categoria/${cat.id}`}
                >
                  <Typography>{cat.name}</Typography>
                </MenuItem>
              </div>
            ))}
      </MenuList>
      <div className={classes.botao}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          className={classes.button_link}
          component={NavLink}
          to="/montesuaporta"
        >
          Monte a sua porta
          <ArrowForwardIcon className={classes.arrow} fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default Categorias;
