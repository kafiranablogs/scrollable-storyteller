import { WordPressArticle } from "@/types/article";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleProps {
  article: WordPressArticle;
}

export function Article({ article }: ArticleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = article._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // First try clipboard API as it's more widely supported
    try {
      await navigator.clipboard.writeText(article.link);
      toast({
        title: "Success",
        description: "Article link has been copied to clipboard",
        duration: 2000,
      });
      return;
    } catch (clipboardError) {
      console.error('Clipboard error:', clipboardError);
      
      // If clipboard fails, try Web Share API
      try {
        if (navigator.share) {
          await navigator.share({
            title: article.title.rendered,
            url: article.link
          });
        } else {
          throw new Error("Share API not supported");
        }
      } catch (shareError) {
        console.error('Share error:', shareError);
        toast({
          title: "Error",
          description: "Failed to share or copy link. Please try again.",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

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
          <div className="flex items-center justify-between mb-4">
            <h2 
              className="text-2xl md:text-3xl font-serif"
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="bg-white text-black hover:bg-white/90"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <div 
            className="text-sm md:text-base text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
          />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <iframe
            src={article.link}
            className="w-full h-full border-none"
            title={article.title.rendered}
          />
          <div className="absolute right-4 top-4">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="gap-2 bg-[#1A1F2C] text-white hover:bg-[#2A2F3C] border-none"
            >
              <X className="h-4 w-4" />
              Close Article
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}