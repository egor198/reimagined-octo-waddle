Telegram.WebApp.ready();

function initTelegramData() {
    const user = Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        const userId = user.id.toString(); // Преобразуем в строку
        const firstName = user.first_name || "Guest";
        const userData = JSON.stringify({ userId, firstName });
        
        if (typeof SendToUnity === 'function') {
            SendToUnity(userData);
        } else if (typeof unityInstance !== 'undefined') {
            unityInstance.SendMessage('TelegramManager', 'OnMessageReceived', userData);
        } else {
            console.error("Unity instance not ready");
        }
    }
}

// Вызываем после небольшой задержки, чтобы Unity точно был готов
setTimeout(initTelegramData, 500);
