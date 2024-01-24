import express from "express"
import { MongoClient, ObjectId } from 'mongodb';


const app = express()
app.use(express.json())

app.get('/api/pieces/:id', GererObtiensUnePiece);
app.post('/api/pieces/ajouter', GererAjouterUnePiece);
app.put('/api/pieces/:id/modifier ', GererModifierUnePiece);

async function GererObtiensUnePiece(req,rep)
{
    UtiliserBD(async (BD) =>
    {
        const idPiece = req.params.id;
        const infoPiece = await BD.collection('pieces').findOne({ _id: new ObjectId(idPiece) });
        rep.status(200).json(infoPiece);
    },rep)
}
async function GererAjouterUnePiece(req, rep)
{
    const { titre, artiste, categorie } = req.body;
    titre !== undefined && artiste !== undefined && categorie !== undefined ?
        UtiliserBD(async (BD) => 
        {
            await BD.collection('pieces').insertOne({
                titre,
                artiste,
                categorie
            });
            rep.status(200).send("Pi�ce ajout�e");
        }, rep)
            .catch(() => rep.status(500).send("Erreur : la pi�ce n'a pas �t� ajout�e"))
        : rep.status(400).send(`Certains param�tres ne sont pas d�finis: - titre: ${titre} - artiste: ${artiste} - categorie: ${categorie}`);
}
async function GererModifierUnePiece(req, rep)
{

}


async function UtiliserBD(operations, reponse)
{
    try
    {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017');
        //console.log('Connected to MongoDB');
        const BD = client.db('repertoire');
        //console.log('Selected database: repertoire');
        await operations(BD);
        client.close();
        //console.log('Connection closed');
    }
    catch (error)
    {
        //console.error('Error connecting to the database:', error);
        reponse.status(500).json({ message: 'Erreur de connexion � la base de donn�e:', error });
    }  
}

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") });


app.listen(8000, () => console.log('Ecoute le port 8000'));

