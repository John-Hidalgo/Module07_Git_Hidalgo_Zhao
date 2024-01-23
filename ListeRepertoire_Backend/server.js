import express from "express"


const app = express()
app.use(express.json())

//REST_API
app.get('/api/hello', (requete, reponse) => { reponse.send("Hello World!") })


app.listen(8000, () => console.log('Ecoute le port 8000'))

