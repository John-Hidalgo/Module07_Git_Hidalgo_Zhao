const ModifierUnePiece = async (_id, titre, artiste, categorie, navigate) =>
{

    try
    {
        const response = await fetch(`/api/pieces/${encodeURIComponent(_id)}/modifier`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titre,
                artiste,
                categorie,
            }),
        });

        if (response.ok) 
        {
            console.log('Piece modified successfully!');
            navigate(`/pieces`);
        } else
        {
            console.error('Failed to modify piece');
        }
    } catch (error)
    {
        console.error('Error:', error);
    }
};

export default ModifierUnePiece;