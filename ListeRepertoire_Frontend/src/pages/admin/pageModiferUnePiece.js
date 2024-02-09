import React, { useState } from 'react'
import ModifierUnePiece from '../../composants/ModifierUnePiece.js'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const PageModifierPieceAdmin = () => 
{
  const [titre, setTitre] = useState('');
  const [artiste, setArtiste] = useState('');
  const [categories, setCategories] = useState(['']);
  const [boutonActif, setBoutonActif] = useState(false);
  const navigate = useNavigate();
  const GererAjouterNouvelleCategorie = (index, value) => 
  {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
    setBoutonActif(newCategories.some((category) => category !== ''));
  };
  const AjouterNouvelleEntree = () => 
  {
      setCategories([...categories, '']);
  };
  const { id } = useParams()

  const gererModifierUnePiece = async () => 
  {
    ModifierUnePiece(id, titre, artiste, categories, navigate)
  }

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
        <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} />
      </label>
      <br />
      <button onClick={gererModifierUnePiece} disabled={!boutonActif}>
        Send
      </button>
    </div>
  )
}

export default PageModifierPieceAdmin;

