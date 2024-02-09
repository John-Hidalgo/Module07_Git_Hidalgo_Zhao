const DesactiverCommande = async (_id, setCommandes,ObtiensCommandes) =>
{
  try 
  {
    const response = await fetch(`/api/commandes/${_id}/inactif`, {
      method: 'PUT',
    });

    if (response.ok) 
    {
      const updatedCommandes = await ObtiensCommandes();
      setCommandes(updatedCommandes);
      console.log(`Button clicked for ${_id}`);
    }
    else
    {
      console.error('PUT request failed');
    }
  }
  catch (error)
  {
    console.error('Error updating data:', error);
  }
};

export default DesactiverCommande;
