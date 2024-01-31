import express from "express"
import { MongoClient, ObjectId } from 'mongodb'


const app = express()
app.use(express.json())
app.get('/api/pieces/:id', GererObtiensUnePiece)
app.post('/api/pieces/ajouter', GererAjouterUnePiece)
app.put('/api/pieces/:id/modifier', GererModifierUnePiece)
app.delete('/api/pieces/:id/supprimer', GererSupprimer)
app.get('/api/pieces', GererTousPieces)
//--------------------------------------------------------------------
async function GererTousPieces (requete, reponse) {
    UtiliserBD(async (BD) => {
        const pieces = await BD.collection('pieces').find().toArray()
        reponse.status(200).json(pieces)
    }, reponse)
}

async function GererSupprimer (requete, reponse) {
    const pieceId = requete.params.id
    UtiliserBD(async (BD) => {
        const resultat = await BD.collection('pieces').deleteOne({ _id: new ObjectId(pieceId) })
        console.log(resultat)
        if (resultat.deletedCount === 1) {
            reponse.status(200).send(`${resultat.deletedCount} piece supprime`)
        } else {
            reponse.status(404).send("La piece n'a pas trouve")
        }
    }, reponse).catch(
        () => reponse.status(500).send("Erreur: la piece n'a pas ete supprime")
    )
}
// -------------------------------------------------------------------

async function GererObtiensUnePiece (req, rep) {
    UtiliserBD(async (BD) => {
        const idPiece = req.params.id
        const infoPiece = await BD.collection('pieces').findOne({ _id: new ObjectId(idPiece) })
        rep.status(200).json(infoPiece)
    }, rep)
}
async function GererAjouterUnePiece (req, rep) {
    const { titre, artiste, categorie } = req.body
    titre !== undefined && artiste !== undefined && categorie !== undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('pieces').insertOne({
                titre,
                artiste,
                categorie
            })
            rep.status(200).send("Piece ajoutee")
        }, rep).catch(() => rep.status(500).send("Erreur : la piece n'a pas ete ajoutee"))
        : rep.status(400).send(`Certains parametres ne sont pas definis: - titre: ${titre} - artiste: ${artiste} - categorie: ${categorie}`)
}

async function GererModifierUnePiece (req, rep) {  //marche pas
    const idPiece = req.params.id
    const { titre, artiste, categorie } = req.body
    if (titre !== undefined || artiste !== undefined || categorie !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {}
            if (titre !== undefined) updateObject.titre = titre
            if (artiste !== undefined) updateObject.artiste = artiste
            if (categorie !== undefined) updateObject.categorie = categorie
            const result = await BD.collection('pieces').updateOne({ _id: new ObjectId(idPiece) }, { $set: updateObject })
            if (result.modifiedCount > 0) {
                rep.status(200).send("Piece modifiee avec succes")
            }
            else {
                rep.status(404).send("Aucune piece trouvee avec l'ID fourni")
            }
        }, rep).catch(() => rep.status(500).send("Erreur : la piece n'a pas ete modifiee"))
    }
    else {
        rep.status(400).send("Aucun parametre de modification fourni")
    }

}


async function UtiliserBD (operations, reponse) {
    try {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017')
        //console.log('Connected to MongoDB');
        // const BD = client.db('repertoire')
        const BD = client.db('Module07')
        //console.log('Selected database: repertoire');
        await operations(BD)
        client.close()
        //console.log('Connection closed');
    }
    catch (error) {
        //console.error('Error connecting to the database:', error);
        reponse.status(500).json({ message: 'Erreur de connexion � la base de donn�e:', error })
    }
}

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") })


app.listen(8000, () => console.log('Ecoute le port 8000'));

