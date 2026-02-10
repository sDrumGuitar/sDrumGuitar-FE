export interface Message {
  id?: number;
  type: string;
  send_at: string;
  status: string;
  receiver: string;
  content: string;
  created_at?: string;
}
