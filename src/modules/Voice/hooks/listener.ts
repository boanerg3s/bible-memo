import React from "react";
import { useRecognization } from "@/modules/Voice/hooks/recognization";

interface StopProcess {
  resolve: (value: string) => void;
  reject: (value: any) => void;
}

export const useVoice = () => {
  const [stopProcess, setStopProcess] = React.useState<StopProcess>();
  const { listenVoice, stopRecognization, clean, hasErrors, isListening, results, speechLevel } = useRecognization();

  React.useEffect(() => {
    if (stopProcess) startRecognization();
  }, [stopProcess]);

  React.useEffect(() => {
    if (stopProcess) {
      if (hasErrors) stopProcess.reject({ error: true });
      if (!hasErrors && results) stopProcess.resolve(results);
    }
  }, [hasErrors, results]);

  const listen = async (): Promise<string> => {
    if (isListening) {
      throw Error("Voice recognization already started");
    }

    const resetterProxy = (callback: (value: string) => void) => {
      return (value: string) => {
        callback(value);
        setStopProcess(undefined);
        console.log("[voice]: finishing the process with result", value);
      };
    };

    return new Promise((res, rej) => {
      setStopProcess({
        resolve: resetterProxy(res),
        reject: resetterProxy(rej),
      });
    });
  };

  const startRecognization = async () => {
    try {
      await clean();
      await listenVoice();
    } catch (err) {
      console.log("[voice]: can't start listening mode", err);
    }
  };

  return {
    listen,
    hasErrors,
    speechLevel,
    isListening,
    stop: stopRecognization,
  };
};
