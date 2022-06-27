import React from 'react';
import { TeamInfo } from '../../context/TeamContext';
import { Form } from 'react-bootstrap';


export const TeamDropDown = () => {
  const { teams } = TeamInfo()


    return (
        <>
        <div>
            <Form.Select aria-label='Default select example'>
                {teams.map((team) =>  
                    <option key={team.teamId}>{team.teamName}</option>
                )}
            </Form.Select>
        </div>
      
    </>
  );
}