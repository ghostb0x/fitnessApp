import * as React from 'react';
import {parseJSON, differenceInSeconds} from 'date-fns';

function Timer({startTime}: {startTime: Date}) {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      const secondsElapsed = differenceInSeconds(new Date(), parseJSON(startTime))
      setTime(secondsElapsed);
    }, 1 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };

    // NOTE: Intentionally running effect only on component mount
    // which occurs every 1 second by design
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatAsTime (seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    let displayTime = hours.toString().padStart(2, '0') +  ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    return displayTime;
}

  return <p className="clock">{formatAsTime(time)}</p>;
}

export default Timer;
