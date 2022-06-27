import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { NavBar } from "../navigation/Navigation";
import { UserInfo } from "../../context/UserContext";
import { UserAuth } from "../../context/AuthContext";


export const CustomMeeting = () => {
    const api_URL = 'http://localhost:4545/customMeetings'
    const [query, setQuery] = useState('');
    const [teammates, setTeammates] = useState([]);
    const [meetingName, setMeetingName] = useState('');
    const [customMeetings, setCustomMeetings] = useState([]);
    const { userProfile } = UserInfo();
    const { user } = UserAuth();

    const addToMeeting = (teammates) => {
        setTeammates((meeting) => {
            return [...meeting, teammates]
        }
    )};

    const removeFromMeeting = (teammates) => {
        setTeammates((meeting) => {
            const result = [...meeting];
            result.splice(
                meeting.indexOf(teammates),
                1
            )
            return result
        })
    };


    const handleCustomMeeting = async () => {
        let userId = user.uid
        const customMeeting = { userId, meetingName, teammates }
       
        const result = await fetch(api_URL, { 
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customMeeting)
        })
       
            const newMeeting = await result.json()
            setCustomMeetings(currentMeetings => [...currentMeetings, newMeeting])
        };

    const resetData = () => {
        setMeetingName('');
        setTeammates([]);
            
        };

        const handleDeleteMeeting = (id) => {
            fetch(`${api_URL}/${id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(() => {
                setCustomMeetings((meeting) => {
                    const result = [...meeting];
                    result.splice(
                        meeting.indexOf(id),
                    )
                    return result
            });
        });
    };

        useEffect(() => {
                fetch(api_URL)
                .then(res => {return res.json();})
                .then(data => {setCustomMeetings(data)})

        }, []);

    return (
        <>
            <NavBar />
                <Card style={{ backgroundColor: 'lightgray', width: '90%', height: '695px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Card style={{ maxHeight: '200px' , width: '30%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <ListGroup >
                            <input type='text' onChange={(e) => setQuery(e.target.value)} placeholder='Search....'/>
                                {userProfile.filter((user) => user.userName.toLowerCase().includes(query) || user.teamName.toLowerCase().includes(query) 
                                    ).slice(0, 12).map((user) => (
                                        <ListGroup.Item key={user.userId}>
                                            {user.userName}:  ({user.teamName}) 
                                        <Button style={{ float: 'right'}} value={user.userName} onClick={(e) => addToMeeting(e.target.value)}>Add</Button>
                                        </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <ListGroup>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
                                <input type='text' placeholder='Custom Meeting Name' onChange={(e) => setMeetingName(e.target.value)}/>
                                <Button type='submit' style={{ float: 'right', marginLeft: '1rem'}} onClick={resetData}>Clear</Button>
                                <Button type='submit' style={{ float: 'right', marginLeft: '1rem'}} onClick={handleCustomMeeting}>Save</Button>
                            </div>   
                                {teammates.map((teamate) => {
                                return <ListGroup.Item key={teamate}>
                                            {teamate} 
                                        <Button style={{ float: 'right'}} value={teamate} onClick={() => removeFromMeeting(teamate)}>Remove</Button>
                                        </ListGroup.Item>
                                })}
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <ListGroup>
                                <h4 style={{ textAlign: 'center'}}>Saved Custom Meetings</h4>
                                {customMeetings.map((meeting) => {
                                    if (user.uid === meeting.userId) {
                                    return <ListGroup.Item key={meeting.id}>
                                                {meeting.meetingName} 
                                            <Button  style={{ float: 'right' }} value={meeting.id} onClick={(e) => handleDeleteMeeting(e.target.value)} >Delete</Button>
                                            </ListGroup.Item>
                                }})}                              
                        </ListGroup>
                    </Card>
                </Card>
                
        </>
    )
};

