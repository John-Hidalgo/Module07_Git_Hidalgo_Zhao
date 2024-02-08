import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { BsCheck, BsX } from "react-icons/bs"
import { addTheClient, formatDate } from '../requestApi/client_request.js'

export function Inscription () {
    //etat
    const [nom, setnom] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [copieMotDePasse, setCopieMotDePasse] = useState('')
    function enrgistrer () {
        addTheClient(nom, formatDate(), motDePasse)
            .then(response => {
                console.log('User registered successfully.')
            })
            .catch(error => {
                console.error('Registration failed:', error)
            })
    }
    // variables function membre
    function aMajuscule () {
        // const checkMajuscule = /^.*[A-Z].*$/  //majuscule
        return motDePasse.toLocaleLowerCase() !== motDePasse
    }

    function aChiffre () {
        const checkNum = /^.*[0-9].*$/  // /\d+/
        return motDePasse.match(checkNum) !== null   //
    }

    function sontIdentique () {
        return motDePasse === copieMotDePasse && motDePasse.length !== 0
    }

    //variables local
    let couleurAlertMotDePasse = "warning"
    if (aMajuscule() && aChiffre()) {
        couleurAlertMotDePasse = "success"
    }
    let couleurAlertIdentique = sontIdentique() ? "success" : "warning"

    const iconeMajuscule = aMajuscule() ?
        <BsCheck className={"text-success"} /> : <BsX className={"text-danger"} />

    const iconeChiffre = aChiffre() ?
        <BsCheck className={"text-success"} /> : <BsX className={"text-danger"} />

    const iconeIdentique = sontIdentique() ?
        <BsCheck className={"text-success"} /> : <BsX className={"text-danger"} />


    return (
        <Container className='bg-dark py-5'>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNom">
                            <Form.Label>Entrez votre nom:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez votre nom"
                                value={nom}
                                onChange={(e) => setnom(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMotDePasse">
                            <Form.Label>Entrez votre mot de passe :</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez votre mot de passe"
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                            />
                        </Form.Group>

                        <Alert variant={couleurAlertMotDePasse}>
                            <ul>
                                <li>Le mot de passe doit contenir une majuscule {iconeMajuscule}</li>
                                <li>Le mot de passe doit contenir un chiffre {iconeChiffre}</li>
                            </ul>
                        </Alert>

                        <Form.Group className="mb-3" controlId="formMotDePasseConfirmation">
                            <Form.Label>Confirmez votre mot de passe :</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Confirmez votre mot de passe"
                                value={copieMotDePasse}
                                onChange={(e) => setCopieMotDePasse(e.target.value)}
                            />
                        </Form.Group>

                        <Alert variant={couleurAlertIdentique}>
                            <ul>
                                <li>Le mot de passe doit être identique {iconeIdentique} </li>
                            </ul>
                        </Alert>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={
                                (e) => { enrgistrer() }
                            }
                            disabled={!(aMajuscule() && aChiffre() && sontIdentique())}
                        >
                            Inscrire
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    )
}
