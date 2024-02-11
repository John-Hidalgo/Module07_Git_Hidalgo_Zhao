import { MongoClient, ObjectId } from 'mongodb';
import UtiliserBD from '../connexion.js';

async function GererTousPieces(requete, reponse) {
    console.log("calling handler");
    UtiliserBD(async (BD) => {
        console.log("calling query on db");
        const pieces = await BD.collection('pieces').find().toArray();
        reponse.status(200).json(pieces);
    }, reponse);
}

async function GererObtiensUnePiece(req, rep) {
    UtiliserBD(async (BD) => {
        const idPiece = req.params.id;
        const infoPiece = await BD.collection('pieces').findOne({ _id: new ObjectId(idPiece) });
        rep.status(200).json(infoPiece);
    }, rep);
}

async function GererAjouterUnePiece(req, rep) {
    const { titre, artiste, categorie } = req.body;
    const url = getUrlRandom();
    titre !== undefined && artiste !== undefined && categorie !== undefined ?
        UtiliserBD(async (BD) => {
            await BD.collection('pieces').insertOne({
                titre,
                artiste,
                categorie,
                url
            });
            rep.status(200).send("Piece ajoutee");
        }, rep).catch(() => rep.status(500).send("Erreur : la piece n'a pas ete ajoutee"))
        : rep.status(400).send(`Certains parametres ne sont pas definis: - titre: ${titre} - artiste: ${artiste} - categorie: ${categorie}`);
}

async function GererModifierUnePiece(req, rep) {
    const idPiece = req.params.id;
    const { titre, artiste, categorie } = req.body;
    console.log(idPiece);
    if (ObjectId.isValid(idPiece) && (titre !== undefined || artiste !== undefined || categorie !== undefined)) {
        UtiliserBD(async (BD) => {
            const nouvelleObjet = {};
            if (titre !== undefined) nouvelleObjet.titre = titre;
            if (artiste !== undefined) nouvelleObjet.artiste = artiste;
            if (categorie !== undefined) nouvelleObjet.categorie = categorie;
            const result = await BD.collection('pieces').updateOne(
                { _id: new ObjectId(idPiece) },
                { $set: nouvelleObjet }
            );
            if (result.modifiedCount > 0) {
                rep.status(200).send("Pièce modifiée avec succès");
            } else {
                rep.status(404).send("Aucune pièce trouvée avec l'ID fourni");
            }
        }, rep).catch(() => rep.status(500).send("Erreur : la pièce n'a pas été modifiée"));
    } else {
        rep.status(400).send("Invalid ObjectId or no modification parameters provided");
    }
}

async function GererSupprimerUnePiece(requete, reponse) {
    const { id: pieceId } = requete.params;
    if (pieceId !== undefined && pieceId !== "") {
        UtiliserBD(async (db) => {
            const resultat = await db.collection('pieces').deleteOne({ _id: new ObjectId(pieceId) });

            if (resultat.deletedCount === 1) {
                reponse.status(200).send(`${resultat.deletedCount} piece supprime`);
            }
            else {
                reponse.status(500).send("La piece n'a pas ete supprime");
            }
        }, reponse).catch(() => reponse.status(500).send("Erreur: la piece n'a pas ete supprime"));
    }
    else {
        reponse.status(400).send("Paramètre 'id' manquant ou invalide");
    }
}

export {
    GererTousPieces,
    GererObtiensUnePiece,
    GererAjouterUnePiece,
    GererModifierUnePiece,
    GererSupprimerUnePiece
};
    
    const nomsDePhotos = [
    "batt1.jpeg",
    "Berlin_Love_Life.png",
    "fallingintoyou.jpg",
    "believe.jpg",
    "enr122.png",
    "onew.jpg",
    "believe.jpg",
    "colors.jpg",
    "others.jpg",
    "colors2.jpg",
    "nancy1.jpg",
    "fairuz3.jpg",
    "wala2.jpg",
    "femmes2.jpg",
    "france1.png",
    "Plusbleu.jpeg",
    "fairuz3.jpg"
]

function getUrlRandom () {
    return nomsDePhotos[getRandomNumber(0, nomsDePhotos.length - 1)]
}
function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
