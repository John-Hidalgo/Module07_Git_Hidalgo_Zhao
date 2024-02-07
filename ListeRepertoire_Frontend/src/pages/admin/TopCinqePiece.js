import Repertoire from "../../composants/Repertoire.js";
import Commandes from "../../composants/Commandes.js";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const TopCinquePiece = () =>
{
    const repertoire = Repertoire();
    const commandes = Commandes().map(c => c.ListeDemande).flat();
    const titreCountMap = new Map();
    commandes.forEach((demande) => {
    const { titre } = demande;
    titreCountMap.set(titre, (titreCountMap.get(titre) || 0) + 1);
    });
    const sortedTitres = [...titreCountMap.entries()].sort((a, b) => b[1] - a[1]);
    const topCinque = repertoire.filter((item) => {
    const titre = item.titre;
    return sortedTitres.some(([sortedTitre]) => sortedTitre === titre);
    }).slice(0, 5);
    console.log(topCinque);
    return(
        <div>
            <ListGroup>
            {topCinque.map((demande, i) => (
                <ListGroupItem key={i}>
                    <strong>{demande.titre}</strong> par {demande.artiste} dans le genre {demande.categorie}
                </ListGroupItem>
            ))}
            </ListGroup>
        </div>
    );
} 

export default TopCinquePiece;