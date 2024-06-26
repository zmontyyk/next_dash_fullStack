// Define the type for a single comment
export type Comment = {
  userId: string;
  text: string;
  timestamp: string;
};

// Define the type for a single like
export type Like = {
  userId: string;
  timestamp: string;
};

// Define the type for a single post
export type Post = {
  _id: string;
  image: string;
  content: string;
  timestamp: string;
  comments: Comment[];
  likes: Like[];
};

// Define the type for the response object
export type postsResponse = {
  posts: Post[];
  totalPosts: number;
};


export interface User {
  map(arg0: () => void): import("react").ReactNode;
  _id: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  status: string | null;
  updatedAt: number;
  avatar: string;
  bio: string | null;
  followers: string[];
  following: string[];
  createdAt: string;
  __v: number;
}
