//Api Request pour la collection Pieces
async function getAllPieces () {
    try {
        const response = await fetch(`/api/pieces`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function getThePiecet (id) {
    try {
        const response = await fetch(`/api/pieces/${id}`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function addThePiece (titre, artiste, categorie) {
    try {
        const resultat = await fetch(`/api/pieces/ajouter`, {
            method: "POST",
            body: JSON.stringify({
                titre: titre,
                artiste: artiste,
                categorie: categorie
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        return console.log(resultat.json())
    } catch (message_1) {
        return console.error(message_1)
    }
}

async function updatePiece (_id, titre, artiste, categorie) {
    try {
        const raw = await fetch(`/api/pieces/${_id}/modifier`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titre: titre,
                artiste: artiste,
                categorie: categorie
            }),
        })
        console.log(raw.json())
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteThePiece (_id) {
    try {
        return await fetch(`/api/pieces/${_id}/supprimer`, {
            method: "DELETE"
        })
    } catch (err) {
        console.log(err.message)
    }
}
export { getAllPieces, getThePiecet, addThePiece, updatePiece, deleteThePiece }



