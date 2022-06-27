import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { set, ref } from 'firebase/database';
import { Button, Form, Col, Card } from 'react-bootstrap';
import { TeamInfo } from '../../context/TeamContext';
import { UserAuth } from '../../context/AuthContext';

export const LoginProfile = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [teamName, setTeam] = useState('');
    const { teams } = TeamInfo();
    const { user } = UserAuth();
  
    
    
    const createProfile = () => {
        set(ref(db, 'users/' + user.uid), {
        isAdmin: 'false',
        userName,
        userId: user.uid,
        email: user.email,
        teamName
        });


        setTeam('')
        setUserName('')
    };

    


    

        return(
            <Card style={{width: '40%', marginTop: '10rem', marginLeft: 'auto', marginRight: 'auto'}}>
                <Card.Header style={{ backgroundColor: 'lightgray'}}> Required Additional User Information </Card.Header>
                <Form>
                    <Form.Group as={Col} controlId='formGridEmail'>
                        <Form.Label style={{marginLeft: '.25rem' }}> Add Preffered Username</Form.Label>
                        <Form.Control onChange={(e) => setUserName(e.target.value)} type='text' placeholder='Username' required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{marginLeft: '.25rem' }}> Select Associated Team </Form.Label>
                            <Form.Select onChange={(e) => setTeam(e.target.value)}  aria-label='Default select example'>
                                <option>Select Team</option>
                                    {teams.map((team) =>  
                                        <option key={team.teamId} value={team.teamName}>{team.teamName}</option>
                                    )}
                            </Form.Select>
                    </Form.Group>
                    <Button onClick={() => {createProfile(); navigate('/scrumapp')}} variant='outline-primary' type='submit' style={{width: '8rem', marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem', float: 'right'}}>
                        Create Profile
                    </Button>{''}
                </Form>
            </Card>
        )
    
    }
  

