type ROLE = "teacher" | "ADMIN";

export interface IUser {
  PHONE_NUMBER: string;
  ROLE: ROLE;
  PASSWORD?: string;
  max_send: number;
  entire_send: number;
}
