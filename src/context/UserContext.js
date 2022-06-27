import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const UserContext = createContext();

export const UserContextInfo = ({children}) => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'users/'), (snapshot) => {
          setUserProfile([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((userName) => {
              setUserProfile((userArray) => [...userArray, userName]);
            });
          }
        });
      }, []);


      return (
        <UserContext.Provider value={{ userProfile }}>
            {children}
        </UserContext.Provider>
      )
        
    };

export const UserInfo = () => {
    return useContext(UserContext)
}