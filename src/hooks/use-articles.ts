import { useInfiniteQuery } from "@tanstack/react-query";
import { WordPressArticle } from "@/types/article";

const PER_PAGE = 5;

interface FetchArticlesParams {
  pageParam?: number;
}

const fetchArticles = async ({ pageParam = 1 }: FetchArticlesParams): Promise<WordPressArticle[]> => {
  const response = await fetch(
    `https://kafirana.com/wp-json/wp/v2/posts?_embed&per_page=${PER_PAGE}&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export function useArticles() {
  return useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}