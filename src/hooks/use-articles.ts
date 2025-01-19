import { useInfiniteQuery } from "@tanstack/react-query";
import { WordPressArticle } from "@/types/article";

const PER_PAGE = 5;

const fetchArticles = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://kafirana.com/wp-json/wp/v2/posts?_embed&per_page=${PER_PAGE}&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export function useArticles() {
  return useInfiniteQuery<WordPressArticle[]>({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 1 }) => fetchArticles({ pageParam }),
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageSize: PER_PAGE,
  });
}