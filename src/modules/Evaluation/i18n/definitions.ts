declare namespace App {
  export interface Locale {
    evaluation: {
      containers: {
        "evaluation-capture": {
          title: string;
          description: string;
          "change-mode": string;
        };
        "evaluation-result": {
          "score-description": string;
          "new-score-description": string;
        };
      };
      components: {
        "evaluate-button": {
          init: string;
          stop: string;
          error: string;
          prepare: string;
          "try-again": string;
        };
        "write-box": {
          evaluate: string;
          "write-here": string;
        };
        "bad-score": {
          title: string;
          description: string;
        };
        "ok-score": {
          title: string;
          description: string;
        };
        "good-score": {
          title: string;
          description: string;
        };
        "very-good-score": {
          title: string;
          description: string;
        };
      };
    };
  }
}
