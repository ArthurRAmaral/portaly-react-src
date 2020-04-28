//From dependencies
import React from "react";
import { Link } from "react-router-dom";
import InitPath from "../../../services/InitPath";

//Material-ui
import useStyles from './style'

const Logo = () => {
  const classes = useStyles();

  return (
    <Link to={`${InitPath}`}>
      <img
        src="https://portaly.demo.skeavee.com/wp-content/uploads/2020/04/Portaly_Logo_fundo_branco__fee74.png"
        alt="imagem-portaly"
        className={classes.img}
      />
    </Link>
  );
};

export default Logo;
