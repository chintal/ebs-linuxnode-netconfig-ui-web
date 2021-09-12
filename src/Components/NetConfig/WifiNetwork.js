
import React, { useState } from "react";

import {
    Grid, 
    Card,
    CardHeader,
    CardContent,
    IconButton,
    ButtonGroup,
    Typography
} from "@material-ui/core";

import {
    Delete,
    Edit,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";


const WifiNetwork = (props) => {
    const [ssid, setSsid] = useState(props.ssid);
    const [psk, setPsk] = useState(props.psk);
    const [showPsk, setShowPsk] = useState(false);

    const onToggleShowPsk = () => {
        setShowPsk(!showPsk);
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
                            onClick={onToggleShowPsk}
                            onMouseDown={onToggleShowPsk}>
                            {showPsk ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        <IconButton 
                            aria-label="edit"
                            color="primary">
                            <Edit />
                        </IconButton>
                        <IconButton 
                            aria-label="delete"
                            color="secondary">
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
