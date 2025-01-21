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

// Post represents the Posts collection
export type Post = {
  id: string;
  createdBy: string;
  content: string;
  createdAt: Date;
  totalLike: number;
  totalComments: number;
  totalShare: number;
  videos: MediaResource[];
  images: MediaResource[];
  author: {
    display_name: string;
    avatar_path: string;
  };
};

// Like represents the Likes collection
export type Like = {
  id: string;
  type: string;
  createdBy: string;
  parentId: string;
};

// Interaction represents the Interactions collection
export type Interaction = {
  id: string;
  parentId: string;
  comments: number;
  likes: number;
  shares: number;
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
