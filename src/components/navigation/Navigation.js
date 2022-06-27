import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { UserInfo } from '../../context/UserContext';



export const NavBar = () => {
    const { user, logout } = UserAuth();
    const { userProfile } = UserInfo();
    const navigate = useNavigate();

    const handleLogout = async () => {
          try {
            await logout();
            navigate('/');
            console.log('You are logged out')
          } catch (e) {
            console.log(e.message);
          }
        };
    
  for (const profile of userProfile) {
    if (user.uid === profile.userId) { 
      if (profile.isAdmin === 'true') {
        return (
            <Navbar>
                <Container>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginRight: '3rem'}} to='/scrumapp'>
                          Home
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/profile'>
                          Profile
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/meetings'>
                          Custom Meeting Manager
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/admin'>
                          Admin Panel
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/teams'>
                          Edit Team List
                    </Link>
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text style={{ fontWeight: 'bold'}}>
                            Signed in as: {profile.userName}
                        </Navbar.Text>
                        <Nav.Link onClick={handleLogout} href=''>Logout</Nav.Link>
                    </Navbar.Collapse>
                </Container>
          </Navbar>

      )} else {
        return (
          <Navbar>
                <Container>
                    <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginRight: '3rem'}} to='/scrumapp'>
                          Home
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/profile'>
                          Profile
                    </Link>
                    <Link style={{ textDecoration: 'none', marginRight: '2rem'}} to='/scrumapp/meetings'>
                          Custom Meeting Manager
                    </Link>
                    <Navbar.Collapse className='justify-content-end'>
                        <Navbar.Text style={{ fontWeight: 'bold'}}>
                            Signed in as: {profile.userName}
                        </Navbar.Text>
                        <Nav.Link onClick={handleLogout} href=''>Logout</Nav.Link>
                    </Navbar.Collapse>
                </Container>
          </Navbar>

    )}
  }}
};