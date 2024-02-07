import React, { useState, useEffect } from 'react';
import ObtiensCommandes from '../../composants/ObtiensCommandes.js';
import DesactiverCommande from '../../composants/DesactiverCommande.js';
import TrierCommandesParDate from '../../composants/TrierParDate.js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
const PageCommandesAdmin = () => 
{
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState([]);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [buttonText, setTexteBouton] = useState('Trier par date (asc)');
    const [nomFiltre, setNomFiltre] = useState('');
    const [delaiNomFiltre, setDelaiNomFiltre] = useState('');
    useEffect(() => 
    {
        const timer = setTimeout(() => {
        setDelaiNomFiltre(nomFiltre);
        }, 500);
        return () => {clearTimeout(timer);};
    }, [nomFiltre]);
    useEffect(() => 
    {
        FiltrerParNom(nomFiltre,commandes,setCommandes);
    }, [delaiNomFiltre]);
    useEffect(() => 
    {
        const fetchInitiale = async () => {
        const data = await ObtiensCommandes();
        setCommandes(data);
        };
        fetchInitiale();
    }, []);
    const GererDesactiverCommande = async (_id) => 
    {
        DesactiverCommande(_id,setCommandes,ObtiensCommandes);
    };
    const GererTrierParDate = () =>
    {
        TrierCommandesParDate(commandes, ascendingOrder, setCommandes, setAscendingOrder, setTexteBouton);
    }
    const FiltrerParNom  = async () =>
    {
        if (nomFiltre !== '')
        {
            console.log('nonempty');
            const nomFiltreLower = nomFiltre.toLowerCase();
            const commandesFiltrees = commandes.filter((commande) =>
                commande.nomClient.toLowerCase().includes(nomFiltreLower)
            );
            setCommandes(commandesFiltrees);
        }
        else
        {
            console.log('empty');
            const data = await ObtiensCommandes();
            setCommandes(data);
        }
    }

    const GererChangementFiltre = (e) => {
        setNomFiltre(e.target.value);
        FiltrerParNom();
    };
    const GererVoirCommandesInactif = () =>
    {
        navigate(`/commandesInactif`);
    }
    const GererVoirTopCinque = () =>
    {
        navigate(`/topCinque`);
    }
  return (
      <div>
        <button onClick={() => GererVoirCommandesInactif()}> Voir les Commandes inactif</button>
        <button onClick={() => GererTrierParDate()}> {buttonText}</button>
        <input type="text" placeholder="filtrer les commandes par nom..."
            value={nomFiltre} onChange={GererChangementFiltre}
          />
        <button onClick={() => GererVoirTopCinque()}> les 5 pièces les plus demandées.</button>
      {commandes.map((commande, index) => (
        <div key={index}>
            <h2>{commande.nomClient}</h2>
            <p>id: {commande._id}</p>
            <p>Etat: {commande.etat}</p>
            {commande.etat === 0 ? (
            <button onClick={() => GererDesactiverCommande(commande._id)}>
                Desactiver ce commande!
            </button>
            ) : (
            <div disabled>
                Commande est livrée
            </div>
            )}
            <p>Date: {commande.date}</p>
            <ListGroup>
            {commande.ListeDemande.map((demande, i) => (
                <ListGroupItem key={i}>
                <strong>{demande.titre}</strong> par {demande.artiste} genre: {demande.categorie}
                </ListGroupItem>
            ))}
            </ListGroup>
          
        </div>
      ))}
    </div>
  );
};

export default PageCommandesAdmin;