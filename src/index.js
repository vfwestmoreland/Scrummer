import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextInfo } from './context/UserContext';
import { TeamContextInfo } from './context/TeamContext';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <AuthContextProvider>
            <UserContextInfo>
                <TeamContextInfo>
                              <App />
                </TeamContextInfo>
            </UserContextInfo>
        </AuthContextProvider>
  </BrowserRouter>
);

