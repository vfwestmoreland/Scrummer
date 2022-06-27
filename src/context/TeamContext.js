import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const TeamContext = createContext();

export const TeamContextInfo = ({children}) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'teams/'), (snapshot) => {
          setTeams([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((team) => {
              setTeams((teamArray) => [...teamArray, team  ]);
            });
          }
        });
      }, []);


      return (
        <TeamContext.Provider value={{ teams }}>
            {children}
        </TeamContext.Provider>
      )
        
    };

export const TeamInfo = () => {
    return useContext(TeamContext)
}