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


export function Client_Creer_Liste () {
    const [nomListe, setNomListe] = useState('')
    function envoyer () {
        fetch(`/api/list/ajouter`, {
            method: "POST",
            body: JSON.stringify({
                liste_nom: nomListe,
                client: "testUsername",
                liste_demandes: []
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(resultat => console.log(resultat.json()))
            .catch(console.error)
    }
    return (
        <>
            <h1>Client_Creer_Liste</h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formMotDePasse">
                                <Form.Label>Entrez le nom pour la liste que vous voulez creer: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez votre mot de passe"
                                    value={nomListe}
                                    onChange={(e) => setNomListe(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={
                                    (e) => { envoyer() }
                                }
                            // disabled={!(aMajuscule() && aChiffre() && sontIdentique())}
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