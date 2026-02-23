import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalViewerProps {
  images: { url: string; title: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ModalViewer({ images, currentIndex, onClose, onNavigate }: ModalViewerProps) {
  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-primary-foreground hover:bg-primary-foreground/20 rounded-full z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
          onClick={() => onNavigate(currentIndex - 1)}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {currentIndex < images.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
          onClick={() => onNavigate(currentIndex + 1)}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      <img
        src={current.url}
        alt={current.title}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
      />

      <div className="absolute bottom-6 text-primary-foreground text-sm font-medium">
        {current.title} — {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
