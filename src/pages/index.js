import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Hello from 'pages/Hello';
import Welcome from 'pages/Welcome';
import Layout from 'layouts';

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
        <LayoutRoute path="/" component={Hello} exact />
        <LayoutRoute path="/welcome" component={Welcome} />
      </React.Fragment>
    </Router>
  );
}
