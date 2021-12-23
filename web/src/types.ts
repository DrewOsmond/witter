export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  picture?: string | null;
  witLikes: WitLike[];
  replyLikes: ReplyLike[];
}

export interface UserSession {
  user?: User | null;
  status: string | null;
  likes: Number[];
  replyLikes: Number[];
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

export interface Reply {
  content: String;
  id: Number;
  likes: [];
  user: User;
  image?: String;
  replies: Reply[];
}

export interface WitReply {
  content: String;
  id: Number;
  likes: [];
  user: User;
  image?: String;
  replies: Reply[];
}

export interface ReplyLike {
  userId: Number;
  replyId: Number;
}
