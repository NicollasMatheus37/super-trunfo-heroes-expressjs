const gamemode = localStorage.getItem('gamemode');

let cards = [];
let p1Infos = {
    currentCard: [],
    cards: [],
    score: 0
};

let p2Infos = {
    currentCard: [],
    cards: [],
    score: 0
};

window.onload = () => {
    updateScoreboard();

    toggleHideableClasses([
        'hideable-attributes',
        'hideable-attributes-p1',
        'hideable-p1-winner',
        'hideable-p2-winner',
        'hideable-next',
        'hideable-select',
        'hideable-compare',
        'hideable-draw',
        'hideable-endgame'
    ]);
}

loadCards();

function toHome() {
    location.replace('/home');
}

function loadCards() {
    fetch('cards.json')
        .then(response => response.json())
        .then(jsondata => {
            cards = jsondata;
            p1Infos.cards = jsondata.filter((card, index) => index < 5);
            p2Infos.cards = jsondata.filter((card, index) => index >= 5);
        });
}

function initGame() {
    playNewCards();
    toggleHideableClasses(['init', 'hideable-select', 'hideable-attributes-p1', 'hideable-compare']);
}

function compareCards() {
    const selectedAttribute = document.getElementById('heroAttributesSelect').value;

    toggleHideableClasses(['hideable-attributes', 'hideable-compare', 'hideable-next']);

    if (p1Infos.currentCard[selectedAttribute] == p2Infos.currentCard[selectedAttribute]) {
        document.getElementById(`p1Hero-${selectedAttribute}`).classList.add('text-green-500');
        document.getElementById(`p2Hero-${selectedAttribute}`).classList.add('text-green-500');

        toggleHideableClasses(['hideable-draw']);
        return draw();
    }

    if (p1Infos.currentCard[selectedAttribute] > p2Infos.currentCard[selectedAttribute]) {
        document.getElementById(`p1Hero-${selectedAttribute}`).classList.add('text-green-500');
        document.getElementById(`p2Hero-${selectedAttribute}`).classList.add('text-red-500');

        toggleHideableClasses(['hideable-p1-winner']);
        return p1Winner();
    }

    if (p2Infos.currentCard[selectedAttribute] > p1Infos.currentCard[selectedAttribute]) {
        document.getElementById(`p1Hero-${selectedAttribute}`).classList.add('text-red-500');
        document.getElementById(`p2Hero-${selectedAttribute}`).classList.add('text-green-500');

        toggleHideableClasses(['hideable-p2-winner']);
        return p2Winner();
    }


    p1Infos.cards = [...p1Infos.cards, ...[p1Infos.currentCard, p2Infos.currentCard]];
    p1Infos.cards = [...p1Infos.cards, ...[p1Infos.currentCard, p2Infos.currentCard]];
}

function nextRound() {
    playNewCards();
    resetAttributes();
    toggleHideableClasses(['hideable-next', 'hideable-compare', 'hideable-attributes']);
    hideClasses(['hideable-draw', 'hideable-p1-winner', 'hideable-p2-winner']);
}

function resetAttributes() {
    document.getElementById('p1Hero-intelligence').classList.remove('text-green-500');
    document.getElementById('p1Hero-strength').classList.remove('text-green-500');
    document.getElementById('p1Hero-speed').classList.remove('text-green-500');
    document.getElementById('p1Hero-durability').classList.remove('text-green-500');
    document.getElementById('p1Hero-power').classList.remove('text-green-500');
    document.getElementById('p1Hero-combat').classList.remove('text-green-500');

    document.getElementById('p2Hero-intelligence').classList.remove('text-green-500');
    document.getElementById('p2Hero-strength').classList.remove('text-green-500');
    document.getElementById('p2Hero-speed').classList.remove('text-green-500');
    document.getElementById('p2Hero-durability').classList.remove('text-green-500');
    document.getElementById('p2Hero-power').classList.remove('text-green-500');
    document.getElementById('p2Hero-combat').classList.remove('text-green-500');

    document.getElementById('p1Hero-intelligence').classList.remove('text-red-500');
    document.getElementById('p1Hero-strength').classList.remove('text-red-500');
    document.getElementById('p1Hero-speed').classList.remove('text-red-500');
    document.getElementById('p1Hero-durability').classList.remove('text-red-500');
    document.getElementById('p1Hero-power').classList.remove('text-red-500');
    document.getElementById('p1Hero-combat').classList.remove('text-red-500');

    document.getElementById('p2Hero-intelligence').classList.remove('text-red-500');
    document.getElementById('p2Hero-strength').classList.remove('text-red-500');
    document.getElementById('p2Hero-speed').classList.remove('text-red-500');
    document.getElementById('p2Hero-durability').classList.remove('text-red-500');
    document.getElementById('p2Hero-power').classList.remove('text-red-500');
    document.getElementById('p2Hero-combat').classList.remove('text-red-500');
}

