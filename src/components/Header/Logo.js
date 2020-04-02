//From dependencies
import React from "react";
import { Link } from "react-router-dom";
import InitPath from "../../services/InitPath";

const Logo = () => {
   return (
      <Link to={`${InitPath}`}>
         <img
            src="https://demo.skeavee.com/portaly/wp-content/uploads/2020/03/Portaly_PNG_Background.png"
            alt=""
            className="logo center-children"
         />
      </Link>
   );
};

export default Logo;
