import React, { SyntheticEvent, useState } from 'react';
import { Gig } from '../../../app/models/gig';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    gigs: Gig[];
    selectGig: (id: string) => void;
    deleteGig: (id: string) => void;
    submitting: boolean;
}

export default function GigsList({gigs, selectGig, deleteGig, submitting}: Props){
    
    const [target, setTarget] = useState('');

    function handleGigDelete(event: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(event.currentTarget.name);
        deleteGig(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {gigs.map((gig) => (
                    <Item key={gig.id}>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{gig.title}</Item.Header>
                            <Item.Meta>{gig.date}</Item.Meta>
                            <Item.Description>
                                {gig.description}
                                {gig.city}, {gig.venue}
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectGig(gig.id)} floated='right' content='View' color='blue' />
                                <Button 
                                name={gig.id}
                                loading={submitting && target==gig.id} 
                                onClick={(event) => handleGigDelete(event, gig.id)} 
                                floated='right' content='Delete' color='red' />
                                <Label basic content={gig.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}