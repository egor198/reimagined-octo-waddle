// Инициализация Telegram WebApp
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

// Отправка данных в Unity
function sendToUnity(data) {
    if (!window.unityInstance) {
        console.error("Unity instance not ready");
        return;
    }

    try {
        const json = JSON.stringify(data);
        console.log("Sending to Unity:", json);
        
        // Два варианта вызова на выбор:
        if (unityInstance.SendMessage) {
            unityInstance.SendMessage('TelegramManager', 'OnMessageReceived', json);
        } else if (unityInstance.Module?.SendMessage) {
            unityInstance.Module.SendMessage('TelegramManager', 'OnMessageReceived', json);
        }
    } catch (e) {
        console.error("Failed to send data to Unity:", e);
    }
}

// Тестовые данные
function sendTestData() {
    sendToUnity({
        userId: "test_" + Math.floor(Math.random() * 1000),
        firstName: "Test User"
    });
}

// Функция для вызова из Unity
function CloseWebApp(unused) {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.close();
    }
}

// Инициализация после загрузки Unity
function onUnityReady() {
    setTimeout(initTelegramWebApp, 500);
}
