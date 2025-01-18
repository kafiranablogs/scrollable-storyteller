import { useArticles } from "@/hooks/use-articles";
import { Article } from "@/components/Article";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: articles, isLoading, error } = useArticles();

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
      {articles?.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Index;