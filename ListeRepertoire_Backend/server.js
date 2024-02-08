import express from "express"
import { MongoClient, ObjectId } from 'mongodb'


const app = express()
app.use(express.json())
app.get('/api/pieces/:id', GererObtiensUnePiece)
app.post('/api/pieces/ajouter', GererAjouterUnePiece)
app.put('/api/pieces/:id/modifier', GererModifierUnePiece)
app.delete('/api/pieces/:id/supprimer', GererSupprimerUnePiece)
app.get('/api/pieces', GererTousPieces)
app.post('/api/list/ajouter', AjouterUneListeDemande)
app.get('/api/list/:id', TrouverUneListe)
app.put('/api/list/:id/modifier', ModifierAjouterUnePieceDansListeDemande)
app.get('/api/commandes', GererObtiensCommandes)
app.get('/api/commandes/actif', GererObtiensCommandesActif)
app.put('/api/commandes/:id/inactif', GererMetsCommandesInactif)
//--------------------------------------------------------------------
app.get('/api/clients', ObtiensClients)
app.get('/api/clients/:id', ObtiensClient)
app.post('/api/clients/ajouter', AjouterClient)
app.put('/api/clients/:id/modifier', ModifierClient)
app.delete('/api/clients/:id/supprimer', SupprimerClient)
//--------------------------------------------------------------------
async function ObtiensClients (requete, reponse) {
    UtiliserBD(async (BD) => {
        const clients = await BD.collection('clients').find().toArray()
        reponse.status(200).json(clients)
    }, reponse)
}
async function ObtiensClient (requete, reponse) {
    UtiliserBD(async (BD) => {
        const idClient = requete.params.id
        const infoClient = await BD.collection('clients').findOne({ _id: new ObjectId(idClient) })
        reponse.status(200).json(infoClient)
    }, reponse)
}
async function AjouterClient (requete, reponse) {
    const { nom, abonnement, password } = requete.body
    nom !== undefined && abonnement !== undefined && password !== undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('clients').insertOne({
                nom,
                abonnement,
                password
            })
            reponse.status(200).send("Client ajoutee")
        }, reponse).catch(() => reponse.status(500).send("Erreur : le client n'a pas ete ajoutee"))
        : reponse.status(400).send(`Certains parametres ne sont pas definis: - nom: ${nom} - abonnement: ${abonnement} - password ${password}`)
}
async function ModifierClient (requete, reponse) {
    const idClient = requete.params.id
    const { nom, abonnement } = requete.body
    if (nom !== undefined || abonnement !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {}
            updateObject.nom = nom
            updateObject.abonnement = abonnement
            const result = await BD.collection('clients').updateOne({ _id: new ObjectId(idClient) }, { $set: updateObject })
            if (result.modifiedCount > 0) {
                reponse.status(200).send("Client modifiee avec succes")
            }
            else {
                reponse.status(404).send("Aucun client trouvee avec l'ID fourni")
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur : le client n'a pas ete modifiee"))
    }
    else {
        reponse.status(400).send("Aucun parametre de modification fourni")
    }
}
async function SupprimerClient (requete, reponse) {
    const { id: clientID } = requete.params
    if (clientID !== undefined && clientID !== "") {
        UtiliserBD(async (db) => {
            const resultat = await db.collection('clients').deleteOne({ _id: new ObjectId(clientID) })

            if (resultat.deletedCount === 1) {
                reponse.status(200).send(`${resultat.deletedCount} client supprime`)
            }
            else {
                reponse.status(500).send("Le client n'a pas ete supprime")
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur: le client n'a pas ete supprime"))
    }
    else {
        reponse.status(400).send("Paramètre 'id' manquant ou invalide")
    }
}
//--------------------------------------------------------------------
async function GererTousPieces (requete, reponse) {
    console.log("calling handler")
    UtiliserBD(async (BD) => {
        console.log("calling query on db")
        const pieces = await BD.collection('pieces').find().toArray()
        reponse.status(200).json(pieces)
    }, reponse)
}

async function GererSupprimerUnePiece (requete, reponse) {
    const { id: pieceId } = requete.params
    if (pieceId !== undefined && pieceId !== "") {
        UtiliserBD(async (db) => {
            const resultat = await db.collection('pieces').deleteOne({ _id: new ObjectId(pieceId) })

            if (resultat.deletedCount === 1) {
                reponse.status(200).send(`${resultat.deletedCount} piece supprime`)
            }
            else {
                reponse.status(500).send("La piece n'a pas ete supprime")
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur: la piece n'a pas ete supprime"))
    }
    else {
        reponse.status(400).send("Paramètre 'id' manquant ou invalide")
    }
}
//----------------------------demandes--------------------------------------
async function AjouterUneListeDemande (requete, reponse) {
    const { client, liste_demandes, liste_nom } = requete.body
    client !== undefined && liste_demandes !== undefined && liste_nom != undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('demandes').insertOne({
                liste_demandes,
                client,
                liste_nom
            })
            reponse.status(200).send("Liste ajoutee")
        }, reponse).catch(() => reponse.status(500).send("Erreur : la liste n'a pas ete ajoutee"))
        : reponse.status(400).send(`Certains parametres ne sont pas definis: - client: ${client} - liste_demandes: ${liste_demandes} - liste_nom: ${liste_nom}`)
}
async function TrouverUneListe (requete, reponse) {
    UtiliserBD(async (BD) => {
        const idListe = requete.params.id
        const liste = await BD.collection('demandes').findOne({ _id: new ObjectId(idListe) })
        reponse.status(200).json(liste)
    }, reponse)
}
async function ModifierAjouterUnePieceDansListeDemande (requete, reponse) {
    const idListe = requete.params.id
    const { titre, artiste, categorie } = requete.body
    if (titre !== undefined || artiste !== undefined || categorie !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {}
            updateObject.titre = titre
            updateObject.artiste = artiste
            updateObject.categorie = categorie
            //根据id找到源liste
            const ele = await BD.collection('demandes').findOne({ _id: new ObjectId(idListe) })
            const oldList = ele['liste_demandes']
            //update en Rajoutant
            oldList.push(updateObject)
            console.log(oldList)
            const result = await BD.collection('demandes').updateOne({ _id: new ObjectId(idListe) }, { $set: { "liste_demandes": oldList } })
            if (result.modifiedCount > 0) {
                reponse.status(200).send("Liste modifiee avec succes")
            }
            else {
                reponse.status(404).send("Aucune liste trouvee avec l'ID fourni")
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur : la liste n'a pas ete modifiee"))
    }
    else {
        reponse.status(400).send("Aucun parametre de modification fourni")
    }
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

async function GererModifierUnePiece (req, rep) {
    const idPiece = req.params.id
    const { titre, artiste, categorie } = req.body
    console.log(idPiece)
    if (ObjectId.isValid(idPiece) && (titre !== undefined || artiste !== undefined || categorie !== undefined)) {
        UtiliserBD(async (BD) => {
            const nouvelleObjet = {}
            if (titre !== undefined) nouvelleObjet.titre = titre
            if (artiste !== undefined) nouvelleObjet.artiste = artiste
            if (categorie !== undefined) nouvelleObjet.categorie = categorie
            const result = await BD.collection('pieces').updateOne(
                { _id: new ObjectId(idPiece) },
                { $set: nouvelleObjet }
            )
            if (result.modifiedCount > 0) {
                rep.status(200).send("Pièce modifiée avec succès")
            } else {
                rep.status(404).send("Aucune pièce trouvée avec l'ID fourni")
            }
        }, rep).catch(() => rep.status(500).send("Erreur : la pièce n'a pas été modifiée"))
    } else {
        rep.status(400).send("Invalid ObjectId or no modification parameters provided")
    }
}


async function UtiliserBD (operations, reponse) {
    try {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017')
        console.log('Connected to MongoDB')
        // const BD = client.db('repertoire');
        const BD = client.db('Module07')
        console.log('Selected database: repertoire')
        await operations(BD)
        client.close()
        console.log('Connection closed')
    }
    catch (error) {
        console.error('Error connecting to the database:', error)
        reponse.status(500).json({ message: 'Erreur de connexion � la base de donn�e:', error })
    }
}

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") })


app.listen(8000, () => console.log('Ecoute le port 8000'))

async function GererObtiensCommandes (req, rep) {
    UtiliserBD(async (db) => {
        const commandes = await db.collection('commandes').find().toArray()
        rep.status(200).json(commandes)
    }, rep)
}

async function GererObtiensCommandesActif (req, rep) {
    UtiliserBD(async (db) => {
        const commandes = await db.collection('commandes').find({ 'etat': 0 }).toArray()
        rep.status(200).json(commandes)
    }, rep)
}

async function GererMetsCommandesInactif (req, rep) {
    const commandeId = req.params.id
    UtiliserBD(async (db) => {
        const result = await db.collection('commandes').updateOne(
            { "_id": new ObjectId(commandeId) },
            { $set: { "etat": 1 } }
        )

        if (result.modifiedCount === 1) {
            rep.status(200).json({ message: 'Mise à jour réussie' })
        }
        else {
            rep.status(404).json({ message: 'Aucune commande trouvée avec cet ID' })
        }
    }, rep)
}