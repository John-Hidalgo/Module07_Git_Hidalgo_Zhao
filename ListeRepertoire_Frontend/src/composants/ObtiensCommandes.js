const ObtiensCommandes = async () => 
{
    try 
    {
        const response = await fetch('/api/commandes');
        const data = await response.json();
        return data;
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        return [];
    }
};
export default ObtiensCommandes;

