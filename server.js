const express = require("express")
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const db = require('./firebaseConfig')
const UsersDB = db.collection('users')

// Route endpoints
app.get('/', async (req, res) => {
    try {
        const response = await UsersDB.get()
        const responseArr = []

        response.forEach(doc => {
            responseArr.push(doc.data())
        });

        res.status(200).json(responseArr)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const response = await UsersDB.doc(req.params.id).get()
        res.status(200).json(response.data())
    } catch (err) {
        res.status(500).json(err)
    }
})

app.post('/create', async (req, res) => {
    try {
        // const docId = req.body.email
        const userJson = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        const response = await UsersDB.add(userJson)

        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const response = await UsersDB.doc(req.params.id).update(req.body)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const response = await UsersDB.doc(req.params.id).delete()
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)

    }
})


// Listen to server
app.listen(4000, () => console.log('Your Server is Running..!'))