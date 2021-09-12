
import React, {useState} from "react";

import {
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@material-ui/core";

import {
    Wifi as WifiIcon,
    ExpandMore,
} from "@material-ui/icons";

import {
    Alert 
} from "@material-ui/lab";


import { 
    getUser, 
    removeUserSession 
} from "../../Utils/Auth";

import Wifi from "./Wifi";
import BaseLayout from "../../Layouts/Base";
import "./netconfig.css";


const NetConfig = (props) => {
    
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login')
    }

    return(
        <BaseLayout> 
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="wifi-panel-content"
                id="wifi-panel-header"
            >
                <WifiIcon />
                <Typography variant="h5">
                    Wifi Configuration
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Wifi />
            </AccordionDetails>
        </Accordion>
        
        <Alert severity="info"> Logged in as {user} </Alert>
        <Button 
            variant="contained" 
            color="secondary"
            onClick={handleLogout}
            fullWidth
        > Logout
        </Button>
        </BaseLayout>
    )
}

export default NetConfig;
