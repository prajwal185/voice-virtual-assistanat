
export enum Role {
  USER,
  ASSISTANT,
}

export interface ChatMessage {
  role: Role;
  text: string;
}

export enum AppStatus {
  IDLE = "idle",
  LISTENING = "listening",
  PROCESSING = "processing",
  SPEAKING = "speaking",
}
