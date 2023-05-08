import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(express.static('static'));
app.use(cors({
    origin: 'bcc.villainsrule.xyz, blacketcolors.vercel.app',
    optionsSuccessStatus: 200
}));
app.use(compression({
    level: 9
}));

app.get('/', async (req, res) => res.send(path.join(__dirname + '/static/index.html')));
app.get('/worker/blooks', async (req, res) => res.json(require('./blooks.json')));

app.listen(8080, () => console.log('Listening on port 8080'));
