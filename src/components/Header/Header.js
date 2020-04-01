//From dependencies
import React, { Component, Fragment } from "react";

//From components
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import "../../css/Header.css";

class Headers extends Component {
   render() {
      return (
         <Fragment>
            <header className="header">
               <TopHeader />
               <MainHeader />
            </header>
         </Fragment>
      );
   }
}

export default Headers;
