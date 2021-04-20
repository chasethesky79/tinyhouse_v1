import express from 'express';
import { listings } from './listings';
import bodyParser from 'body-parser';

const app = express();
const port = 9000;

app.listen(port);
app.use(bodyParser.json())

console.log(`[app]: http://localhost:${port}`);
app.get('/listings', (_req, res) => res.status(200).send(listings));
app.post('/delete-listing', (req, res) => {
    const id  = req.body.id as string;
    const indexToDelete = listings.findIndex(listing => listing.id === id);
    res.send(indexToDelete > -1 ? listings.splice(indexToDelete, 1) : 'Listing to delete not found');
})