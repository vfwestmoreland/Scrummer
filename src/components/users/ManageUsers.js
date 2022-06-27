import React, { useState } from "react";
import { db } from "../../firebase";
import {  ref, remove, update } from 'firebase/database';
import { Button, Table } from 'react-bootstrap';
import { UserInfo } from "../../context/UserContext";
import { NavBar } from "../navigation/Navigation";

export const ManageUsers = () => {
    const { userProfile } = UserInfo();
    const [admin, setAdmin] = useState(false);

    const updateAdmin = (isAdmin, userId) => {
        update(ref(db, 'users/' + userId), {
            isAdmin
        });

        setAdmin('')
    };
    

    const handleDelete = (user) => {
        if(window.confirm(`You are about to delete user ${user.userName}!`))
            remove(ref(db, 'users/' + user.userId));
    };

    let userTable = userProfile.map((user) => {
        return (
            <tr key={user.userId}>      
                <td>       
                    {user.userName} 
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.teamName}
                </td>
                <td>
                        ({user.isAdmin}) 
                        <Button style={{backgroundColor: 'red', marginLeft: '.5rem',  float: 'right'}}  value={'false'} onClick={(e) => updateAdmin(e.target.value, user.userId)} >No</Button> 
                        <Button style={{backgroundColor: 'green', marginLeft: '.5rem', float: 'right'}} value={'true'} onClick={(e) => updateAdmin(e.target.value, user.userId)}>Yes</Button>
                </td>
                <td>
                <Button style={{ float: 'right',}} onClick={() => handleDelete(user)}>delete</Button>
                </td>
            </tr>
            
        )
            
    })

    return (
    <>
        <NavBar />
        <Table style={{ maxHeight: '200px', width: '80%', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}} striped bordered hover>
            <thead>
                <tr>
                    <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>User</th>
                    <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>Email</th>
                    <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>Team</th>
                    <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>Is Admin?</th>
                    <th style={{ marginLeft: '.5rem', fontWeight: 'bold'}}>Delete User</th>
                </tr>
            </thead>
            <tbody>
                {userTable}
            </tbody>
        </Table>
    </>

    )
}