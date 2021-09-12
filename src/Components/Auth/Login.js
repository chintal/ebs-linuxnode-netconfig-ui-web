
import React, { useState } from "react";

import {
    Button,
    TextField
} from "@material-ui/core";

import { 
    Alert,
    AlertTitle
} from "@material-ui/lab";

import { netconfigApi } from "../../Api";
import { setUserSession } from "../../Utils/Auth";

import AuthLayout from "./Layout";
import PasswordField from "../Common/Password";


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        var loginFormData = new FormData();
        loginFormData.append('username', username);
        loginFormData.append('password', password);
        netconfigApi.post("token", loginFormData
        ).then(response => {
            setLoading(false);
            setUserSession(response.data.token, username);
            props.history.push('/netconfig');
        }).catch(error => {
            console.log(error)
            setLoading(false);
            if (error.response.status === 401 || 
                error.response.status === 400){
                    setError(error.response.data.detail);
            }
            else if (error.response.status === 422){
                // TODO See about making the error actually printable
                setError("Required field is missing or incorrectly formatted.");
            }
            else {
                setError("Something went wrong. Please report this error.");
            }
        });
    }

    const renderErrorMessage = (e) => {
        if (e){
            return <Alert severity="error">
                <AlertTitle>Login Failed</AlertTitle>
                {e} 
            </Alert>;
        }
    }

    return(
        <AuthLayout header="Network Configuration Utility">
            <TextField
              variant="outlined"
              margin="normal" 
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <PasswordField
              name="password"
              id="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {renderErrorMessage(error)}

            <Button 
                variant="contained"
                color="primary"
                disabled={loading} 
                onClick={handleLogin}
                fullWidth
            >
            {loading ? "Loading..." : "Login"}
            </Button>
        </AuthLayout>
    )
}

export default Login;
