import React from "react"
import Piece from './Piece.js'

const ModifierPiece = (id, titre, artiste, categorie) => {
    const [pieces, setPieces] = useState([]) //initialiser avec [] vide
    useEffect(() => {
        const obtiensPieces = async () => {
            try {
                const villiePiece = Piece(id) // a faire
                villiePiece.titre = titre
                villiePiece.artiste = artiste
                villiePiece.categorie = categorie
                // appel PUT
                const reponse = await fetch(`/api/pieces/${id}/modifier`,
                    {
                        method: "PUT",
                        body: villiePiece
                    }
                )
                const result = await reponse.json()
                console.log("Success:", result)
                return true
            }
            catch (erreur) {
                console.error(erreur)
                return false
            }
        }
        obtiensPieces()
    }, [])
    return pieces
}
export default ModifierPiece
