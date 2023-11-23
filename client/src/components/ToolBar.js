
import React from 'react'
import '../style/ToolBar.scss';
import { Button } from 'react-bootstrap';

import { Navbar, Container } from 'react-bootstrap';
const ToolBar = ({ amount, changeView }) => {

    return (
        <Navbar className="color-nav" expand="lg" variant="dark" >
            <Container className="tools">
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="toolcontainer">
                        <div className="viewtoggle">
                            <Button variant="" className="togglebutton" onClick={() => changeView()}>Change view</Button>
                        </div>
                        <div className="amountofbooks">
                            Amount of books: {amount}
                        </div>
                    </div>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default ToolBar