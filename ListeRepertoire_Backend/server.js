import express from "express"


const app = express()
app.use(express.json())

//REST_API

app.listen(8000, () => console.log('Ecoute le port 8000'))

