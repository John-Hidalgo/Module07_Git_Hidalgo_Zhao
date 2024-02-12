import { ObjectId } from 'mongodb';
import UtiliserBD from '../connexion.js';

async function ObtiensClients(requete, reponse) {
    UtiliserBD(async (BD) => {
        const clients = await BD.collection('clients').find().toArray();
        reponse.status(200).json(clients);
    }, reponse);
}

async function ObtiensClient(requete, reponse) {
    UtiliserBD(async (BD) => {
        const idClient = requete.params.id;
        const infoClient = await BD.collection('clients').findOne({ _id: new ObjectId(idClient) });
        reponse.status(200).json(infoClient);
    }, reponse);
}

async function ObtiensClientByNom(requete, reponse) {
    const { nom, password } = requete.body;
    UtiliserBD(async (BD) => {
        const infoClient = await BD.collection('clients').findOne({ nom: nom, password: password });
        if (infoClient) {
            reponse.status(200).json(infoClient);
        } else {
            console.log(reponse);
            reponse.status(401).json({ error: 'Login Failed!' });
        }
    }, reponse);
}

async function AjouterClient(requete, reponse) {
    const { nom, abonnement, password } = requete.body;
    nom !== undefined && abonnement !== undefined && password !== undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('clients').insertOne({
                nom,
                abonnement,
                password
            });
            reponse.status(200).send("Client ajoutee");
        }, reponse).catch(() => reponse.status(500).send("Erreur : le client n'a pas ete ajoutee"))
        : reponse.status(400).send(`Certains parametres ne sont pas definis: - nom: ${nom} - abonnement: ${abonnement} - password ${password}`);
}

async function ModifierClient(requete, reponse) {
    const idClient = requete.params.id;
    const { nom, abonnement } = requete.body;
    if (nom !== undefined || abonnement !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {};
            updateObject.nom = nom;
            updateObject.abonnement = abonnement;
            const result = await BD.collection('clients').updateOne({ _id: new ObjectId(idClient) }, { $set: updateObject });
            if (result.modifiedCount > 0) {
                reponse.status(200).send("Client modifiee avec succes");
            }
            else {
                reponse.status(404).send("Aucun client trouvee avec l'ID fourni");
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur : le client n'a pas ete modifiee"));
    }
    else {
        reponse.status(400).send("Aucun parametre de modification fourni");
    }
}

async function SupprimerClient(requete, reponse) {
    const { id: clientID } = requete.params;
    if (clientID !== undefined && clientID !== "") {
        UtiliserBD(async (db) => {
            const resultat = await db.collection('clients').deleteOne({ _id: new ObjectId(clientID) });

            if (resultat.deletedCount === 1) {
                reponse.status(200).send(`${resultat.deletedCount} client supprime`);
            }
            else {
                reponse.status(500).send("Le client n'a pas ete supprime");
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur: le client n'a pas ete supprime"));
    }
    else {
        reponse.status(400).send("Paramètre 'id' manquant ou invalide");
    }
}

export {
    ObtiensClients,
    ObtiensClient,
    ObtiensClientByNom,
    AjouterClient,
    ModifierClient,
    SupprimerClient
};
