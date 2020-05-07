//From depedencies
import React from "react";

//From components
import Slide from "../components/Slide/Slide";
import Tabs from "../components/Tabs/Tabs";

//From Material-ui
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

//From css
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        display: "inline-table",
      }}
    >
      {/* <Slide /> */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <Typography className="font_title_section" variant="h3">
          Ultimos Produtos
        </Typography>
        <Divider
          className="line_title_section"
          variant="middle"
          orientation="horizontal"
          flexItem
        />
        {/* <Tabs /> */}
      </div>
    </div>
  );
};

export default HomePage;
