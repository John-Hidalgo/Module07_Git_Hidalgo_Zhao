import React from "react"
import { useEffect, useState } from 'react'

const GetPiece = (id) => {
    const [pieces, setPieces] = useState()
    useEffect(() => {
        const obtiensPieces = async () => {
            try {
                const reponse = await fetch(`/api/pieces/${id}`)
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
export default GetPiece