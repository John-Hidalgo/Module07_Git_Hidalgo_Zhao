import express from "express"
import { MongoClient } from 'mongodb';


const app = express()
app.use(express.json())

app.get('/api/pieces/:id ', GererObtiensUnePiece);
app.post('/api/pieces/ajouter ', GererAjouterUnePiece);
app.put('/api/pieces/:id/modifier ', GererModifierUnePiece);

async function GererObtiensUnePiece(req,rep)
{

}
async function GererAjouterUnePiece(req, rep)
{

}
async function GererModifierUnePiece(req, rep)
{

}




async function UtiliserBD(operations, reponse)
{
    try
    {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017');
        const BD = client.db('repertoire');
        await operations(BD);
        client.close();
    }
    catch (e)
    {
        response.status(500).json({ message: 'Erreur de connexion � la base de donn�e:', e });
    }
    
}

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") })


app.listen(8000, () => console.log('Ecoute le port 8000'))

