import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';

const app = express();
app.use(express.static('static'));
app.use(cors({
    origin: 'bcc.villainsrule.xyz, blacketcolors.vercel.app',
    optionsSuccessStatus: 200
}));
app.use(compression({
    level: 9
}));

app.get('/', async (req, res) => res.send(fs.readFileSync('./static/index.html', 'utf8')));
app.get('/worker/blooks', async (req, res) => res.json(JSON.parse(fs.readFileSync('./blooks.json', 'utf8'))));

app.listen(8080, () => console.log('Listening on port 8080'));
