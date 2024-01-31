import { useEffect, useState } from 'react'

const Repertoire = () => {
    const [piece, setPiece] = useState([]) //initialiser avec [] vide
    useEffect(() => {
        const obtiensPieces = async () => {
            try {
                const reponse = await fetch('/api/pieces')
                const data = await reponse.json()
                setPiece(data)
            }
            catch (erreur) {
                console.error(erreur)
            }
        }
        obtiensPieces()
    }, [])
    return piece
}
export default Repertoire