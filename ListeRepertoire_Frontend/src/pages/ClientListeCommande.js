import { React, useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Listes } from "../composants/Listes.js"
import { updateTheCommande } from '../requestApi/panier_request.js'

export default function ClientListeCommande () {
    const [listeCommande, setlisteCommande] = useState([])
    const [nomClient, setnomClient] = useState('')
    const afficherListes = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/commandes/${nomClient}`)
            const data = await response.json()
            setlisteCommande(data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const deletePiece = ((indexListe, indexPiece) => {
        const demande = listeCommande[indexListe]
        demande.ListeDemande.splice(indexPiece, 1)
        if (window.confirm("Voulez-vous supprimer cet article?")) {
            updateTheCommande(demande._id, demande.nomClient, demande.ListeDemande, demande.etat, demande.date)
                .then(() => {
                    fetch(`/api/commandes/${nomClient}`)
                        .then(response => response.json())
                        .then(data => setlisteCommande(data))
                })
                .catch((err) => { console.log(err.message) })
        }
    })

    const envoyerListe = (indexListe) => {
        const demande = listeCommande[indexListe]
        const etatActif = 1    // mettre en etat actif pour simuler envoyer une liste
        if (window.confirm("Voulez-vous supprimer cet article?")) {
            updateTheCommande(demande._id, demande.nomClient, demande.ListeDemande, etatActif, demande.date)
                .catch((err) => { console.log(err.message) })
        }
    }

    return (
        <>
            <h4>Ma Liste</h4>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formMotDePasse">
                                <Form.Label>Entrez votre nom pour chercher vos liste de demandes: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez votre nom"
                                    value={nomClient}
                                    onChange={(e) => setnomClient(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => afficherListes(e)}
                                disabled={!(nomClient !== '')}
                            >
                                Ajouter
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Listes listes={listeCommande.map(d => { return { ListeDemande: d.ListeDemande, nomCommande: d.nomCommande } })} handlClickDelete={deletePiece} handlClickEnvoyer={envoyerListe} />
            </Container >
        </>
    )
}