import { useEffect, useState } from 'react';

const Piece = (id) => {
  const [piece, setPiece] = useState({
    titre: '',
    artiste: '',
    categorie: [''],
  });

  useEffect(() => {
    const obtiensPiece = async () => {
      try {
        const reponse = await fetch(`/api/pieces/${id}`);
        const data = await reponse.json();
        setPiece(data);
      } catch (erreur) {
        console.error(erreur);
      }
    };

    obtiensPiece();
  }, [id]);

  return piece;
};

export default Piece;
