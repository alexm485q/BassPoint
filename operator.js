function typeText(element, text, interval = 50, callback = null) {
    let index = 0;

    const typingInterval = setInterval(() => {
        if (index < text.length) {
            element.value += text[index]; // Добавляем символ
            index++;
            adjustHeight(); // Корректируем высоту текстового поля
        } else {
            clearInterval(typingInterval); // Останавливаем таймер
            if (callback) callback(); // Вызываем callback, если есть
        }
    }, interval);
}

setTimeout(() => {
    const helper = document.getElementById('helper');
    helper.style.display = 'block';
    helper.classList.add('fade-in');

    // Массив сообщений
    const messages = [
        "Какой ассортимент товаров вы можете предложить?",
        "Можете рассказать подробнее об условиях доставки?",
        "Есть ли у вас скидки на оптовые закупки?",
        "Какие гарантии предоставляете на продукцию?",
    ];

    // Функция для выбора случайного сообщения
    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Функция для ввода сообщения
    function inputMessage(message, delay, callback) {
        setTimeout(() => {
            const userInput = document.getElementById('user-input');
            typeText(userInput, message, 50, callback); // Используем typeText для плавного ввода
        }, delay);
    }

    // Ввод первого сообщения
    inputMessage(getRandomMessage(), 1000, () => {
        // Отправляем сообщение автоматически
        setTimeout(() => {
            document.getElementById('send-message').click();

            // Ввод второго сообщения после отправки первого
            inputMessage(getRandomMessage(), 1000, () => {
                setTimeout(() => {
                    document.getElementById('send-message').click();
                }, 500);
            });
        }, 500);
    });
}, 2000);


// Закрытие окна
document.getElementById('close-helper').addEventListener('click', () => {
    const helper = document.getElementById('helper');
    helper.style.display = 'none';
});

// Массив возможных ответов "Ольги"
const olgaResponses = [
    "Ольга: Спасибо за ваше сообщение! В скором времени вам ответит менеджер по продажам. Чем еще могу помочь?",
    "Ольга: Спасибо за ваш запрос! В скором времени вам ответит менеджер по продажам. Могу ли я чем-то еще помочь?",
    "Ольга: Спасибо! В скором времени вам ответит менеджер по продажам. Если есть дополнительные вопросы, не стесняйтесь обращаться!"
];

// Функция для рандомизации ответа "Ольги"
function getRandomOlgaResponse() {
    const randomIndex = Math.floor(Math.random() * olgaResponses.length);
    return olgaResponses[randomIndex];
}

// Обработка отправки сообщений
document.getElementById('send-message').addEventListener('click', () => {
    const userInput = document.getElementById('user-input');
    const helperMessage = document.getElementById('helper-message');
    
    if (userInput.value.trim() !== "") {
        // Отображаем сообщение пользователя
        helperMessage.innerHTML += `<div class="user-message">Вы: ${userInput.value}</div>`;
        
        // Очистка поля ввода
        userInput.value = "";
        
        // Автоответ от "Ольги" с рандомизацией
        setTimeout(() => {
            const olgaResponse = getRandomOlgaResponse(); // Получаем случайный ответ
            helperMessage.innerHTML += `<div class="olga-message">${olgaResponse}</div>`;
            helperMessage.scrollTop = helperMessage.scrollHeight; // Прокручиваем вниз
        }, 1000);
    }
});

