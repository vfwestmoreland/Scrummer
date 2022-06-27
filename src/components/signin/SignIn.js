import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Card, Button, Form } from 'react-bootstrap'

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/scrumapp')
          } catch (e) {
            setError(error.mmessage)
            alert('Please Check Email or Password')
          }
      
    };

    return (
        <Card className='text-center' style={{ width: '35%', marginTop: '10rem', marginLeft: 'auto', marginRight: 'auto'}} >
            <Card.Header style={{ backgroundColor: 'lightgray'}}>Sign Into Account</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange= {(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                        </Form.Group>
                            <Button onClick={handleSubmit} variant='outline-primary' type='submit'>Submit</Button>{''}
                    </Form>
                </Card.Body>
            <Card.Footer style={{ backgroundColor: 'lightgray'}} className='text-muted'>Don't Have An Account <Link to='/signup'>Sign Up</Link></Card.Footer>
        </Card>
    )
};