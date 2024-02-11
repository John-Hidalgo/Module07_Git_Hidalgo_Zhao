import express from "express";
import
{
    ObtiensClients,
    ObtiensClient,
    ObtiensClientByNom,
    AjouterClient,
    ModifierClient,
    SupprimerClient
} from './bd/fonctionsClients.js';
import
{
    GererTousPieces,
    GererObtiensUnePiece,
    GererAjouterUnePiece,
    GererModifierUnePiece,
    GererSupprimerUnePiece
} from "./bd/fonctionsPieces.js";
import 
{
    AjouterUneCommande,
    TrouverUneCommande,
    ModifierAjouterUnePieceDansCommande,
    ModifierCommande,
    GererObtiensCommandes,
    ObtiensCommandesClient,
    GererObtiensCommandesActif,
    GererMetsCommandesInactif,
    DeleteUneCommande
} from './bd/fonctionsCommandes.js';

const app = express()
app.use(express.json())
//--------------------------------------------------------------------
app.get('/api/pieces', GererTousPieces)
app.get('/api/pieces/:id', GererObtiensUnePiece)
app.post('/api/pieces/ajouter', GererAjouterUnePiece)
app.put('/api/pieces/:id/modifier', GererModifierUnePiece)
app.delete('/api/pieces/:id/supprimer', GererSupprimerUnePiece)
//--------------------------------------------------------------------
app.get('/api/commandes', GererObtiensCommandes)
app.get('/api/commandes/:nomClient', ObtiensCommandesClient)
app.get('/api/commandesActives', GererObtiensCommandesActif)
app.get('/api/commandes/:id', TrouverUneCommande)
app.post('/api/commandes/ajouter', AjouterUneCommande)
app.put('/api/commandes/:id/inactif', GererMetsCommandesInactif)
app.put('/api/commandes/:nomCommande/ajouter', ModifierAjouterUnePieceDansCommande)
app.put('/api/commandes/:id/modifier', ModifierCommande)
app.delete('/api/commandes/:id/supprimer', DeleteUneCommande)
//--------------------------------------------------------------------
app.get('/api/clients', ObtiensClients)
app.get('/api/clients/:id', ObtiensClient)
app.post('/api/clients/ajouter', AjouterClient)
app.post('/api/login', ObtiensClientByNom)
app.put('/api/clients/:id/modifier', ModifierClient)
app.delete('/api/clients/:id/supprimer', SupprimerClient)

app.listen(8000, () => console.log('Ecoute le port 8000'))

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