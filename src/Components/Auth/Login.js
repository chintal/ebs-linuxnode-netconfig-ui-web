
import React, { useState } from "react";

import { netconfigApi } from "../../Api";
import { setUserSession } from "../../Utils/Auth";

import AuthLayout from "./Layout";
import { 
    Button, 
    Form, 
    Message
} from "semantic-ui-react";


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
            return <Message 
                error     
                header="Login Failed"
                content={e} 
                icon="exclamation triangle"
            />;
        }
    }

    return(
        <AuthLayout header="Network Configuration Utility">
            <Form.Input 
              fluid 
              icon="user"
              iconPosition="left"
              placeholder="Username"
              className="auth-input-field" 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Form.Input 
              fluid 
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              className="auth-input-field" 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {renderErrorMessage(error)}

            <Button 
                color="teal" fluid size="huge"
                type="button" 
                disabled={loading} 
                onClick={handleLogin}
            >
            {loading ? "Loading..." : "Login"}
            </Button>
        </AuthLayout>
    )
}

export default Login;
