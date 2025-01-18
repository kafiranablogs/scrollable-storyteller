import { WordPressArticle } from "@/types/article";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

interface ArticleProps {
  article: WordPressArticle;
}

export function Article({ article }: ArticleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      <div 
        className="full-screen-article relative cursor-pointer" 
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={article.title.rendered}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end p-8 text-white">
          <h2 
            className="text-4xl font-serif mb-4"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
          <div 
            className="text-lg text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={article.title.rendered}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          )}
          <h1 
            className="text-3xl font-serif mt-6 mb-4"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content.rendered }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}