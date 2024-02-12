import { ObjectId } from 'mongodb';
// import { UtiliserBD } from '../connexion.js';
import UtiliserBD from '../connexion.js';

async function AjouterUneCommande(requete, reponse) {
    const { nomClient, ListeDemande, etat, date, nomCommande } = requete.body;
    nomClient !== undefined && ListeDemande !== undefined && etat !== undefined && date !== undefined && nomCommande !== undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('commandes').insertOne({
                nomClient,
                ListeDemande,
                etat,
                date,
                nomCommande
            });
            reponse.status(200).send("Commande ajoutee");
        }, reponse).catch(() => reponse.status(500).send("Erreur : la Commande n'a pas ete ajoutee"))
        : reponse.status(400).send(`Certains parametres ne sont pas definis: - client: ${nomClient} - liste_commandes: ${ListeDemande} - etat: ${etat} - date : ${date} - nomCommande: ${nomCommande}`);
}

async function TrouverUneCommande(requete, reponse) {
    UtiliserBD(async (BD) => {
        const idListe = requete.params.id;
        const liste = await BD.collection('commandes').findOne({ _id: new ObjectId(idListe) });
        reponse.status(200).json(liste);
    }, reponse);
}

async function ModifierAjouterUnePieceDansCommande(requete, reponse) {
    const nomCommande = requete.params.nomCommande;
    const { titre, artiste, categorie } = requete.body;
    if (titre !== undefined || artiste !== undefined || categorie !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {};
            updateObject.titre = titre;
            updateObject.artiste = artiste;
            updateObject.categorie = categorie;
            const ele = await BD.collection('commandes').findOne({ nomCommande: nomCommande });
            const oldList = ele['ListeDemande'];
            oldList.push(updateObject);
            console.log(oldList);
            const result = await BD.collection('commandes').updateOne({ nomCommande: nomCommande }, { $set: { "ListeDemande": oldList } });
            if (result.modifiedCount > 0) {
                reponse.status(200).send("Liste modifiee avec succes");
            }
            else {
                reponse.status(404).send("Aucune liste trouvee avec l'ID fourni");
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur : la liste n'a pas ete modifiee"));
    }
    else {
        reponse.status(400).send("Aucun parametre de modification fourni");
    }
}

async function ModifierCommande(requete, reponse) {
    const idCommande = requete.params.id;
    const { nomClient, ListeDemande, etat, date } = requete.body;
    if (nomClient !== undefined && ListeDemande !== undefined && etat !== undefined && date !== undefined) {
        UtiliserBD(async (BD) => {
            const updateObject = {};
            updateObject.nomClient = nomClient;
            updateObject.ListeDemande = ListeDemande;
            updateObject.etat = etat;
            updateObject.date = date;
            const result = await BD.collection('commandes').updateOne({ _id: new ObjectId(idCommande) }, { $set: updateObject });
            if (result.modifiedCount > 0) {
                reponse.status(200).send("Commande modifiee avec succes");
            }
            else {
                reponse.status(404).send("Aucune Commande trouvee avec l'ID fourni");
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur : la Commande n'a pas ete modifiee"));
    } else {
        reponse.status(400).send("Aucun parametre de modification fourni");
    }
}

async function GererObtiensCommandes(req, rep) {
    UtiliserBD(async (db) => {
        const commandes = await db.collection('commandes').find().toArray();
        rep.status(200).json(commandes);
    }, rep);
}

async function ObtiensCommandesClient(requete, reponse) {
    UtiliserBD(async (BD) => {
        const nomClient = requete.params.nomClient;
        const liste = await BD.collection('commandes').find({ nomClient: nomClient }).toArray();
        reponse.status(200).json(liste);
    }, reponse);
}

async function GererObtiensCommandesActif(req, rep) {
    console.log('Inside GererObtiensCommandesActif route');
    UtiliserBD(async (db) => {
        const commandes = await db.collection('commandes').find({ 'etat': 0 }).toArray();
        rep.status(200).json(commandes);
    }, rep);
}

async function GererMetsCommandesInactif (req, rep) {
    const commandeId = req.params.id
    UtiliserBD(async (db) => {
        const result = await db.collection('commandes').updateOne(
            { "_id": new ObjectId(commandeId) },
            { $set: { "etat": '1' } }
        )

        if (result.modifiedCount === 1) {
            rep.status(200).json({ message: 'Mise à jour réussie' })
        }
        else {
            rep.status(404).json({ message: 'Aucune commande trouvée avec cet ID' })
        }
    }, rep)
}
async function DeleteUneCommande (requete, reponse) {
    const { id: commandeID } = requete.params
    if (commandeID !== undefined && commandeID !== "") {
        UtiliserBD(async (db) => {
            const resultat = await db.collection('commandes').deleteOne({ _id: new ObjectId(commandeID) })

            if (resultat.deletedCount === 1) {
                reponse.status(200).send(`${resultat.deletedCount} commande supprime`)
            }
            else {
                reponse.status(500).send("La commande n'a pas ete supprime")
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur: la commande n'a pas ete supprime"))
    }
    else {
        reponse.status(400).send("Paramètre 'id' manquant ou invalide")
    }
}

export {
    AjouterUneCommande,
    TrouverUneCommande,
    ModifierAjouterUnePieceDansCommande,
    ModifierCommande,
    GererObtiensCommandes,
    ObtiensCommandesClient,
    GererObtiensCommandesActif,
    GererMetsCommandesInactif,
    DeleteUneCommande
};