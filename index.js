require('dotenv').config({ path:  '.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port
const apiRoute = require('./router/index')
const db = require('./models/index')
app.use(bodyParser.json({ limit: '1MB' }))
app.use(cors())
db.sync()

app.get('/ping', (req, res) => {
    res.send('pong')
})
app.use('/api/v1', apiRoute)

app.use((req, res) => {
    return res.status(404).json({ error: 'Invalid route' });
});
app.listen(port, () => {
    console.log('Server running on port', port)
})