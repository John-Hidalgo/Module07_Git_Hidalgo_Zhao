const EffacerPiece = async (_id, setPieces, ObtiensPieces) => 
{
    try 
    {
        const response = await fetch(`/api/pieces/${_id}/supprimer`, {
            method: 'DELETE',
        })
        if (response.ok) 
        {
            const nouvelleRepertoire = await ObtiensPieces()
            setPieces(nouvelleRepertoire)
            console.log(`Piece with ID ${_id} deleted successfully!`)

        }
        else 
        {

            console.error(`Failed to delete piece with ID ${_id}`)
        }
    }
    catch (error) 
    {
        console.error('Error:', error)
    }
}

export default EffacerPiece