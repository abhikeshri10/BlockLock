import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from './Layout';

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
export default UserRoute;
