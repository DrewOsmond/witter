export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  picture?: string | null;
}

export interface UserSession {
  user?: User | null;
  status: string | null;
}
