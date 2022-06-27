import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, update } from 'firebase/database';
import { Button, Form, Col, Card } from 'react-bootstrap';
import { TeamInfo } from '../../context/TeamContext';
import { UserInfo } from '../../context/UserContext';
import { UserAuth } from '../../context/AuthContext';
import { NavBar } from '../navigation/Navigation';

export const UpdateProfile = () => {
    const [userName, setUserName] = useState('');
    const [teamName, setTeam] = useState('');
    const { teams } = TeamInfo();
    const { userProfile } = UserInfo();
    const { user } = UserAuth();
  
    
    
    const editProfile = () => {
        update(ref(db, 'users/' + user.uid), {
        userName,
        teamName
        });


        setTeam('')
        setUserName('')
    };

    

for (const profile of userProfile) {
    if (user.uid === profile.userId) {
        return(
        <>
            <NavBar />
            <Card  style={{ width: '40%', marginTop: '8rem', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Header style={{ backgroundColor: 'lightgray'}} className='text-center'>Update Profile</Card.Header>
                <Form>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label style={{marginLeft: '.25rem' }}> Preffered User Name: </Form.Label>
                        <Form.Control onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Prefered User Name" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{marginLeft: '.25rem' }}> Select Associated Team: </Form.Label>
                            <Form.Select onChange={(e) => setTeam(e.target.value)}  aria-label='Default select example' required>
                                <option>Select Team</option>
                                    {teams.map((team) =>  
                                        <option key={team.teamId} value={team.teamName}>{team.teamName}</option>
                                    )}
                            </Form.Select>
                    </Form.Group>
                    <div style={{ marginTop: '1rem'}}>
                        <div style={{ fontWeight: 'bold', marginLeft: '.5rem' }}>Current User Name: {profile.userName}</div>
                        <div style={{ fontWeight: 'bold', marginLeft: '.5rem' }}>Current Team: {profile.teamName}</div>
                    </div>
                            <Button onClick={editProfile} variant='outline-primary' type='submit' style={{ width: '8rem', marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem', float: 'right'}}>
                                Submit
                            </Button>{''}
                </Form>
            </Card>
        </>
        )
    }}
    
};