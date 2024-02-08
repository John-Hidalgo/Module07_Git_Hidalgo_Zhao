//Api Request pour la collection Client

async function getAllCommandes () {
    try {
        const response = await fetch(`/api/commandes`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function getTheCommande (id) {
    try {
        const response = await fetch(`/api/commandes/${id}`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function getCommandeActif () {
    try {
        const response = await fetch(`/api/commandes/actif`)
        return await response.json()
    } catch (message) {
        return console.error(message)
    }
}

async function addTheCommande (nomClient, ListeDemande) {
    try {
        const resultat = await fetch(`/api/commandes/ajouter`, {
            method: "POST",
            body: JSON.stringify({
                nomClient: nomClient,
                ListeDemande: ListeDemande,
                etat: "1",
                date: formatDate()
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

async function updateTheCommande (_id, nomClient, ListeDemande, etat, date) {
    try {
        const raw = await fetch(`/api/commandes/${_id}/modifier`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomClient: nomClient,
                etat: etat,
                date: date,
                ListeDemande: ListeDemande
            }),
        })
        console.log(raw.json())
    } catch (err) {
        console.log(err.message)
    }
}

async function updateCommandeRajouter (_id, titre, artiste, categorie) {
    try {
        const raw = await fetch(`/api/commandes/${_id}/ajouter`, {
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

async function mettreCommandeInactif (_id) {
    try {
        const raw = await fetch(`/api/commandes/${_id}/inactif`, { method: "PUT" })
        console.log(raw.json())
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteTheCommande (_id) {
    try {
        return await fetch(`/api/commandes/${_id}/supprimer`, {
            method: "DELETE"
        })
    } catch (err) {
        console.log(err.message)
    }
}
export { getAllCommandes, getCommandeActif, getTheCommande, addTheCommande, updateTheCommande, updateCommandeRajouter, mettreCommandeInactif, deleteTheCommande }

function formatDate () {
    const date = new Date(Date.now())

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
}

