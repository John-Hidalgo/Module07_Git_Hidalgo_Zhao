import React, { useContext, useEffect, useState } from 'react'
import { getAllPieces } from "../requestApi/piece_request.js"
import Button from 'react-bootstrap/Button'
import ListCommande from '../composants/ListCommande.js'
const PageRepertoireClients = () => {
    const [pieces, setpieces] = useState([])
    useEffect(() => {
        async function fetchData () {
            try {
                const data = await getAllPieces() // appeler api
                setpieces(data) // setState
                console.log(pieces)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    function ajouter (titre, artise, categorie) {
        const id = `65c27d5e203afca56337040d`
        fetch(`/api/list/${id}/modifier`, {
            method: "PUT",
            body: JSON.stringify({
                titre: titre,
                artiste: artise,
                categorie: categorie
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(resultat => console.log(resultat.json()))
            .catch(console.error)
    }
    return (
        <div>
            <h2>Liste du repertoire</h2>
            <ul>
                {pieces.map((p, index) => (
                    <li key={p._id}> {p.titre} {p.artiste} {p.categorie}
                        <ListCommande />
                        <Button alt={index} variant="warning"
                            onClick={() => {
                                ajouter(p.titre, p.artiste, p.categorie)
                            }} size="sm" className="m-1">
                            Ajouter
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default PageRepertoireClients