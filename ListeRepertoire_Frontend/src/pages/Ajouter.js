import React from "react"
import { getAllClient, getTheClient, addTheClient, updateClient, deleteTheClient } from "../requestApi/client_request.js"
import { getAllCommandes, getCommandeActif, getTheCommande, addTheCommande, updateTheCommande, updateCommandeRajouter, mettreCommandeInactif, deleteTheCommande } from "../requestApi/panier_request.js"
import { getAllPieces, getThePiecet, addThePiece, updatePiece, deleteThePiece } from "../requestApi/piece_request.js"
import { useEffect, useState } from "react"


export function Ajouter () {
    const [items, setItems] = useState([])
    useEffect(() => {
        async function fetchData () {
            try {
                const data = await deleteThePiece("65c4451c9d9dccadb120d05a") // appeler api
                setItems(data) // setState
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    console.log(items)
    return <>
        <h1>Ajouter</h1>
    </>
}