import React from "react";
import { LogBox } from "react-native";
import { getLanguagePreference } from "@/helpers/language";

import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechResultsEvent,
  SpeechVolumeChangeEvent,
} from "@react-native-voice/voice";

LogBox.ignoreLogs(["new NativeEventEmitter"]);

const VOICE_LOCALES: Record<App.Language, string> = {
  en: "en-US",
  ptbr: "pt-BR",
};

export const useRecognization = () => {
  const [results, setResults] = React.useState<string>();
  const [speechLevel, setSpeechLevel] = React.useState<number>(0);
  const [hasErrors, setHasErrors] = React.useState<boolean>(false);
  const [isListening, setIsListening] = React.useState<boolean>(false);

  React.useEffect(() => {
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: SpeechResultsEvent) => {
    const value = e.value?.[0];
    setResults(value);
    console.log("[voice]: got results", value);
  };

  const onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
    const value = !e.value || e.value < 0 ? 0 : e.value;
    setSpeechLevel(value);
  };

  const onSpeechError = (e: SpeechEndEvent | SpeechErrorEvent) => {
    if (e.error) {
      setHasErrors(true);
      setIsListening(false);
      console.log("[voice]: an error happened while trying to recognize voice", e);
    }
  };

  const onSpeechEnd = (e: SpeechEndEvent) => {
    setIsListening(false);
    if (e.error) setHasErrors(true);
    console.log("[voice]: recognization finished");
  };

  const listen = async () => {
    const preferedLanguage = await getLanguagePreference();
    const locale = VOICE_LOCALES[preferedLanguage];
    await Voice.start(locale);
    setIsListening(true);
    console.log("[voice]: start listening");
  };

  const stopRecognization = async () => {
    if (isListening) {
      await Voice.stop();
      setIsListening(false);
      console.log("[voice]: stop listening");
    }
  };

  const clean = async () => {
    setSpeechLevel(0);
    setHasErrors(false);
    setIsListening(false);
    setResults(undefined);
    console.log("[voice]: cleaning state");
  };

  return {
    clean,
    results,
    hasErrors,
    speechLevel,
    isListening,
    stopRecognization,
    listenVoice: listen,
  };
};
