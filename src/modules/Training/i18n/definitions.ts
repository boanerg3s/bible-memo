declare namespace App {
  export interface Locale {
    training: {
      title: Record<App.Training, string>;
      description: Record<App.Training, string>;
      tip: Record<App.Training, string>;
      components: {
        "shuffle-button": {
          action: string;
        };
      };
    };
  }
}
