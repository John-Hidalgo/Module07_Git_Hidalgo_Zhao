import React from "react"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
export function ListePieces ({ pieces, handlClickDelete, handlClickModifier }) {
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
                    <th scope="col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {pieces.map((p, index) => {
                    return (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td id=""><input type="text" id={index + "titre"} placeholder={p.titre} /></td>
                            <td id=""><input type="text" id={index + "artiste"} placeholder={p.artiste} /></td>
                            <td id=""><input type="text" id={index + "categorie"} placeholder={p.categorie} /></td>
                            <td>
                                <Button alt={index} variant="danger" onClick={() => handlClickDelete(p._id)} size="sm" className="m-1">Delete</Button>
                                <Button alt={index} variant="warning" onClick={() => {
                                    const newTitre = document.getElementById(index + "titre").value
                                    const newArtiste = document.getElementById(index + "artiste").value
                                    const newCategorie = document.getElementById(index + "categorie").value
                                    handlClickModifier(p._id, { newTitre, newArtiste, newCategorie })
                                }} size="sm" className="m-1">Modifier</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table >
    )
}