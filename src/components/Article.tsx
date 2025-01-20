import { WordPressArticle } from "@/types/article";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ArticleProps {
  article: WordPressArticle;
}

export function Article({ article }: ArticleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Remove figure tags from content
  const cleanContent = article.content.rendered.replace(/<figure[^>]*>.*?<\/figure>/g, '');

  return (
    <>
      <div 
        className="full-screen-article relative cursor-pointer" 
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0">
          {imageUrl && (
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt={article.title.rendered}
                className="w-full h-full object-cover md:object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end p-4 md:p-8 text-white">
          <h2 
            className="text-2xl md:text-3xl font-serif mb-4"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
          <div 
            className="text-sm md:text-base text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <h1 
              className="text-3xl font-serif mb-6"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            <div className="relative w-full aspect-video mb-6">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={article.title.rendered}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
            <div className="mt-8 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Close Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}