import React, { Fragment } from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import "../../css/Header.css";

const Headers = categorias => {
   return (
      <Fragment>
         <header className="header">
            <TopHeader />
            <MainHeader categorias={categorias} />
         </header>
      </Fragment>
   );
};

export default Headers;
