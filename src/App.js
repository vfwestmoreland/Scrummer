import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './components/signin/SignIn';
import { SignUp } from './components/signin/SignUp';
import { LoginProfile } from './components/profile/LoginProfile';
import { ScrumApp } from './components/main/ScrumApp';
import { UpdateProfile } from './components/profile/UpdateProfile';
import { CustomMeeting } from './components/teammanager/CustomMeeting';
import { ManageUsers } from './components/users/ManageUsers';
import { CreateTeams } from './components/teams/CreateTeams';


export const App = () => {
  return (
      <>
        <Routes>
            <Route path='/' element={ <SignIn /> } />
            <Route path='/signup' element={<SignUp /> } />
            <Route path='/loginprofile' element={<LoginProfile /> } />
            <Route path='/scrumapp/' element={<ScrumApp />} />
            <Route path='/scrumapp/profile' element={<UpdateProfile />} />
            <Route path='/scrumapp/meetings' element={<CustomMeeting />} />
            <Route path='/scrumapp/admin' element={<ManageUsers />} />
            <Route path='/scrumapp/teams' element={<CreateTeams />} />
        </Routes>
      </>
  )
};