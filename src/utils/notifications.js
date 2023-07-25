const requestNotificationPermission = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
  } else if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted' || permission === 'default') {
        console.log('Notification permission granted.');
      }
    });
  }
};

// Функция для создания уведомления
const createNotification = (reminderText) => {
  new Notification('Напоминание', {
    body: reminderText,
  });
};

// Функция для планирования показа уведомления через определенное время
const scheduleNotification = (reminderText, reminderTime) => {
  requestNotificationPermission();
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
    return;
  }
  if (
    Notification.permission === 'granted' ||
    Notification.permission === 'default'
  ) {
    requestNotificationPermission();
    const reminderTimeMilliseconds = parseInt(reminderTime); // Переводим время в миллисекунды (1 час = 3600000 миллисекунд / минутка 60000 мс)
    alert('Уведомление успешно создано ');
    setTimeout(() => {
      createNotification(reminderText);
    }, reminderTimeMilliseconds);
  }
};

// * Итоговая функция
export const makeNotification = (reminderText, reminderTime) => {
  scheduleNotification(reminderText, reminderTime);
};
