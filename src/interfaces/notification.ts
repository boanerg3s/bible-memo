declare namespace App {
  export type NotificationDayConfiguration =
    | "every_sunday"
    | "every_monday"
    | "every_tuesday"
    | "every_wednesday"
    | "every_thursday"
    | "every_friday"
    | "every_saturday"
    | "every_weekday"
    | "every_day";

  export interface Notification {
    enabled: boolean;
    when?: NotificationDayConfiguration;
    interval?: number;
    blockedListInterval?: { start: number; end: number };
  }
}
