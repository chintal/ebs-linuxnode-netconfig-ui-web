
import React, {useEffect, useState} from "react";
import { BrowserRouter, Switch, Route, NavLink, Redirect } from "react-router-dom";

import About from "./About";
import Login from "./Login";
import Wifi from "./Wifi";
import PublicRoute from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";
import { getToken, removeUserSession } from "./Utils/Auth";
import axios from "axios";


function App() {

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
      const token = getToken();
      if (!token){
        return;
      }

      axios.get("http://localhost:8039/api/verifyToken", {
        headers: {"Authorization": `Bearer ${token}`}
      }).then(response => {
        setAuthLoading(false);
      }).catch(error => {
        removeUserSession()
        setAuthLoading(false);
      })
  }, []);

  if (authLoading && getToken()) {
    return <div className="content"> Checking Authentication ... </div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Redirect exact from="/" to="/wifi" />
        <div className="header">
          <NavLink activeClassName="active" to="/wifi">Wifi</NavLink>
          <NavLink activeClassName="active" to="/about">About</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route path="/about" component={About} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/wifi" component={Wifi} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
