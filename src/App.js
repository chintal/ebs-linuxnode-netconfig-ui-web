
import React, {
  useEffect, 
  useState}  from "react";

import { 
  BrowserRouter, 
  Switch, 
  Redirect } from "react-router-dom";

import PublicRoute from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";

import { netconfigApi } from "./Api";
import { getToken, removeUserSession } from "./Utils/Auth";

import Login from "./Components/Auth/Login";
import NetConfig from "./Components/NetConfig/Main";


function App() {

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
      netconfigApi.get("verifyToken"
      ).then(response => {
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
        <Redirect exact from="/" to="/netconfig" />
        <div className="content">
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/netconfig" component={NetConfig} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
