import React from "react"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

export function Listes ({ listes, handlClickDelete }) {
    return (
        <Table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Nom Liste</th>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Artiste</th>
                    <th scope="col">Categorie</th>
                    <th scope="col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {listes.map((l, indexListe) => {
                    if (l.ListeDemande[0].titre !== undefined) {
                        return (
                            <>
                                <tr key={indexListe}>
                                    <td>
                                        <h3 >Liste : {l.nomCommande}</h3 >
                                    </td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                </tr>
                                {
                                    l.ListeDemande.map((piece, indexPiece) => {
                                        return (
                                            <tr key={indexPiece}>
                                                <th id={indexPiece + "titre"}></th>
                                                <th>{indexPiece + 1}</th>
                                                <td id={indexPiece + "titre"}>{piece.titre}</td>
                                                <td id={indexPiece + "artiste"}>{piece.artiste}</td>
                                                <td id={indexPiece + "categorie"}>{piece.categorie}</td>
                                                <td>
                                                    <Button alt={indexPiece} variant="danger" onClick={() => handlClickDelete(indexListe, indexPiece)} size="sm" className="m-1">Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                })}
            </tbody>
        </Table >
    )
}