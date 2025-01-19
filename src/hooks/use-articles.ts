import { useInfiniteQuery } from "@tanstack/react-query";
import { WordPressArticle } from "@/types/article";

const PER_PAGE = 5;

async function fetchArticles({ pageParam }: { pageParam: number }) {
  const response = await fetch(
    `https://techcrunch.com/wp-json/wp/v2/posts?page=${pageParam}&per_page=${PER_PAGE}&_embed=true`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useArticles() {
  return useInfiniteQuery<WordPressArticle[]>({
    queryKey: ["articles"],
    queryFn: ({ pageParam }) => fetchArticles({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_, pages): number | undefined => {
      if (!pages) return undefined;
      return pages.length + 1;
    }
  });
}