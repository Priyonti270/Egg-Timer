const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 375,
        height: 510,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(path.join(__dirname, 'startpage.html'));

    ipcMain.on('go-to-start-page', () => {
        win.loadFile(path.join(__dirname, 'startpage.html'));
    });

    ipcMain.on('go-to-menu-page', () => {
        win.loadFile(path.join(__dirname, 'menupage.html'));
    });
    
    ipcMain.on('go-to-timer-page', (event, durationInSeconds) => {
        win.loadFile(path.join(__dirname, 'timerpage.html')).then(() => {
            win.webContents.send('start-timer', durationInSeconds);
        });
    });

    ipcMain.on('go-to-ending-page', () => {
        win.loadFile(path.join(__dirname, 'endingpage.html'));
    });

    ipcMain.on('close-app', () => {
        app.quit();
    });

    ipcMain.on('minimise-window', () => {
        win.minimize();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});