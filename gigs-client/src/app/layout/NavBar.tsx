import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Gig In Your Area
                </Menu.Item>
                <Menu.Item name='Gigs' />
                <Menu.Item name='Gallery' />
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Post A Gig' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}