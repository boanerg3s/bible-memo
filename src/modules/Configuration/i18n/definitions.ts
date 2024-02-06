declare namespace App {
  export interface Locale {
    configuration: {
      pages: {
        configuration: {
          title: string;
          description: string;
        };
      };
      containers: {
        "language-selection": {
          description: string;
          "picker-placeholder": string;
          "save-preference": string;
          "picker-language-label": Record<keyof Bible.VersionList, string>;
        };
        "notification-selection": {
          description: string;
        };
        "dark-mode-selection": {
          description: string;
          hint: string;
        };
        "reset-app": {
          description: string;
          hint: string;
          action: {
            label: string;
            title: string;
            description: string;
            cancel: string;
            confirm: string;
          };
        };
      };
    };
  }
}
