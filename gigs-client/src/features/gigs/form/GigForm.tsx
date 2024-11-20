import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Gig } from '../../../app/models/gig';


interface Props {
    gig: Gig | undefined;
    closeForm: () => void;
    createOrEditGig: (gig: Gig) => void;
    submitting: boolean;
}

export default function GigForm({gig: selectedGig, closeForm, createOrEditGig, submitting}: Props){

    const initalState = selectedGig ?? { //if gig is undefined, then use an empty object
        id: '', 
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [gig, setGigs] = useState(initalState);

    function handleSubmit(){
        createOrEditGig(gig);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setGigs({...gig, [name]: value}) //spread the gig and set values from the inputs
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                
                <Form.Input placeholder='Title' value={gig.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={gig.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={gig.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={gig.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={gig.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={gig.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}