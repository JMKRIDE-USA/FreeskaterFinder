import React from 'react';

import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { HiCog } from 'react-icons/hi';

import logo from '../assets/JMKRIDE_RWU_BlackBG.svg';

const HeaderComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 70px;
  & > div:first-child {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    border: 0px;
  }
  & > * {
    display: flex;
    border: 5px solid red;
  }
`

export default function Header() {
  return (
    <Navbar className="App-header" bg="dark" variant="dark" expand="xl" sticky="top">
      <Container as={HeaderComponent}>
        <div>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height={50}
              className="header-logo d-inline-block align-top"
              alt="JMKRIDE logo"
            />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle className="header-toggle"/>
        <Navbar.Collapse className="header-dropdown"> 
          <div>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/friends">Friends</Nav.Link>
          </div>
          <div>
            <div className="flex-row">
              <Nav.Link className="ml-auto" href="/settings">
                <HiCog size={30} color="white"/>
              </Nav.Link>
              <Nav.Link className="ml-auto" href="/profile">
                <HiUserCircle className="account-icon" size={40}/>
              </Nav.Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
