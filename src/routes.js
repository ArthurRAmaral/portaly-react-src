import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.js";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;
