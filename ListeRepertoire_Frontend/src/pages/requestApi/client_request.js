//Api Request pour la collection Client
async function getAllClient () {
    try {
        const response = await fetch(`/api/clients`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function getTheClient (id) {
    try {
        const response = await fetch(`/api/clients/${id}`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function addTheClient (nom, abonnement, password) {
    try {
        const resultat = await fetch(`/api/clients/ajouter`, {
            method: "POST",
            body: JSON.stringify({
                nom: nom,
                abonnement: abonnement,
                password: password
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

async function updateClient (_id, nom, abonnement, password) {
    try {
        const raw = await fetch(`/api/clients/${_id}/modifier`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom: nom,
                abonnement: abonnement,
                password: password
            }),
        })
        console.log(raw.json())
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteTheClient (_id) {
    try {
        return await fetch(`/api/clients/${_id}/supprimer`, {
            method: "DELETE"
        })
    } catch (err) {
        console.log(err.message)
    }
}
export { getAllClient, getTheClient, addTheClient, updateClient, deleteTheClient }



