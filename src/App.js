import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import Login from './lib/Login';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Devices from './pages/Devices/Devices';
import AdminNavbar from './pages/Admin/AdminNavbar';
import PaymentOption from './pages/Home/PaymentOption/PaymentOption';
import PrivateRoute from './lib/PrivateRoute';
import MyDevice from './pages/MyDevice/MyDevice';


function App() {
  return (
    <Router>

      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path='/devices'>
          <Devices></Devices>
        </PrivateRoute>
        <PrivateRoute path='/payment/:id'>
          <PaymentOption></PaymentOption>
        </PrivateRoute>
        <PrivateRoute path='/myDevice'>
          <MyDevice></MyDevice>
        </PrivateRoute>
        <PrivateRoute path='/admin'>
          <AdminNavbar></AdminNavbar>
        </PrivateRoute>
      </Switch>

    </Router>
  );
}

export default App;
