import React from 'react'
import Repertoire from '../composants/Repertoire.js'

const PageRepertoireClients = () => {
    const repertoire = Repertoire()
    return (
        <div>
            <h2>Liste du repertoire</h2>
            <ul>
                {repertoire.map((p) => (
                    <li key={p._id}> {p.titre} {p.artiste} {p.categorie} </li>
                ))}
            </ul>
        </div>
    )
}

export default PageRepertoireClients