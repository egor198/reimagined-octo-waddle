// Инициализация Telegram Web App
Telegram.WebApp.ready();

// Функция для отправки данных в Unity
function SendToUnity(data) {
    // Если Unity загружен, отправляем сообщение
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('TelegramManager', 'OnMessageReceived', data);
    }
}

// Функция для приёма данных из Unity
function ReceiveFromUnity(data) {
    // Отправляем данные в Telegram
    Telegram.WebApp.sendData(data);
}

// Закрыть Web App по команде из Unity
function CloseWebApp() {
    Telegram.WebApp.close();
}
