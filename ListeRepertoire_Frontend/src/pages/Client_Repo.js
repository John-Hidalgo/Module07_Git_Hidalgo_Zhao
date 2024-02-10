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
    const [filterValuetitre, setFilterValuetitre] = useState('')
    const [filteredArray, setFilterfilteredArray] = useState([])
    const [motcle, setmotcle] = useState('')


    const handleSort = (key) => {
        // console.log(key)
        const sortedData = [...filteredArray].sort((a, b) => {
            if (sortOrder === 'asc') {
                return ((a[key] > b[key]) ? 1 : -1)
            } else {
                return ((b[key] > a[key]) ? 1 : -1)
            }
        })
        setFilterfilteredArray(sortedData)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }
    useEffect(() => {
        // console.log('Effet-commande-execute')
        fetch(`/api/commandes`)
            .then(resultat => resultat.json())
            .then(setItems)
            .catch(console.error)
    }, [])
    useEffect(() => {
        // console.log('Effet-Piece-execute')
        fetch(`/api/pieces`)
            .then(resultat => resultat.json())
            .then((donnees) => { setrepo(donnees); setFilterfilteredArray(donnees) })
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
    const doFiltertitre = () => {
        if (filterValuetitre !== '') {
            //filtre a partir de toutes les donnees dans [pieces]
            const filteredData = pieces.filter((item) => {
                return item[motcle].toLowerCase().includes(filterValuetitre.toLowerCase())
            })
            setFilterfilteredArray(filteredData)
        } else {
            setFilterfilteredArray(pieces) // si filtre data est vide, alors toutes les donnees
        }
    }
    const handleSelectChange = (event, index) => {
        const updatedOptions = [...selectedOptions]
        updatedOptions[index] = event.target.value
        setSelectedOptions(updatedOptions)
    }
    return (
        <Table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Sorted By: </th>
                    <th scope="col">
                        <Bouton onClick={() => handleSort('titre')}>Titre</Bouton>
                    </th>
                    <th scope="col"><Bouton onClick={() => handleSort('artiste')}>Artist</Bouton></th>
                    <th scope="col"><Bouton onClick={() => handleSort('categorie')}>Categorie</Bouton></th>
                    <th scope="col">Liste de Commande</th>
                    <th scope="col">Option</th>
                </tr>
                <tr>
                    <th scope="col">rechercher : </th>
                    <th scope="col"><input type="text" placeholder='mot cle pour titre' onChange={(e) => { setFilterValuetitre(e.target.value); setmotcle('titre') }} /></th>
                    <th scope="col"><input type="text" placeholder='mot cle pour artiste' onChange={(e) => { setFilterValuetitre(e.target.value); setmotcle('artiste') }} /> </th>
                    <th id=""><input type="text" placeholder='mot cle pour categorie' onChange={(e) => { setFilterValuetitre(e.target.value); setmotcle('categorie') }} /></th>
                    <th scope="col"></th>
                    <th scope="col"><Bouton onClick={() => doFiltertitre()}>chercher</Bouton></th>
                </tr>
            </thead>
            <tbody>
                {filteredArray.map((p, index) => {
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