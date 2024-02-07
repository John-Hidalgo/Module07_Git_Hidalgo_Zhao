const TrierCommandesParDate = (commandes, ascendante, setCommandes, setascendante, setTexteBouton) => 
{
    try 
    {
        const commandesCopy = [...commandes];
        const orderMultiplier = ascendante ? 1 : -1;

        const commandesTrier = commandesCopy.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return orderMultiplier * (dateA - dateB);
        });

        setCommandes(commandesTrier);
        setascendante(!ascendante);
        setTexteBouton(`Trier par date (${ascendante ? 'desc' : 'asc'})`);
    }
    catch (error)
    {
        console.error('Error sorting data:', error);
    }
};

export default TrierCommandesParDate;
