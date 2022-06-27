import React from 'react';
import { TeamInfo } from '../../context/TeamContext';
import { Form } from 'react-bootstrap'


export const TeamCheckBox = () => {
  const { teams } = TeamInfo();


   return (
                <>
                      {teams.map(
                        (team) => {
                         return <Form.Check 
                            key={team.teamId}
                            type='checkbox'
                            value={team.teamId}
                            label={team.teamName}
                            />
                        }
                    )
                }
                  </>
                      
                    
    )
};

