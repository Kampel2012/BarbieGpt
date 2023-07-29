import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Обновление состояния каждую секунду
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Очистка таймера при размонтировании компонента
    return () => clearInterval(timer);
  }, []);

  // Форматирование времени в формат 'чч:мм:сс'
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${String(
      minutes
    ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return <p>{seconds >= 1 ? formatTime(seconds) : 'Время истекло'}</p>;
};

CountdownTimer.propTypes = {
  initialSeconds: PropTypes.number,
};

export default CountdownTimer;
