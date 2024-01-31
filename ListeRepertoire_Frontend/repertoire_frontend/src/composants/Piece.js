import { useEffect, useState } from 'react'

const Piece = ({ id }) => {
    const [piece, setPiece] = useState()
    useEffect(() => {
        const obtiensPiece = async () => {
            try {
                //console.log("calling fetch");
                const reponse = await fetch(`/api/pieces/${id}`)
                const data = await reponse.json()
                //console.log(data);
                setPiece(data)
            }
            catch (erreur) {
                console.error(erreur)
            }
        }
        obtiensPiece()
    }, [id])
    return piece
}
export default Piece