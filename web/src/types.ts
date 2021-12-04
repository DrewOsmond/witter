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

export interface FollowerWits {
  wits: { content: string; image: string | null }[];
  status: string | null;
}

export interface Wits {
  content: string;
  image: string | null;
  id: number;
  user: User;
  replies: [];
}
