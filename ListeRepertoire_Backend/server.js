import express from "express"
import { MongoClient, ObjectId } from 'mongodb';


const app = express()
app.use(express.json())

app.get('/api/pieces/:id', GererObtiensUnePiece);
app.post('/api/pieces/ajouter', GererAjouterUnePiece);
app.put('/api/pieces/:id/modifier', GererModifierUnePiece);

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
            rep.status(200).send("Pièce ajoutée");
        }, rep).catch(() => rep.status(500).send("Erreur : la pièce n'a pas été ajoutée"))
        : rep.status(400).send(`Certains paramètres ne sont pas définis: - titre: ${titre} - artiste: ${artiste} - categorie: ${categorie}`);
}
async function GererModifierUnePiece(req, rep)
{
    const idPiece = req.params.id;
    const { titre, artiste, categorie } = req.body;
    if (titre !== undefined || artiste !== undefined || categorie !== undefined)
    {
        UtiliserBD(async (BD) =>
        {
            const updateObject = {};
            if (titre !== undefined) updateObject.titre = titre;
            if (artiste !== undefined) updateObject.artiste = artiste;
            if (categorie !== undefined) updateObject.categorie = categorie;
            const result = await BD.collection('pieces').updateOne({ _id: new ObjectId(idPiece) }, { $set: updateObject });
            if (result.modifiedCount > 0)
            {
                rep.status(200).send("Pièce modifiée avec succès");
            }
            else
            {
                rep.status(404).send("Aucune pièce trouvée avec l'ID fourni");
            }
        }, rep).catch(() => rep.status(500).send("Erreur : la pièce n'a pas été modifiée"));
    }
    else
    {
        rep.status(400).send("Aucun paramètre de modification fourni");
    }

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
        reponse.status(500).json({ message: 'Erreur de connexion à la base de donnée:', error });
    }  
}

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") });


app.listen(8000, () => console.log('Ecoute le port 8000'));

