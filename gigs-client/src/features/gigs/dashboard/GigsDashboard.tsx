import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Gig } from '../../../app/models/gig';
import GigsList from './GigsList';
import GigDetails from '../details/GigDetails';
import GigForm from '../form/GigForm';

interface Props {
    gigs: Gig[];
    selectedGig: Gig | undefined;
    selectGig: (id: string) => void;
    cancelSelectGig: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEditGig: (gig: Gig) => void;
    deleteGig: (id: string) => void;
    submitting: boolean;
}

//destructure or overload the function with properties
export default function GigsDashboard({gigs, selectedGig, selectGig, 
    cancelSelectGig, editMode, openForm, closeForm, createOrEditGig, 
    deleteGig, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <GigsList gigs={gigs} 
                    selectGig={selectGig} 
                    deleteGig={deleteGig}
                    submitting={submitting} />
                    
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedGig && !editMode &&
               <GigDetails gig={selectedGig} 
               cancelSelectGig={cancelSelectGig} 
               openForm={openForm}
               
               />}
               {editMode &&
               <GigForm closeForm={closeForm} 
               gig={selectedGig} 
               createOrEditGig={createOrEditGig}
               submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}