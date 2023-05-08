import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fetch from 'node-fetch';
import fs from 'fs';

await fetch('https://blacket.org/worker/verify', {
    method : 'GET'
})

const app = express();
app.use(express.static('static'));
app.use(cors({
    origin: 'blacket.org, bcc.villainsrule.xyz',
    optionsSuccessStatus: 200
}));
app.use(compression({
    level: 9
}));

app.get('/worker/blooks', async (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./blooks.json', 'utf8')))
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});