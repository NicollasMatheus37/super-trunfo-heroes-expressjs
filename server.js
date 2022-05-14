import express from 'express';
import request from 'request';
import fs from 'fs';

const app = express();
const HTTP_PORT = 1000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('assets'));
app.use(express.static('services'));
app.use(express.static('components'));

routes();
initServer();
addStardardCards();

function routes() {
    app.use('/login', (req, res) => res.render('login'));
    app.use('/game', (req, res) => res.render('game'));
    app.use('/play', (req, res) => res.render('play'));
    app.use('/add-cards', (req, res) => res.render('add-cards'));
    app.use('/', (req, res) => res.render('home'));
}

function initServer() {
    app.listen(HTTP_PORT, () => {
        console.log(`Server running at http://localhost:${HTTP_PORT}/`);
    });
}

function addStardardCards() {
    let heroes = [];

    request('https://akabab.github.io/superhero-api/api/all.json', (err, response, body) => {
        body = JSON.parse(body);

        heroes = body.map((hero, index) => {
            if (index > 9) {
                return;
            }

            return {
                id: hero.id,
                name: hero.name,
                intelligence: hero.powerstats.intelligence,
                strength: hero.powerstats.strength,
                speed: hero.powerstats.speed,
                durability: hero.powerstats.durability,
                power: hero.powerstats.power,
                combat: hero.powerstats.combat,
                image_url: hero.images.md
            }
        }).filter(hero => hero);

        fs.unlink('./assets/cards.json', () => null);

        fs.writeFile(
            './assets/cards.json',
            JSON.stringify(heroes),
            { encoding: 'utf-8', flag: 'a' },
            (error) => error ? console.error(error) : null
        );
    });
}