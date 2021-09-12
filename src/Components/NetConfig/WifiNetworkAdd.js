
import React, { useState } from "react";

import { 
    Grid,
    Button,
    TextField,
} from "@material-ui/core";

import { 
    Alert,
    AlertTitle } from "@material-ui/lab";

import PasswordField from "../Common/Password";
import { netconfigApi } from "../../Api";


const defaultValues = {
    ssid: "",
    psk: ""
}

const AddWifiNetwork = (props) => {
    const [newWifiNetwork, setNewWifiNetwork] = useState(defaultValues);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWifiNetwork({
            ...newWifiNetwork,
            [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setProcessing(true);
        netconfigApi.post("wifi/networks/add",
            newWifiNetwork
        ).then(response => {
            props.handler(newWifiNetwork);    
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
    
    const renderErrorMessage = (e) => {
        if (e){
            return <Alert severity="error">
                <AlertTitle>Add Network Failed</AlertTitle>
                {e} 
            </Alert>;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined"
                        required
                        fullWidth
                        id="ssid-input"
                        name="ssid"
                        label="SSID"
                        type="text"
                        value={newWifiNetwork.ssid}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PasswordField
                        id="psk-input"
                        name="psk"
                        label="WPA2 PSK"
                        icon="lock"
                        iconPosition="left"
                        placeholder="WPA2 PSK"
                        value={newWifiNetwork.psk}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    {renderErrorMessage(error)}
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained"
                        color="primary"
                        disabled={processing} 
                        onClick={handleSubmit}
                        fullWidth
                        type="submit"
                    >
                    {processing ? "Working..." : "Add Wifi Network"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}


export default AddWifiNetwork;