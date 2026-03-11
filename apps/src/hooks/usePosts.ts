import { useQuery } from "@tanstack/react-query";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
  date: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export function useGetPosts({ limit, skip }: { limit: number; skip: number }) {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: async () => {
      const url = new URL("https://mockly.me/posts");
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("skip", String(skip));

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load posts: ${response.status}`);
      }

      return response.json() as Promise<PostsResponse>;
    },
  });
}
