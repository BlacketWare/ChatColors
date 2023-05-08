import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fetch from 'node-fetch';

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
    res.json(await (await fetch('https://blacket.org/worker/blooks')).json());
});

app.get('/proxyImage/:url', async (req, res) => {
    var data = fetch(decodeURIComponent(req.params.url), {
        method : 'GET',
        headers : {
            'Content-Type' : 'image/png',
            'Accept' : 'image/png'
        },
    }).then(x => x.buffer()).then(x => res.send(x));
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});