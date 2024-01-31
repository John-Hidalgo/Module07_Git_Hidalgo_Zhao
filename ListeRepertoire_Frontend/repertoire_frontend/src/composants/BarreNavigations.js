import React from 'react'
import Container from 'react-bootstrap/Container'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const BarreNavigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                        <Nav.Link href="/articles">Pieces</Nav.Link>
                        <Nav.Link href="/ajouter">Ajouter</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


