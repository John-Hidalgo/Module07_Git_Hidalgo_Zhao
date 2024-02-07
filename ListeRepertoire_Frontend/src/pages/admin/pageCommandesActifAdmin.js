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
            <p>Etat: {commande.etat}</p>
            <p>Date: {commande.date}</p>
            <ul>
            {commande.ListeDemande.map((demande, i) => (
                <li key={i}>
                    <strong>{demande.titre}</strong> by {demande.artiste} ({demande.categorie})   
                </li>
            ))}
            </ul>
            
        </div>
        ))}
    </div>
    );
};

export default PageCommandesActifAdmin;