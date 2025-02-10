export interface Profile {
  id: string;
  display_name: string;
  avatar_path: string;
  status: string;
  total_follower: number;
  user_id: string;
}

// Follow represents the Follows collection
export type Follow = {
  id: string;
  followersOf: string;
  followers: string[];
};

export enum shareType {
  PUBLIC = "public",
  FRIEND = "friend",
  PRIVATE = "private",
}

// Post represents the Posts collection
export type Post = {
  id: string;
  created_by: string;
  content: string;
  share_type: shareType;
  created_at: Date;
  total_like: number;
  total_comments: number;
  total_shares: number;
  videos: MediaResource[];
  images: MediaResource[];
  author: {
    display_name: string;
    avatar_path: string;
  };
};

export type Feed = {
  id: string;
  userId: string;
  posts: Post[];
};

export type Comment = {
  id: string;
  created_by: string;
  content: string;
  parent_id: string;
  created_at: Date;
  total_like: number;
  total_comments: number;
  videos: MediaResource;
  images: MediaResource;
  author: {
    display_name: string;
    avatar_path: string;
  };
};

// Like represents the Likes collection
export type Like = {
  id: string;
  type: string;
  created_by: string;
  parent_id: string;
};

// Interaction represents the Interactions collection
export type Interaction = {
  id: string;
  type: string;
  created_by: string;
  parent_id: string;
  created_at: Date;
  updated_at: Date;
  content: string;
  total_like: number;
  total_comments: number;
};

// CommentPost represents the Comments : Posts collection
export type CommentPost = {
  id: string;
  parentId: string;
  info: Post;
  status?: string; // status of the comment
};

// NewsFeed represents the NewsFeeds collection
export type NewsFeed = {
  id: string;
  userId: string;
  posts: string[];
};

// Resource represents a resource (video or image)
export type MediaResource = {
  id: string;
  path: string;
};
