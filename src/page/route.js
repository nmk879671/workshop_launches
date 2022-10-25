import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ListLaunches from "./ListLaunches";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home/listLaunches" render={() => <ListLaunches />} />
      <Route path="/" render={() => <Redirect to="/home/listLaunches" />} />
    </Switch>
  </BrowserRouter>
);

export default Router;
