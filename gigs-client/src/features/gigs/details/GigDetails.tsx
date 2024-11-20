import React from 'react';
import { Button, Card } from "semantic-ui-react";
import { Gig } from "../../../app/models/gig";

interface Props{
    gig: Gig
    cancelSelectGig: () => void;
    openForm: (id: string) => void;
}


export default function GigDetails({gig, cancelSelectGig, openForm}: Props){
    return (
       <Card fluid>
            <img src={`/assets/categoryImages/${gig.category}.jpg`} alt='gig' />
            <Card.Content>
                <Card.Header>{gig.title}</Card.Header>
                <Card.Meta>
                    <span>{gig.category}</span>
                </Card.Meta>
                <Card.Description>{gig.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(gig.id)} basic color='orange' content='Edit' />
                    <Button onClick={cancelSelectGig} basic color='red' content='Cancel' />
                </Button.Group>
            </Card.Content> 
            <Card.Content extra>
            </Card.Content>
       </Card>
    )
}