function playNewCards() {
    p1Infos.currentCard = p1Infos.cards.shift();
    p2Infos.currentCard = p2Infos.cards.shift();

    setJ1Hero();
    setJ2Hero();
}

function setJ1Hero() {
    document.getElementById('p1HeroName').innerHTML = p1Infos.currentCard.name;
    document.getElementById('p1HeroImg').src = p1Infos.currentCard.image_url;
    document.getElementById('p1Hero-intelligence').innerHTML = p1Infos.currentCard.intelligence;
    document.getElementById('p1Hero-strength').innerHTML = p1Infos.currentCard.strength;
    document.getElementById('p1Hero-speed').innerHTML = p1Infos.currentCard.speed;
    document.getElementById('p1Hero-durability').innerHTML = p1Infos.currentCard.durability;
    document.getElementById('p1Hero-power').innerHTML = p1Infos.currentCard.power;
    document.getElementById('p1Hero-combat').innerHTML = p1Infos.currentCard.combat;
}

function setJ2Hero() {
    document.getElementById('p2HeroName').innerHTML = p2Infos.currentCard.name;
    document.getElementById('p2HeroImg').src = p2Infos.currentCard.image_url;
    document.getElementById('p2Hero-intelligence').innerHTML = p2Infos.currentCard.intelligence;
    document.getElementById('p2Hero-strength').innerHTML = p2Infos.currentCard.strength;
    document.getElementById('p2Hero-speed').innerHTML = p2Infos.currentCard.speed;
    document.getElementById('p2Hero-durability').innerHTML = p2Infos.currentCard.durability;
    document.getElementById('p2Hero-power').innerHTML = p2Infos.currentCard.power;
    document.getElementById('p2Hero-combat').innerHTML = p2Infos.currentCard.combat;
}

function draw() {
    p1Infos.cards = [...p1Infos.cards, ...[p1Infos.currentCard]];
    p2Infos.cards = [...p2Infos.cards, ...[p2Infos.currentCard]];
    p1Infos.currentCard = null;
    p2Infos.currentCard = null;
}

function p1Winner() {
    p1Infos.cards = [...p1Infos.cards, ...[p1Infos.currentCard, p2Infos.currentCard]];
    p1Infos.currentCard = null;
    p2Infos.currentCard = null;
    p1Infos.score++;

    updateScoreboard();
}

function p2Winner() {
    p2Infos.cards = [...p2Infos.cards, ...[p1Infos.currentCard, p2Infos.currentCard]];
    p1Infos.currentCard = null;
    p2Infos.currentCard = null;
    p2Infos.score++;

    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById('p1Score').innerHTML = p1Infos.score;
    document.getElementById('p2Score').innerHTML = p2Infos.score;

    console.log(p1Infos.cards.length, p2Infos.cards.length);

    if (!p1Infos.cards.length || !p2Infos.cards.length) {
        toggleHideableClasses(['hideable-next', 'hideable-endgame']);
    }
}

function toggleHideableClasses(classes) {
    classes.forEach(cl => {
        Array.from(document.getElementsByClassName(cl))
            .forEach(element => {
                element.classList.toggle('hidden');
            });
    });
}

function hideClasses(classes) {
    classes.forEach(cl => {
        Array.from(document.getElementsByClassName(cl))
            .forEach(element => {
                element.classList.add('hidden');
            });
    });
}