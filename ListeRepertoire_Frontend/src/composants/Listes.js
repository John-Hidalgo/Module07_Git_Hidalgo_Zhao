import { React, useState, useEffect } from "react"
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

export function Listes ({ listes, handlClickDelete, handlClickEnvoyer }) {

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
                                        <h4 >{l.nomCommande}</h4 >
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
                                <tr key={indexListe}>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td >
                                        <Button alt={indexListe} variant="primary" onClick={() => handlClickEnvoyer(indexListe)} size="sm" className="m-1">Envoyer</Button>
                                    </td>
                                </tr>
                            </>
                        )
                    }
                })}
            </tbody>
        </Table >
    )
}