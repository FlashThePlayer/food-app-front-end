import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";

import Layout from "./HOC/Layout/Layout";
import HomePage from "./HomePage/HomePage";
import Authentication from "./Authentication/Authentication";

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" render={(props) => <Authentication {...props} />} />
        <Route path="/" render={(props) => <HomePage {...props}/>} />
        <Redirect to="/"/>
      </Switch>
    </Layout>
  );
};

export default withRouter(App);
