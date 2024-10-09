import connectToMongo from './database/db.js';
import express from 'express';
    
connectToMongo();
const app = express()
const port = 4000
    
app.get('/', (req, res) => {
    res.send('Biomate')
})
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})