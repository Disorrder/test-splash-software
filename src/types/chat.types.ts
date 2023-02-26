export interface IChatMessage {
  type: "message";
  name: string;
  text: string;
}

export interface IChatNotification {
  type: "notification";
  notificationType: NotificationType;
  text: string;
}

export type IMessage = IChatMessage | IChatNotification;

export type NotificationType = "join" | "gameStart" | "gameOver";
