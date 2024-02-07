import React, { useState, useEffect } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
import ObtiensPieces from '../../composants/ObtiensPieces.js';
import EffacerPiece from '../../composants/EffacerPiece.js';
import { Button, ListGroup } from 'react-bootstrap';
const PagePiecesAdmin = () => 
{
    const history = useNavigate();
    const [pieces, setPieces] = useState([]);
    useEffect(() => 
    {
        const fetchInitiale = async () => {
        const data = await ObtiensPieces();
        setPieces(data);
        };
        fetchInitiale();
    }, []);
    const GererModifierPiece = (_id) =>
    {
        history(`/modifier-piece/${_id}`);
    }

    const GererEffacerPiece = async (_id) =>
    {
        EffacerPiece(_id,setPieces,ObtiensPieces)
    }
    const GererAjouterPiece = async () =>
    {
        history(`/piecesAjouter`);
    }
    return (
    <div>
        <h2>Liste du repertoire <Button variant="info"  onClick={() => GererAjouterPiece()}> Ajoutez Une Piece </Button></h2>
        <ListGroup>
            {pieces.map((p) => (
                <ListGroup.Item key={p._id}>
                    <strong>{p.titre}</strong> par <strong>{p.artiste}</strong> dans le genre <strong>{p.categorie}</strong> {' '}
                    <Button variant="primary" onClick={() => GererModifierPiece(p._id)}>
                        Modifier
                    </Button>{' '}
                    <Button variant="danger" onClick={() => GererEffacerPiece(p._id)}>
                        Effacer
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
    )
}

export default PagePiecesAdmin;