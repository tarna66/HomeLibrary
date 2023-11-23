
import React from 'react'
import '../style/Links.scss';


import { Navbar, Container, Nav } from 'react-bootstrap';
const Links = () => {
  
    return (
        <Navbar className="color-nav" expand="lg" variant="dark" >
            <Container>
                <Navbar.Brand href="/">Home library</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav >
                        <Nav.Link href="/books/list" >List my books</Nav.Link>
                        <Nav.Link href="/books/add">Add book</Nav.Link>
                        <Nav.Link href="/books/finnabook">Find from Finna DB</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Links