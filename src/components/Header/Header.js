import React, { Fragment } from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader"
import "../../css/Header.css";

const Headers = (produtos) => {
   
   console.log(produtos);

    return (
      <Fragment>
        <header  className="header">
          <TopHeader />
          {/* <MainHeader /> */}
        </header>
      </Fragment>
    );
}

export default Headers;
