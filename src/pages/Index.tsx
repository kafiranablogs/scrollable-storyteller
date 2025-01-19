import { useArticles } from "@/hooks/use-articles";
import { Article } from "@/components/Article";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { WordPressArticle } from "@/types/article";

const Index = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useArticles();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load articles
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {data?.pages.map((page) =>
        page.map((article: WordPressArticle) => (
          <Article key={article.id} article={article} />
        ))
      )}
      <div ref={ref} className="h-20 flex items-center justify-center">
        {hasNextPage && <Loader2 className="h-6 w-6 animate-spin" />}
      </div>
    </div>
  );
};

export default Index;