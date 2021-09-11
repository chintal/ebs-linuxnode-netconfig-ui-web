import React, {useState} from "react";
import { 
    Accordion,
    Button, 
    Icon,
    Message,
    Segment} from "semantic-ui-react";

import { getUser, removeUserSession } from "../../Utils/Auth";
import Wifi from "./Wifi";
import BaseLayout from "../../Layouts/Base";


const NetConfig = (props) => {
    
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login')
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }
    
    return(
        <BaseLayout> 
        <Segment fluid="true">
        <Accordion fluid styled>
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
            >
                <Icon name="wifi" /> Wifi Configuration
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <Wifi />
            </Accordion.Content>
        </Accordion>
        </Segment>
        <Segment fluid="true">
        <Message> Logged in as {user} </Message>
        <Button 
            color="red" 
            fluid
            size="medium"
            type="button" 
            onClick={handleLogout}
        > Logout
        </Button>
        </Segment>
        </BaseLayout>
    )
}

export default NetConfig;
