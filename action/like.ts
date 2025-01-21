export type ReactionType = "like" | "heart" | "haha" | "wow" | "sad" | "angry";

export async function postReaction({ post_id, type }: {
  post_id: string;
  type: ReactionType;
}) {
}
