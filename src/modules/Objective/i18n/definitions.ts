declare namespace App {
  export interface Locale {
    objective: {
      pages: {
        "add-objective": {
          title: string;
          description: string;
          action: string;
        };
      };
      components: {
        "book-selector": {
          title: string;
          warning: string;
        };
        "chapter-selector": {
          title: string;
          warning: string;
        };
        "verse-from-selector": {
          title: string;
          warning: string;
        };
        "verse-to-selector": {
          title: string;
          warning: string;
        };
        "language-selector": {
          title: string;
          warning: string;
        };
        "version-selector": {
          title: string;
          warning: string;
        };
      };
      containers: {
        "objective-list": {
          progress: string;
          memorized: string;
          "last-seen": string;
        };
      };
    };
  }
}
