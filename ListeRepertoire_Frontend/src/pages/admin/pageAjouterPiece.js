import React, { useState } from 'react';
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
    <div>
      <label>
        Titre:
        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
      </label>
      <br />
      <label>
        Artiste:
        <input type="text" value={artiste} onChange={(e) => setArtiste(e.target.value)} />
      </label>
      <br />
      <label>
        Categorie:
        <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
      </label>
      <br />
      <button onClick={gererAjouterUnePiece} disabled={!isButtonActive}>
        Send
      </button>
    </div>
  );
};

export default PageAjouterPieceAdmin;

