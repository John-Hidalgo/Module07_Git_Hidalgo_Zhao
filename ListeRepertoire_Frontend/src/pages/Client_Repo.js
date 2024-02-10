import React from "react"
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react"
import Bouton from 'react-bootstrap/Button'
import LesCommandes from '../composants/LesCommandes.js'
export function Client_Repo () {
    const [pieces, setrepo] = useState([])
    const [items, setItems] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])
    const [sortOrder, setSortOrder] = useState('asc')

    const handleSort = (key) => {
        const sortedData = [...pieces].sort((a, b) => {
            if (sortOrder === 'asc') {
                return ((a[key] > b[key]) ? 1 : -1)
            } else {
                return ((b[key] > a[key]) ? 1 : -1)
            }
        })
        setrepo(sortedData)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
    useEffect(() => {
        fetch(`/api/commandes`)
            .then(resultat => resultat.json())
            .then(setItems)
            .catch(console.error)
    }, [])
    useEffect(() => {
        fetch(`/api/pieces`)
            .then(resultat => resultat.json())
            .then(setrepo)
            .catch(console.error)
    }, [])

    function ajouter (titre, artise, categorie, index) {
        // alert(titre)
        // alert(artise)
        // alert(categorie)
        // alert(selectedOptions[index])
        fetch(`/api/commandes/${selectedOptions[index]}/ajouter`, {
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

    const handleSelectChange = (event, index) => {
        const updatedOptions = [...selectedOptions]
        updatedOptions[index] = event.target.value
        setSelectedOptions(updatedOptions)
    }
    // pieces.sort((a, b) =>
    //     (a.categorie > b.categorie) ? 1 : -1)
    return (
        <Table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Sorted By: </th>
                    <th scope="col">
                        <td ><Bouton onClick={() => handleSort('titre')}>Titre</Bouton></td>
                    </th>
                    <th scope="col"><Bouton onClick={() => handleSort('titre')}>Artist</Bouton></th>
                    <th scope="col"><Bouton onClick={() => handleSort('titre')}>Categorie</Bouton></th>
                    <th scope="col">Liste de Commande</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                {pieces.map((p, index) => {
                    return (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td id={index + "titre"}>{p.titre}</td>
                            <td id={index + "artiste"}>{p.artiste}</td>
                            <td id={index + "categorie"}>{p.categorie}</td>
                            <td id={index + 'selected'}>
                                <select id={index + p.titre} value={selectedOptions[index] || ''} className="form-control" onChange={(event) => handleSelectChange(event, index)} name="liste">
                                    {
                                        items.map((i, index) => {
                                            return <option key={index} value={i.nomCommande} id={index + "alb"}>{i.nomCommande}</option>
                                        })
                                    }
                                </select >
                            </td>
                            <td ><Bouton onClick={() => {
                                ajouter(p.titre, p.artiste, p.categorie, index)
                            }}>Ajouter</Bouton></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table >
    )
}