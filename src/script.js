const { ipcRenderer } = require('electron');

const clickSound = document.getElementById('click-sound');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

document.getElementById('close-icon').addEventListener('click', () => {
    playClickSound();
    ipcRenderer.send('close-app');
});

document.getElementById('minimise-icon').addEventListener('click', () => {
    playClickSound();
    ipcRenderer.send('minimise-window');
});

// Go to menu page
document.getElementById("start-button").addEventListener("click", () => {
    playClickSound();
    ipcRenderer.send("go-to-menu-page");
});
