import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PatientLayout from '../components/Patient/PatientLayout';
import Auth from './Auth';

const PrivatePatientRoute = ({ component: Component, ...rest }) => {
  const check = () => {
    return Auth.loggedIn() && !Auth.isdoctor();
  };
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        check() ? (
          <PatientLayout>
            <Component {...props} />
          </PatientLayout>
        ) : (
          <Redirect to='/patient/' />
        )
      }
    />
  );
};
export default PrivatePatientRoute;
