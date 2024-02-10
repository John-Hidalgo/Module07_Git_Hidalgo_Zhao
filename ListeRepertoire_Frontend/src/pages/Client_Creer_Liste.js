import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { BsCheck, BsX } from "react-icons/bs"
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react"
import { addTheCommande } from '../requestApi/panier_request.js'

export function Client_Creer_Liste () {
    const [nomClient, setnomClient] = useState('')
    const [nomCommande, setnomCommande] = useState('')
    return (
        <>
            <h1>Creer une Liste de demandes </h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formMotDePasse">
                                <Form.Label>Entrez votre nom pour creer une liste de demandes: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    value={nomClient}
                                    onChange={(e) => setnomClient(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNomCommande">
                                <Form.Label>Entrez votre nom personnalise pour la liste de demandes: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez votre nom de la liste"
                                    value={nomCommande}
                                    onChange={(e) => setnomCommande(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={
                                    (e) => { addTheCommande(nomClient, [], nomCommande) }
                                }
                                disabled={!(nomClient !== '' || nomCommande !== '')}
                            >
                                Ajouter
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}