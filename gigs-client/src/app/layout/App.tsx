import { Fragment, useEffect, useState } from 'react'
import { Button, Container } from 'semantic-ui-react';
import { Gig } from '../models/gig';
import NavBar from './NavBar';
import GigsDashboard from '../../features/gigs/dashboard/GigsDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {gigStore} = useStore();

  const [gigs, setGigs] = useState<Gig[]>([]);

  // Use State to set selected gig. Then set it down through the details and dashboard.
  const [selectedGig, setSelectedGig] = useState<Gig | undefined>(undefined); //use union type undefined or Gig.

  // Use State to the component when Editing and item
  const [editMode, setEditMode] = useState(false);

  // set state for loading and delay
  const [loading, setLoading] = useState(true);

  // Check if we are submitting
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Gigs.list()
        .then(response => {
          const gigs: Gig[] = [];
          response.forEach(gig => {
            gig.date = gig.date.split('T')[0]; // Exclude the time info taking the first split of the date info
            gigs.push(gig);
          })
          setGigs(response);
          setLoading(false);
        })
  }, [])

  function handleSelectedGig(id: string) {
    setSelectedGig(gigs.find(g => g.id === id));
  }

  function handleCancelSelectedGig(){
    setSelectedGig(undefined);
  }

  function handleFormOpen(id: string){
    id ? handleSelectedGig(id) : handleCancelSelectedGig();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditGig(gig: Gig){
    setSubmitting(true);
    if(gig.id){
      agent.Gigs.update(gig).then(() => {
        setGigs([...gigs.filter(g => g.id !== gig.id), gig])
        setSelectedGig(gig);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      gig.id = uuid();
      agent.Gigs.create(gig).then(() => {
        setGigs([...gigs, gig])
        setSelectedGig(gig);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteGig(id: string){
    setSubmitting(true);
    agent.Gigs.delete(id).then(() => {
      setGigs([...gigs.filter(g => g.id !== id)]);
      setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content='Loading App' />

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          <h2>{gigStore.title}</h2>
          <Button content='Add Exclamation!' positive onClick={gigStore.setTitle} />
          <GigsDashboard gigs={gigs}
          selectedGig={selectedGig}
          selectGig={handleSelectedGig}
          cancelSelectGig={handleCancelSelectedGig} 
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditGig={handleCreateOrEditGig}
          deleteGig={handleDeleteGig}
          submitting={submitting}
          />
        </Container>
    </Fragment>
  )
}

export default observer(App);
