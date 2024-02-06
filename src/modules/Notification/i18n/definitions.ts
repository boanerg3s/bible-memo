declare namespace App {
  export interface Locale {
    notification: {
      pages: {
        notification: {
          title: string;
          description: string;
        };
      };
      containers: {
        "day-selection": {
          description: string;
          sunday: string;
          monday: string;
          tuesday: string;
          wednesday: string;
          thursday: string;
          friday: string;
          saturday: string;
        };
        "time-selection": {
          description: string;
          confirm: string;
          remove: {
            action: string;
            title: string;
            description: string;
            cancel: string;
            confirm: string;
          };
          add: string;
        };
      };
    };
  }
}
