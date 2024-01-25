import React from 'react';
import Repertoire from '../composants/Repertoire';

const PageRepertoireClients = () =>
{
    const repertoire = Repertoire();
    return (
        <div>
            <h2>Liste du repertoire</h2>
            <ul>
                {repertoire.map((p) => (
                    <li key={p._id}> {p.titre} {p.artiste} { p.categoire} </li>
                ))}
            </ul>
        </div>
    )
}

export default PageRepertoireClients;