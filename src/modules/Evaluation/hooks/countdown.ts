import React from "react";
type Process = { resolver: CallableFunction; time: number };
let COUNTDOWN_TIMEOUT: NodeJS.Timeout | undefined = undefined;

export const useCountdown = () => {
  const [count, setCount] = React.useState<number>(0);
  const [countdownProcess, setCountdownProcess] = React.useState<Process>();

  React.useEffect(() => {
    if (countdownProcess) {
      setCount(countdownProcess.time);
      return;
    }

    clearTimeout(COUNTDOWN_TIMEOUT);
    COUNTDOWN_TIMEOUT = setTimeout(() => setCount(0), 1000);
  }, [countdownProcess]);

  React.useEffect(() => {
    if (countdownProcess && count > 0) {
      const newValue = count - 1;
      clearTimeout(COUNTDOWN_TIMEOUT);

      if (newValue === 0) {
        COUNTDOWN_TIMEOUT = setTimeout(() => countdownProcess.resolver(), 1000);
      } else {
        COUNTDOWN_TIMEOUT = setTimeout(() => setCount(newValue), 1000);
      }
    }
  }, [count]);

  const runCountdown = (seconds: number): Promise<void> => {
    const resetterProxy = (callback: () => void) => {
      return () => {
        setCountdownProcess(undefined);
        callback();
      };
    };

    return new Promise((res, rej) => {
      setCountdownProcess({
        resolver: resetterProxy(res),
        time: seconds,
      });
    });
  };

  return {
    count,
    runCountdown,
  };
};
