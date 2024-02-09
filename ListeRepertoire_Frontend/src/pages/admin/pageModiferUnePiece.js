import React, { useState } from 'react'
import ModifierUnePiece from '../../composants/ModifierUnePiece.js'
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
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
        <Container>
        <br />
            Veuillez entrer le nom de l’artiste titre et la catégorie pour modifier la pièce de votre répertoire.
        <br /><br />
        <label>
            Titre:
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />
            </InputGroup>
        </label>
        <br />
        <label>
            Artiste:
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    value={artiste}
                    onChange={(e) => setArtiste(e.target.value)}
                />
            </InputGroup>
        </label>
        <br />
        <label>
            Categories:
            {categories.map((category, index) => (
                <div key={index} className="mb-3">
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={category}
                            onChange={(e) => GererAjouterNouvelleCategorie(index, e.target.value)}
                        />
                    </InputGroup>
                </div>
            ))}
        <Button onClick={AjouterNouvelleEntree}> Ajoutez une categorie</Button>
        </label>
        <br /><br />
        <Button onClick={gererModifierUnePiece} disabled={!boutonActif}>Ajouter à votre répertoire </Button>
        </Container>
  )
}

export default PageModifierPieceAdmin;

