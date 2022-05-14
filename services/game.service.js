function toHome() {
    location.replace('/home');
}

function toPlay(gamemode) {
    localStorage.setItem('gamemode', gamemode);

    location.replace(`/play`);
}
