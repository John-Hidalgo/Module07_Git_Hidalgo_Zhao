import React, { useState, useEffect } from 'react';
import ObtiensCommandes from '../../composants/ObtiensCommandes.js';
import DesactiverCommande from '../../composants/DesactiverCommande.js';
import TrierCommandesParDate from '../../composants/TrierParDate.js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, ButtonGroup, FormControl, ListGroup, ListGroupItem, Container } from 'react-bootstrap';
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
      <Container>
            <br/>
          <Button variant="primary" onClick={() => GererVoirCommandesInactif()}>Voir les Commandes actives</Button>{' '}
          <Button variant="info" onClick={() => GererTrierParDate()}>{buttonText}</Button>{' '}
          <Button variant="success" onClick={() => GererVoirTopCinque()}>Les 5 pièces les plus demandées</Button>{' '}
          <br /><br />
          <InputGroup className="mb-3">
              <FormControl
                  type="text"
                  placeholder="filtrer les commandes par nom..."
                  value={nomFiltre}
                  onChange={GererChangementFiltre}
              />
          </InputGroup>
          <Container>
          {commandes.map((commande, index) => (
              
              <div key={index}>
                  <h2>{commande.nomClient}</h2>
                  <p>id : {commande._id}</p>
{/*                  <p>Etat: {commande.etat}</p>*/}
                  {commande.etat === 0 ? (
                      <Button variant="danger" onClick={() => GererDesactiverCommande(commande._id)}>
                          Desactiver ce commande!
                      </Button>
                  ) : (
                      <div disabled>
                          Commande est livrée
                      </div>
                  )}
                  <p>Date de livraison: {commande.date}</p>
                  <ListGroup>
                      
                      Pièces commandées :
                      {commande.ListeDemande.map((demande, i) => (
                         
                          <ListGroupItem key={i}>
                              <strong>{demande.titre}</strong> par {demande.artiste} genre: {demande.categorie}
                          </ListGroupItem>
                      ))}
                      
                  </ListGroup>
                  </div>
              
          ))}
          </Container>
      </Container>
  );
};

export default PageCommandesAdmin;