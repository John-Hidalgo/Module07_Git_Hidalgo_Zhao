import React from "react"
import { useEffect, useState } from "react"
import { ListePieces } from "../composants/ListePieces"
import Repertoire from "../composants/Repertoire"


export function Admin () {
    const [pieces, setPieces] = useState([])

    useEffect(() => {
        fetch(`/api/pieces`)
            .then(resultat => resultat.json())
            .then(setPieces)
            .catch(console.error)
    }, [])
    const deletePiece = ((id) => {
        console.log(id)
        if (window.confirm("Voulez-vous supprimer cet article?")) {
            fetch(`/api/pieces/${id}/supprimer`, {
                method: "DELETE"
            })
                .then(() => {
                    fetch(`/api/pieces`)
                        .then(resultat => resultat.json())
                        .then(setPieces)
                })
                .catch((err) => { console.log(err.message) })
        }
    })
    const modifierPiece = ((id, { newTitre, newArtiste, newCategorie }) => {
        console.log(id)
        console.log(newTitre, newArtiste, newCategorie)
        const data = { "titre": newTitre, "artiste": newArtiste, "categorie": newCategorie }
        if (window.confirm("Voulez-vous modifier cet article?")) {
            fetch(`/api/pieces/${id}/modifier`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then((raw) => {
                    console.log(raw.json())
                })
                .catch((err) => { console.log(err.message) })
        }
    })
    return (
        <ListePieces pieces={pieces} handlClickDelete={deletePiece} handlClickModifier={modifierPiece} />
    )
}