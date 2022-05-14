let cards = [];

fetch('cards.json')
    .then(response => response.json())
    .then(jsondata => cards = jsondata);

function toHome() {
    location.replace('/home');
}

function addCard() {
    const cardIdInput = document.getElementById('cardIdInput');

    if (!cardIdInput.value || !parseFloat(cardIdInput.value)) {
        return alert('É necessário digitar um número para adicionar o herói.');
    }

    if (cards.find(card => card.id == cardIdInput.value)) {
        return alert('Esse herói já foi adicionado.');
    }

    alert('Herói adicionado com sucesso!');
}