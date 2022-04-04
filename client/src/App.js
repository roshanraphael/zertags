import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";



import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import GenerateQR from "./components/generateQR/GenerateQR";
import Item from "./components/item/Item";
import "./App.css";

// import Particles from 'react-particles-js';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
const App = () => {
  return (
    <Provider store={store}>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}

        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/:id" component={ItemPage} /> */}
              <PrivateRoute exact path="/generateQR" component={GenerateQR} />
              <PrivateRoute exact path="/item/:id" component={Item} />
            </Switch>
            {/* <Particles
              params={{
                particles: {
                  number: {
                    value: 200,
                    density: {
                      enable: true,
                      value_area: 1000,
                    }
                  },
                },
              }}
            /> */}
          </div>
        </Router>
      {/* </AlertProvider> */}
    </Provider>
  );
}
export default App;
