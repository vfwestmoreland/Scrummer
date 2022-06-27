import React, { useState } from 'react';
import { db } from '../../firebase';
import { uid } from 'uid';
import { set, ref, remove } from 'firebase/database';
import { Button, Form, Card, Col, Table } from 'react-bootstrap';
import { NavBar } from '../navigation/Navigation';
import { TeamInfo } from '../../context/TeamContext';

export const CreateTeams = () => {
    const { teams } = TeamInfo();
    const uuid = uid();
    const [teamName, setTeam] = useState('');
    

    const createTeam = () => {
        set(ref(db, 'teams/' + uuid ), {
        teamName,
        teamId: uuid
        
        });

        setTeam('')
    };

    const handleDelete = (teamName) => {
        remove(ref(db, 'teams/' + teamName));
      };


       
    let teamTable = teams.map((team) => {
        return (
            <tr key={team.teamId}>
                <td>{team.teamName} <Button style={{ float: 'right', marginRight: '.5rem' }} onClick={() => handleDelete(team.teamId)}>delete</Button></td>
            </tr>
        )
            
    })

    return (
        <>
        <NavBar />
        <Card style={{ width: '60%', marginTop: '3rem', marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden'}}>
            <Form>
                <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label style={{ marginLeft: '.5rem', fontWeight: 'bold'}} >Manage Teams</Form.Label>
                    <Form.Control onChange={(e) => setTeam(e.target.value)}  type='text' placeholder='Add Team' />
                </Form.Group>
                    <Button style={{ float: 'right', marginTop: '.5rem', marginRight: '1rem' }} onClick={createTeam} variant='primary' type='submit'>
                        Add
                    </Button>
            </Form>
            <Table style={{ width: '100%', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', height: 'auto'}} striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>Current Teams</th>
                    </tr>
                </thead>
                <tbody>
                    {teamTable}
                </tbody>
            </Table>
        </Card>

        
        </>
    )
    
};

      