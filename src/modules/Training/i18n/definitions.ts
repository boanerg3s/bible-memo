declare namespace App {
  export interface Locale {
    training: {
      title: Record<App.Training, string>;
      description: Record<App.Training, string>;
      tip: Record<App.Training, string> & { more: string };
      components: {
        "dictation-card": {
          placeholder: string;
          play: string;
        };
        "shuffle-button": {
          action: string;
        };
        "training-content-prepend": {
          "your-score": string;
          action: string;
        };
      };
    };
  }
}
