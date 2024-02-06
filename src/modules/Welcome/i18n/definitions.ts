declare namespace App {
  export interface Locale {
    welcome: {
      pages: {
        presentation: {
          action: string;
        };
      };
      containers: {
        "first-step": {
          title: string;
          description: string;
        };
        "second-step": {
          intro: string[];
          training: {
            exampleConfig: {
              book: string;
              chapter: number;
              verseFrom: number;
              verseTo: number;
              language: string;
              version: string;
            };
            reading: { title: string; description: string };
            dictation: { title: string; description: string };
            "first-letter": { title: string; description: string };
            fragments: { title: string; description: string };
          };
        };
        "third-step": {
          description: string[];
        };
      };
    };
  }
}
