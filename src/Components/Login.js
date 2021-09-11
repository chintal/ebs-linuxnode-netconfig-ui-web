
import React, { useState } from "react";
import axios from "axios";

import { setUserSession } from "../Utils/Auth";


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        var loginFormData = new FormData();
        loginFormData.append('username', username);
        loginFormData.append('password', password);
        axios.post("http://localhost:8039/api/token", 
                   loginFormData
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
                setError("Required field is missing or incorrectly formatted.")
            }
            else { 
                setError("Something went wrong. Please report this error.");
            }
        });
    }

    return(
        <div>
            Login <br /> <br />
            <div>
                Username<br />
                <input 
                    type="text" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password<br />
                <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <br />
            {error && <div className="error">{error}</div>}
            <input 
                type="button" 
                value={loading ? "Loading..." : "Login"}
                disabled={loading} 
                onClick={handleLogin}
            />
        </div>
    )
}

export default Login;
