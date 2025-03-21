// Инициализация Telegram Web App
Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user?.id || "неизвестен";
const firstName = user?.first_name || "гость";

// Отправка данных в Unity
if (typeof SendToUnity !== 'undefined') {
    SendToUnity(JSON.stringify({ 
        userId: userId, 
        firstName: firstName 
    }));
}

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
