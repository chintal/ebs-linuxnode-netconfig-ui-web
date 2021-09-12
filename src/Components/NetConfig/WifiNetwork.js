
import React, { useState } from "react";

import {
    Grid, 
    Card,
    CardHeader,
    CardContent,
    IconButton,
    ButtonGroup,
    Typography,
} from "@material-ui/core";

import {
    Delete,
    // Edit,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

import { netconfigApi } from "../../Api";


const WifiNetwork = (props) => {
    // eslint-disable-next-line 
    const [ssid, setSsid] = useState(props.ssid);
    // eslint-disable-next-line 
    const [psk, setPsk] = useState(props.psk);
    const [showPsk, setShowPsk] = useState(false);
    // eslint-disable-next-line 
    const [error, setError] = useState(null);
    // eslint-disable-next-line 
    const [processing, setProcessing] = useState(false);

    const onToggleShowPsk = () => {
        setShowPsk(!showPsk);
    }

    const handleRemove = (event) => {
        event.preventDefault();
        setProcessing(true);
        netconfigApi.post("wifi/networks/remove",
            ssid
        ).then(response => {
            props.onRemove(ssid);    
            setProcessing(false);
        }).catch(error => {
          console.log(error);
          setProcessing(false);
          if (error.response.status === 401 || 
              error.response.status === 400 ||
              error.response.status === 409 ||
              error.response.status === 416){
                setError(error.response.data.detail);
          }
          else if (error.response.status === 422){
            // TODO See about making the error actually printable
            setError("Required field is missing or incorrectly formatted.");
          }
          else {
            setError("Something went wrong. Please report this error.");
          }
        })
    }

    return(
        <Grid item xs={12} sm={12}>
        <Card 
          variant="outlined"
          width="100%">
            <CardHeader 
                className="network-header"
                title={ssid}
                action={
                    <ButtonGroup variant="contained">
                        <IconButton 
                            aria-label="psk visibility toggle"
                            color="primary"
                            onClick={onToggleShowPsk}>
                            {showPsk ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        {/* <IconButton 
                            aria-label="edit"
                            color="primary">
                            <Edit />
                        </IconButton> */}
                        <IconButton 
                            aria-label="delete"
                            color="secondary"
                            onClick={handleRemove}>
                            <Delete />
                        </IconButton>
                    </ButtonGroup>
                } /> 
            <CardContent className="network-detail">
                <Typography variant="body1"> PSK: {showPsk? psk : "********"} </Typography>
            </CardContent>
        </Card>
        </Grid>
    )
}

export default WifiNetwork;
