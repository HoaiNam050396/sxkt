import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// import Siderbar from '../Sidebar';
// import Header from '../Header';

const routes = [
  {
    path: ['/detergent/:detergentId/:formulaId', '/detergent'],
    component: ''
  }
];

const RouteWithSubRoutes = route => {
  return (
    <Route
      exact
      // eslint-disable-next-line react/destructuring-assignment
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <div className="content">
          <route.component {...props} routes={route.routes} />
        </div>
      )}
    />
  );
};

// eslint-disable-next-line react/prop-types
const Dashboard = ({ userRoles = [] }) => {
  const renderRouteWithSubRoutes = () => {
    const result = [];

    routes.forEach(route => {
      result.push(<RouteWithSubRoutes key={route.path} {...route} />);
    });

    return result;
  };

  const messageStyle = {
    fontFamily: 'ClanPro-Medium',
    fontSize: '25px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    textAlign: 'center'
  };
  const layoutWarningMessageWhenUserInactive = () => {
    if (userRoles[0] === 'NA') {
      return (
        <p style={messageStyle}>
          <FormattedMessage
            id="header.messageWarningUserDeactive"
            defaultMessage="Your account has been deactivated. Please contact your site
          administrator."
          />
        </p>
      );
    }
    return <Switch>{renderRouteWithSubRoutes()}</Switch>;
  };
  return (
    <>
      {/* <Header /> */}
      <Layout style={{ minHeight: '100vh' }}>
        {/* <Siderbar /> */}
        <Layout id="Content" className="right-side">
          {layoutWarningMessageWhenUserInactive()}
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
