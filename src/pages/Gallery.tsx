import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhotoCard } from "@/components/PhotoCard";
import { ModalViewer } from "@/components/ModalViewer";
import { mockPhotos } from "@/lib/mock-data";
import { Search, Users, Calendar, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
  { label: "People", icon: Users },
  { label: "Date", icon: Calendar },
  { label: "Favorites", icon: Heart },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = mockPhotos.filter((p) => {
    if (activeFilter === "Favorites" && !p.isFavorite) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground mt-1">Browse and manage your photos.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search photos..."
            className="pl-9 bg-muted/50 border-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f.label}
              variant={activeFilter === f.label ? "default" : "outline"}
              size="sm"
              className={cn("rounded-full", activeFilter === f.label && "gradient-primary text-primary-foreground")}
              onClick={() => setActiveFilter(activeFilter === f.label ? null : f.label)}
            >
              <f.icon className="h-4 w-4 mr-1.5" />
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              url={photo.url}
              title={photo.title}
              isFavorite={photo.isFavorite}
              onClick={() => setViewerIndex(i)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="gradient-primary rounded-full p-4 mb-4">
            <Search className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-lg">No photos found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Modal */}
      {viewerIndex !== null && (
        <ModalViewer
          images={filtered}
          currentIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onNavigate={setViewerIndex}
        />
      )}
    </div>
  );
}
