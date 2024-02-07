
const AjouterUnePiece = async (titre,artiste,categorie) => 
{
    try 
    {
    const response = await fetch('/api/pieces/ajouter', {
        method: 'POST',
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
    console.log('Piece added successfully!');
    window.location.reload();
    }
    else
    {
        console.error('Failed to add piece');
    }
    }
    catch (error)
    {
        console.error('Error:', error);
    }
};

export default AjouterUnePiece;