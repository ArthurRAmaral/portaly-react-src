//From dependencies
import React from "react";
import { NavLink } from "react-router-dom";

//From utils
import ApiCategorias from "../../../util/ApiCategorias";

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
import "./Categorias.css";

const getCategorias = (setCategorias) => {
  ApiCategorias.getAllCategorias().then((res) => setCategorias([...res.data]));
};

const Categorias = () => {
  const [categorias, setCategorias] = React.useState([]);

  function setCat(categorias) {
    setCategorias(categorias);
  }

  return (
    <div className="second_header">
      <MenuList className="menu">
        <div className="div_link">
          <MenuItem
            exact
            key={`Todos`}
            className="link"
            component={NavLink}
            to={`${InitPath}/`}
          >
            <Typography>Home</Typography>
          </MenuItem>
        </div>
        {!categorias.length
          ? getCategorias(setCat)
          : categorias.map((cat) => (
              <div className="div_link">
                <Divider className="Line" orientation="vertical" flexItem />
                <MenuItem
                  key={`categorias${cat.id}`}
                  className="link"
                  component={NavLink}
                  to={`${InitPath}/categoria/${cat.id}`}
                >
                  <Typography>{cat.name}</Typography>
                </MenuItem>
              </div>
            ))}
      </MenuList>
      <div className="botao">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          className="button_link"
          component={NavLink}
          to="/montesuaporta"
        >
          Monte a sua porta
          <ArrowForwardIcon className="arrow" fontSize="large" />
        </Button>
      </div>
    </div>
  );
};
export default Categorias;
