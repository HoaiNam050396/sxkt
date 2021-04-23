import React from 'react';
import { Router } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
const { createBrowserHistory } = require('history');

const history = createBrowserHistory();

history.listen(() => {});

function AppRouter() {
  // this state is from redux oidc
  // if it is authenticated redirect to the admin panel else login page will be redirected

  return (
    <div>
      <Router history={history}>
        {/* <DashboardComponent /> */}
        <h1>HAAAAAAAA</h1>
      </Router>
    </div>
  );
}

export default AppRouter;
