import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PersonCard } from "@/components/PersonCard";
import { PhotoCard } from "@/components/PhotoCard";
import { mockPeople, mockPhotos } from "@/lib/mock-data";
import { Search, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function People() {
  const [search, setSearch] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const filtered = mockPeople.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedPerson) {
    const person = mockPeople.find((p) => p.id === selectedPerson)!;
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedPerson(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{person.name}'s Photos</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockPhotos.slice(0, person.photoCount > 12 ? 12 : person.photoCount).map((photo) => (
            <PhotoCard key={photo.id} url={photo.url} title={photo.title} isFavorite={photo.isFavorite} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">People</h1>
        <p className="text-muted-foreground mt-1">People detected in your photos.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search people..."
          className="pl-9 bg-muted/50 border-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              avatar={person.avatar}
              photoCount={person.photoCount}
              onClick={() => setSelectedPerson(person.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="gradient-primary rounded-full p-4 mb-4">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-lg">No people found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
