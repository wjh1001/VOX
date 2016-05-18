const { BrowserWindow } = require('electron').remote;

export function showCurrentTrack(currentTrack) {
    if (!currentTrack) {
        return;
    }

    if (BrowserWindow.getFocusedWindow()) {
        return;
    }

    new Notification(currentTrack.title, {
        body: `${currentTrack.artist} — ${currentTrack.album}`
    });
}
