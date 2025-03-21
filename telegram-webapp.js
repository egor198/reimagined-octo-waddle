Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe.user;
if (user) {
    const userId = user.id;
    const firstName = user.first_name || "Guest";
    SendToUnity(JSON.stringify({ userId, firstName }));
}

function SendToUnity(data) {
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('TelegramManager', 'OnMessageReceived', data);
    }
}
