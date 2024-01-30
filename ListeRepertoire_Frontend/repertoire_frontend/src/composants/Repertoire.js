import { useEffect, useState } from 'react'

const Repertoire = () => {
    const { pieces, setPieces } = useState([])
    useEffect(() => {
        const obtiensPieces = async () => {
            try {
                const reponse = await fetch('/api/pieces')
                const data = await reponse.json()
                setPieces(data)
            }
            catch (erreur) {
                console.error(erreur)
            }
        }
        obtiensPieces()
    }, [])
    return pieces
}

export default Repertoire