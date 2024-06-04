import React, { useEffect, useState } from 'react';

interface AppProps {
  initialMinute?: number;
  initialSeconds?: number;
}

const CountDown: React.FC<AppProps> = ({ initialMinute = 10, initialSeconds = 0 }) => {
  const [time, setTime] = useState({ minutes: initialMinute, seconds: initialSeconds });

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime((prevTime) => {
        const { minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } 
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            return prevTime;
          } else {
            return { minutes: minutes - 1, seconds: 59 };
          }
        }

        return prevTime;
      });
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const { minutes, seconds } = time;

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
         Expires in:  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default CountDown;
