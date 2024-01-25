import React from 'react';
import Repertoire from '../composants/Repertoire';

const PageRepertoireClients = () =>
{
    const repertoire = Repertoire();
    return (
        <>
            <h1>Liste du repertoire</h1>
            {
                repertoire.map(p => (p.titre
                ))
            }
        </>
    )
}

export default PageRepertoireClients;