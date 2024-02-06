import React from "react"
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react"

export function Client_Repo () {
    const [pieces, setrepo] = useState([])
    useEffect(() => {
        fetch(`/api/pieces`)
            .then(resultat => resultat.json())
            .then(setrepo)
            .catch(console.error)
    }, [])
    pieces.sort((a, b) =>
        (a.categorie > b.categorie) ? 1 : -1)
    return (
        <Table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Artiste</th>
                    <th scope="col">Categorie</th>
                </tr>
            </thead>
            <tbody>
                {pieces.map((p, index) => {
                    return (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td id={index + "titre"}>{p.titre}</td>
                            <td id={index + "titre"}>{p.artiste}</td>
                            <td id={index + "titre"}>{p.categorie}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table >
    )
}