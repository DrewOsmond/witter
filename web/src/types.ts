export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  picture?: string | null;
  witLikes: Like[];
}

export interface UserSession {
  user?: User | null;
  status: string | null;
  likes: { witId: Number }[];
}

export type Like = {
  userId: Number;
  witId: Number;
};

export interface FollowerWits {
  wits: { content: string; image: string | null }[];
  status: string | null;
}

export interface Wit {
  content: string;
  image: string | null;
  id: number;
  user: User;
  replies: [];
}
