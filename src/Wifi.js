import React from "react";
import { getUser, removeUserSession } from "./Utils/Auth";

const Wifi = (props) => {
    
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login')
    }
    
    return(
        <div>
            Wifi Configuration Page <br />
            Logged in as {user}<br />
            <input 
                type="button" 
                value="Logout" 
                onClick={handleLogout} 
            />
        </div>
    )
}

export default Wifi;
