import React from 'react';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';
const Logout = () => {
  Auth.logoutUser();
  return <Redirect to='/' />;
};

export default Logout;
