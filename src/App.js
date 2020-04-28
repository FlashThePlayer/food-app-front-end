import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

import Layout from "./HOC/Layout/Layout";
import Spinner from "./UI/Spinner/Spinner";
import HomePage from "./HomePage/HomePage";
import Authentication from "./Authentication/Authentication";
import defaultClient from "./GraphQl/ApolloClient";

const App = (props) => {
  return (
    <ApolloProvider client={defaultClient}>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route
              path="/auth"
              render={(props) => <Authentication {...props} />}
            />
            <Route path="/" render={(props) => <HomePage {...props} />} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    </ApolloProvider>
  );
};

export default withRouter(App);
