export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  picture?: string | null;
  witLikes: WitLike[];
}

export interface UserSession {
  user?: User | null;
  status: string | null;
  likes: Number[];
}

export type WitLike = {
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
  likes: WitLike[];
}

export interface WitReply {
  id: Number;
  content: String;
  user: User;
  createdAt: String;
  likes: ReplyLike[];
}

export interface ReplyLike {
  userId: Number;
  replyId: Number;
}
