import React from 'react'
import Repertoire from '../composants/Repertoire.js'
import Button from 'react-bootstrap/Button'

const PageRepertoireClients = () => {
    function ajouter (titre, artise, categorie) {
        const id = `65c27d5e203afca56337040d`
        fetch(`/api/list/${id}/modifier`, {
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


    const repertoire = Repertoire()
    return (
        <div>
            <h2>Liste du repertoire</h2>
            <ul>
                {repertoire.map((p, index) => (
                    <li key={p._id}> {p.titre} {p.artiste} {p.categorie}
                        <Button alt={index} variant="warning"
                            onClick={() => {
                                // const piece = { p.titre, p.artiste, p.categorie }
                                // alert(p.titre)
                                // alert(p.artiste)
                                // alert(p.categorie)
                                ajouter(p.titre, p.artiste, p.categorie)
                            }} size="sm" className="m-1">
                            Ajouter
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default PageRepertoireClients