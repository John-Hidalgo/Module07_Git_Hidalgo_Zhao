const ObtiensPieces = async () => 
{
    try 
    {
        const response = await fetch('/api/pieces');
        const data = await response.json();
        return data;
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        return [];
    }
};
export default ObtiensPieces;