import { React, useState, useEffect, useRef } from "react"
import { getAllCommandes } from '../requestApi/panier_request.js'

export default function LesCommandes ({ handlechange }) {
    const [items, setItems] = useState([])
    const [selected, setselected] = useState()
    useEffect(() => {
        fetch(`/api/commandes`)
            .then(resultat => resultat.json())
            .then(setItems)
            .catch(console.error)
    }, [])
    console.log(items)

    return (
        <>
            <select id="albums" value={selected} className="form-control" onChange={(e) => handlechange(e.target.value)} name="albums">
                {
                    items.map((i, index) => {
                        return <option value={i.nomCommande} id={index + "alb"}>{i.nomCommande}</option>
                    })
                }
            </select >
        </>
    )
}