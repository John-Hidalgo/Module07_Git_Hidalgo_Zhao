import React from 'react'
import Container from 'react-bootstrap/Container'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

export const BarreNavigation = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <Nav.Link href="/inscrire">S'Inscrire</Nav.Link>
                        <Nav.Link href="/login">Se connecter</Nav.Link>
                        <Nav.Link href="/maliste">Ma Liste</Nav.Link>
                        <Nav.Link href="/client-repo">Repertoire Client</Nav.Link>
                        <Nav.Link href="/client-liste">CreerListe</Nav.Link>
                        <Nav.Link href="/pieces">Répertoire Admin</Nav.Link>
                        <Nav.Link href="/commandes">Voir Les Commandes Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <form className="d-flex">
                    <button className="btn btn-outline-light" type="submit">
                        <i className="bi-cart-fill me-1"></i>
                        Cart
                        <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                    </button>
                </form>
            </Container>
        </Navbar>
    )
}


