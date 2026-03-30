import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetPosts(
  page: number,
  pageSize: number,
  category: string | null,
  search: string | null,
  sortBy: string,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", page, pageSize, category, search, sortBy],
    queryFn: async () => {
      if (!actor) return { posts: [], total: BigInt(0) };
      return actor.getPosts(
        BigInt(page),
        BigInt(pageSize),
        category,
        search,
        sortBy,
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPost(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPost(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTags() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTags();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRecentPosts(limit: number) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["recentPosts", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentPosts(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchSuggestions(query: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["searchSuggestions", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchSuggestions(query);
    },
    enabled: !!actor && !isFetching && query.trim().length > 1,
  });
}
