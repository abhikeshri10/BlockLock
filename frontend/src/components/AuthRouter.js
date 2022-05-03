import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Users/Login';
import Home from './Home';
import Layout from './Users/Layout';
import UserRoute from './Users/UserRoute';
import FileUpload from './Users/FileUpload';
const AuthRouter = () => {
  return (
    <Router>
      <Route path='/' component={Layout} />
      <Switch>
        <UserRoute path='/login' exact component={Login} />
        <UserRoute path='/file_upload' exact component={FileUpload} />
      </Switch>
    </Router>
  );
};

export default AuthRouter;
