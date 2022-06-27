import React from 'react';
import { NavBar } from '../navigation/Navigation';
import { CustomParticipantList } from './CustomParticipantList';




export const ScrumApp = () => {
    return (
        <>
            <NavBar />
            <CustomParticipantList />
        </>
    )
};