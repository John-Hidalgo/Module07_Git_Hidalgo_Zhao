const ObtiensCommandes = async () => 
{
    try 
    {
        console.log("calling ObtiensCommandes");
        const response = await fetch('/api/commandes');
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        return [];
    }
};
export default ObtiensCommandes;

