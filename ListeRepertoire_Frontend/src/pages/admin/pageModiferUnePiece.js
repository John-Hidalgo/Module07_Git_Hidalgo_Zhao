import React, { useState } from 'react';
import ModifierUnePiece from '../../composants/ModifierUnePiece.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PageModifierPieceAdmin = () => 
{
    const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [artiste, setArtiste] = useState('');
  const [categorie, setCategorie] = useState('');
  const { id } = useParams();
  const isButtonActive = titre !== '' && artiste !== '' && categorie !== '';
  const gererModifierUnePiece = async () => {
    ModifierUnePiece(id, titre, artiste, categorie,navigate);
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
      <button onClick={gererModifierUnePiece} disabled={!isButtonActive}>
        Send
      </button>
    </div>
  );
};

export default PageModifierPieceAdmin;

