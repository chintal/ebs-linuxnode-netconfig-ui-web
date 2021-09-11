import React, {useEffect, useState} from "react";
import { netconfigApi } from "../../Api";

const Wifi = (props) => {
    const [wifiNetworks, setWifiNetworks] = useState([]);
    const [wifiNetworksLoading, setWifiNetworksLoading] = useState(true);

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

    return(
        <div>
            Wifi Configuration Page <br />
        </div>
    )
}

export default Wifi;
