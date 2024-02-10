import React from "react";
import CommandesActifs from "../../composants/CommandesActif.js";
const PageCommandesActifAdmin = () => 
{
    const commandes = CommandesActifs();
 
    return (
    <div>
        {commandes.map((commande, index) => (
        <div key={index}>
            <h2>{commande.nomClient}</h2>
            <p>id: {commande._id}</p>
            {/* <p>Etat: {commande.etat}</p> */}
            <p>Date de début de la commande: {commande.date}</p>
            <ul>
            {commande.ListeDemande.map((demande, i) => (
                <li key={i}>
                    <strong>{demande.titre}</strong> par <strong>{demande.artiste}</strong>{" "} 
                        {Array.isArray(demande.categorie) ?
                        `Genres: ${demande.categorie.join(', ')}` :
                        `Genre: ${demande.categorie}`}
                </li>
            ))}
            </ul>
            
        </div>
        ))}
    </div>
    );
};

export default PageCommandesActifAdmin;