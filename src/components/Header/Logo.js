//From dependencies
import React from "react";
import { Link } from "react-router-dom";
import InitPath from "../../services/InitPath";

const Logo = () => {
   return (
      <Link to={`${InitPath}`}>
         <img
            src="https://portaly.demo.skeavee.com/wp-content/uploads/2020/04/Portaly_Logo_fundo_branco__fee74.png"
            alt=""
            className="logo center-children"
         />
      </Link>
   );
};

export default Logo;
