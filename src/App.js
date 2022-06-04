import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { SignUp } from './components/signin/SignUp';
import { SignIn } from './components/signin/SignIn';
import { Account } from './components/accounts/Accounts';
import { ProtectedRoute } from './components/protectedroutes/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';

 


export const App = () => {
  return (
      <div>
          <h1 className='text-center text-3xl font-bold'>
              SCRUMMER
          </h1>
            <AuthContextProvider>
                    <Routes>
                            <Route path='/' element={<SignIn />} />
                            <Route path='/signup' element={<SignUp />} />
                            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    </Routes>
            </AuthContextProvider>
      </div>
  );
}


