import React, { useEffect, useState } from 'react'
import { getAllCommandes } from '../requestApi/panier_request.js'

const ListCommande = () => {
    const [listCommande, setListCommande] = useState()
    useEffect(() => {
        async function fetchData () {
            try {
                const data = await getAllCommandes() // appeler api
                setListCommande((data.map((c) => c.nomCommande))) // setState
                console.log(listCommande)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <label for="albums" class="text-light mx-2">
                Choisissez une liste:
                <select id="albums" class="form-control" name="albums">
                    {
                        listCommande.map((l, index) => {
                            new Option(l.nomCommande)
                        })
                    }
                </select>
            </label>
        </>
    )
}
export default ListCommande