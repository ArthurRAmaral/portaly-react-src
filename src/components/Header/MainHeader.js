//From dependencies
import React, { Fragment } from "react";

//From components
import Logo from "./Logo";
import Busca from "./Busca";
import Carrinho from "./Carrinho";
import Categorias from "./Categorias";

const MainHeader = () => {
   return (
      <Fragment>
         <div className="main-header">
            <div className="center-content">
               <Logo />
               <Busca />
               <Carrinho />
            </div>
            <nav className="menu brown darken-1 center-align">
               <Categorias />
            </nav>
         </div>
      </Fragment>
   );
};

export default MainHeader;
