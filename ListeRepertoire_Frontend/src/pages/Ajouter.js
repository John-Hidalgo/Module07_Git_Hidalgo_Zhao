import React from "react"
import { getAllClient, getTheClient, addTheClient, updateClient, deleteTheClient } from "./requestApi/client_request.js"
import { useEffect, useState } from "react"


export function Ajouter () {
    //ici justement pour tester les appels eds apis
    //le format de l'appel comme ici
    const [items, setItems] = useState([])
    useEffect(() => {
        async function fetchData () {
            try {
                const data = await getTheClient("65c4244c73451828ff42d360") // appeler api
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