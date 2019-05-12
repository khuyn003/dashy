import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Hello from 'pages/Hello';
import Welcome from 'pages/Welcome';
import Layout from 'layouts';
import {
  ROUTE_MAIN,
  ROUTE_HELLO
} from 'app-constants';

const LayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )} />
  )
};

export default function Page() {
  return (
    <Router>
      <React.Fragment>
        <LayoutRoute path={ROUTE_MAIN} component={Welcome} exact />
        <LayoutRoute path={ROUTE_HELLO} component={Hello} />
      </React.Fragment>
    </Router>
  );
}
