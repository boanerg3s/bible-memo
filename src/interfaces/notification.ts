declare namespace App {
  export type NotificationDayConfiguration =
    | "every_sunday"
    | "every_monday"
    | "every_tuesday"
    | "every_wednesday"
    | "every_thursday"
    | "every_friday"
    | "every_saturday";

  export interface Notification {
    at: string[];
    when: NotificationDayConfiguration[];
  }
}
