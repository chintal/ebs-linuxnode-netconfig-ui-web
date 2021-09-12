import React, {useEffect, useState} from "react";

import { 
    Grid,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core";

import { netconfigApi } from "../../Api";

import WifiNetwork from "./WifiNetwork";
import AddWifiNetwork from "./WifiNetworkAdd";


const styles = theme => ({
    root:{
        flexGrow: 1,
    }
})

const Wifi = (props) => {
    const [wifiNetworks, setWifiNetworks] = useState([]);
    const [wifiNetworksLoading, setWifiNetworksLoading] = useState(true);

    const {classes} = props;

    useEffect(() => {
        netconfigApi.get("wifi/networks/show"
        ).then(response => {
            setWifiNetworks(response.data);
            setWifiNetworksLoading(false);
        }).catch(error => {
          console.log(error);
          setWifiNetworksLoading(false);
        })
    }, []);

    const addWifiNetwork = (newNetwork) => {
        const updatedWifiNetworks = [...wifiNetworks, newNetwork];
        setWifiNetworks(updatedWifiNetworks);
    }

    return(
        <div width="100%" className={classes.root}>
            <h4> Configured Wifi Networks </h4>
            <Grid container spacing={2} width="100%">
              {wifiNetworks && wifiNetworks.map(network=>{
                return(
                    <WifiNetwork
                        ssid={network.ssid} 
                        psk={network.psk}
                        key={network.ssid}
                    />
                )
              })}
            </Grid>
            <h4> Add New Wifi Network </h4>
            <AddWifiNetwork 
                handler={addWifiNetwork}
            />
        </div>
    )
}

export default withStyles(styles)(Wifi);
