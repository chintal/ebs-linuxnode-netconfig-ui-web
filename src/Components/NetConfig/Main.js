import React from "react";
import { Button } from "semantic-ui-react";
import { getUser, removeUserSession } from "../../Utils/Auth";
import Wifi from "./Wifi";

const NetConfig = (props) => {
    
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login')
    }
    
    return(
        <div>
            <Wifi />
            
            Logged in as {user}<br />
            <div>
                <Button primary> Logout </Button>
            </div>
            <input 
                type="button" 
                value="Logout" 
                onClick={handleLogout} 
            />
        </div>
    )
}

export default NetConfig;
