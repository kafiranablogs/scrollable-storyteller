import { useQuery } from "@tanstack/react-query";
import { WordPressArticle } from "@/types/article";

const fetchArticles = async (): Promise<WordPressArticle[]> => {
  const response = await fetch(
    "https://kafirana.com/wp-json/wp/v2/posts?_embed"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
}