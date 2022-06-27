import React, { useState, useEffect} from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { UserAuth } from '../../context/AuthContext';



export const CustomParticipantList = () => {
    const api_URL = 'http://localhost:4545/customMeetings'
    const { user } = UserAuth();
    const [participants, setParticipants] = useState([]);
    const [currentSpeaker, setCurrentSpeaker] = useState('');
    const [duration, setDuration] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [speakerTime, setSpeakerTime] = useState('');
    
    useEffect(() => {
        fetch(api_URL)
        .then(res => {return res.json();})
        .then(data => {setParticipants(data)})

  }, [])
    

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

    const handleMeetingStart = (meeting) => {
        let participants = shuffle(meeting.teammates)
        let index = 0;
        let totalTime = duration;
        let participantTime = totalTime / participants.length;
        let currentParticipantTime = participantTime;
        let intervalId;
        const doThisEverySecondUntilTotalTimeIsOut = () => {
          setCurrentSpeaker(participants[index])
          setMeetingTime(totalTime--);
          setSpeakerTime(currentParticipantTime--);
          if(currentParticipantTime <= 0){
            currentParticipantTime = participantTime;
            index++;
          }
          if(totalTime <= 0){
            clearInterval(intervalId);
            setSpeakerTime('');
            setCurrentSpeaker('');
          }
        };
         intervalId = setInterval(doThisEverySecondUntilTotalTimeIsOut, 1000);
  };
        

    const handleMeetingDuration = (e) => {
        setDuration(e.target.value * 60)
  };

    let allotedTime= () => {
    let mins = Math.floor(speakerTime / 60)
    let secs = Math.floor(speakerTime % 60);
    let output =  mins.toString().padStart(2, '0') + ':' +
                  secs.toString().padStart(2, '0');
    
        return output;
};


    return (
        <>
              <Card border="secondary" style={{ backgroundColor: 'lightgray', width: '90%', height: '650px', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Card.Header>Custom Meetings and Teams</Card.Header>
                    <Card.Body>
                    <Card.Title style={{ marginBottom: '2rem' }}>Start Stand Up<input type='number' style={{ width: '50%', float: 'right' }} onChange={handleMeetingDuration} placeholder='Set Meeting Duration'/></Card.Title>
                        <ListGroup>
                            {participants.map((meeting) => {
                              if (user.uid === meeting.userId) {
                                return <ListGroup.Item key={meeting.teammates}>
                                    {meeting.meetingName}     
                                      <Button style={{ float: 'right'}} onClick={() => handleMeetingStart(meeting)}>Start Stand Up</Button> 
                                      </ListGroup.Item>
                                 }})} 
                          </ListGroup>
                          <div style={{ width: '80%', marginLeft: '10%', marginRight: 'auto'}}>
                              <div style={{ width: '50%', marginLeft: '25%', marginRight: 'auto', textAlign: 'center', fontWeight: 'bolder', fontSize: '40px'}}>{currentSpeaker} You're Up!</div>
                              <div style={{ width: '50%', marginLeft: '25%', marginRight: 'auto', textAlign: 'center', fontWeight: 'bolder', fontSize: '40px'}}>{allotedTime()} </div>
                          </div>
                        </Card.Body>
                </Card>
        </>
  );
};
                        
