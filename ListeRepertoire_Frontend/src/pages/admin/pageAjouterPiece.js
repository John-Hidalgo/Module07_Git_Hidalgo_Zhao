import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import AjouterUnePiece from '../../composants/AjouterUnePiece';

const PageAjouterPieceAdmin = () => 
{
  const [titre, setTitre] = useState('');
  const [artiste, setArtiste] = useState('');
  const [categorie, setCategorie] = useState('');

  const isButtonActive = titre !== '' && artiste !== '' && categorie !== '';

    const gererAjouterUnePiece = async () => 
    {
        AjouterUnePiece(titre,artiste,categorie);
    };
  return (
      <Container>
          <br />
          Veuillez entrer le nom de l’artiste titre et la catégorie pour ajouter une nouvelle pièce à votre répertoire.
          <br /><br />
          <InputGroup className="mb-3">
              <InputGroup.Text>Titre:</InputGroup.Text>
              <FormControl value={titre} onChange={(e) => setTitre(e.target.value)} />
          </InputGroup>

          <InputGroup className="mb-3">
              <InputGroup.Text>Artiste:</InputGroup.Text>
              <FormControl value={artiste} onChange={(e) => setArtiste(e.target.value)} />
          </InputGroup>

          <InputGroup className="mb-3">
              <InputGroup.Text>Categorie:</InputGroup.Text>
              <FormControl value={categorie} onChange={(e) => setCategorie(e.target.value)} />
          </InputGroup>

          <Button variant="primary" onClick={gererAjouterUnePiece} disabled={!isButtonActive}>
              Ajoutez
          </Button>
      </Container>
  );
};

export default PageAjouterPieceAdmin;

