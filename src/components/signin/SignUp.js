import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Form, Card, Button } from 'react-bootstrap'



export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/loginprofile')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
        <Card className='text-center' style={{ width: '35%', marginTop: '10rem', marginLeft: 'auto', marginRight: 'auto'}} >
                <Card.Header style={{ backgroundColor: 'lightgray'}}>Sign Up For Account</Card.Header>
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
                    <Card.Footer style={{ backgroundColor: 'lightgray'}}>Already Have an Account <Link to='/'>Sign In</Link></Card.Footer>
            </Card>
    
  );
};

