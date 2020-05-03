import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import Layout from "./HOC/Layout/Layout";
import Spinner from "./UI/Spinner/Spinner";
import HomePage from "./Pages/HomePage/HomePage";
import Authentication from "./Authentication/Authentication";
import defaultClient from "./GraphQl/ApolloClient";
import { checkAuthState } from "./Store/Actions/Index";
import Logout from "./Authentication/Logout/Logout";
import CreateFood from "./Pages/CreateFood/CreateFood";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState(props.history));
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Authentication {...props} />} />
      <Route path="/" render={(props) => <HomePage {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if(isAuthenticated){
    routes = (
        <Switch>
          <Route path="/logout" render={(props) => <Logout {...props} />} />
          <Route path="/createFood" render={(props) => <CreateFood {...props} />} />
          <Route path="/" render={(props) => <HomePage {...props} />} />
          <Redirect to="/" />
        </Switch>
    );
  }

  return (
    <ApolloProvider client={defaultClient}>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </ApolloProvider>
  );
};

export default withRouter(App);
