function initTelegramWebApp() {
    if (typeof Telegram === 'undefined' || !Telegram.WebApp) {
        console.warn("Telegram WebApp not detected");
        sendTestData();
        return;
    }

    Telegram.WebApp.ready();
    Telegram.WebApp.expand();

    const user = Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        const userData = {
            userId: user.id.toString(),
            firstName: user.first_name || "Anonymous"
        };
        sendToUnity(userData);
    } else {
        sendTestData();
    }
}

function sendToUnity(data) {
    if (!window.unityInstance) {
        console.warn("Unity instance not ready, retrying...");
        setTimeout(() => sendToUnity(data), 500);
        return;
    }

    try {
        const json = JSON.stringify(data);
        console.log("Sending to Unity:", json);
        unityInstance.SendMessage('TelegramManager', 'OnUserDataReceived', json);
    } catch (e) {
        console.error("Failed to send data to Unity:", e);
    }
}

function sendTestData() {
    sendToUnity({
        userId: "test_" + Math.floor(Math.random() * 1000),
        firstName: "Test User"
    });
}

function CloseWebApp() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.close();
    }
}

function onUnityReady() {
    setTimeout(initTelegramWebApp, 500);
}
