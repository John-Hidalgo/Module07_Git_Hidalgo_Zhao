import { MongoClient } from 'mongodb';

async function UtiliserBD(operations, reponse) 
{
    try 
    {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017');
        console.log('Connected to MongoDB');
        const BD = client.db('bdtp');
        console.log('Selected database: bdtp');
        await operations(BD);
        client.close();
        console.log('Connection closed');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        reponse.status(500).json({ message: 'Erreur de connexion � la base de donn�e:', error });
    }
}

export default UtiliserBD;