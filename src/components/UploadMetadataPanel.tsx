import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Tag, FolderOpen, Info, Plus, X, UserPlus, Save } from "lucide-react";

const CATEGORIES = [
  "People",
  "Nature",
  "Animals",
  "Objects",
  "Travel",
  "Food",
  "Documents",
  "Other",
];

interface DetectedFace {
  id: string;
  name: string;
}

interface UploadMetadataPanelProps {
  file: File;
  preview: string;
  onSave: () => void;
  onCancel: () => void;
}

export function UploadMetadataPanel({
  file,
  preview,
  onSave,
  onCancel,
}: UploadMetadataPanelProps) {
  const [faces, setFaces] = useState<DetectedFace[]>([
    { id: "f1", name: "" },
    { id: "f2", name: "" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [newPersonName, setNewPersonName] = useState("");
  const [showNewPerson, setShowNewPerson] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const updateFaceName = (id: string, name: string) => {
    setFaces((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  };

  const addNewPerson = () => {
    const trimmed = newPersonName.trim();
    if (trimmed) {
      setFaces((prev) => [
        ...prev,
        { id: `f-${Date.now()}`, name: trimmed },
      ]);
      setNewPersonName("");
      setShowNewPerson(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      {/* Left: Image Preview */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
          <img
            src={preview}
            alt={file.name}
            className="w-full h-auto max-h-[520px] object-contain bg-muted"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3 truncate max-w-full">
          {file.name}
        </p>
      </div>

      {/* Right: Metadata Panel */}
      <div className="space-y-5 overflow-y-auto max-h-[600px] pr-1">
        {/* Faces Section */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Detected Faces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faces.map((face) => (
              <div key={face.id} className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
                  {face.name ? face.name[0].toUpperCase() : "?"}
                </div>
                <Input
                  placeholder="Enter person name..."
                  value={face.name}
                  onChange={(e) => updateFaceName(face.id, e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
            ))}

            {showNewPerson ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="New person name..."
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNewPerson()}
                  className="h-9 text-sm"
                  autoFocus
                />
                <Button size="sm" onClick={addNewPerson} className="h-9 shrink-0">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowNewPerson(false)}
                  className="h-9 shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNewPerson(true)}
                className="w-full gap-1.5 text-muted-foreground"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Add New Person
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-primary" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const checked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className={`inline-flex items-center gap-1.5 cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      checked
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleCategory(cat)}
                      className="h-3.5 w-3.5 rounded-sm"
                    />
                    {cat}
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tags Section */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                className="h-9 text-sm"
              />
              <Button size="sm" onClick={addTag} className="h-9 shrink-0 gradient-primary text-primary-foreground">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* General Info */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              General Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-muted-foreground">File name</span>
              <span className="truncate font-medium">{file.name}</span>
              <span className="text-muted-foreground">Size</span>
              <span className="font-medium">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium">{file.type || "Unknown"}</span>
              <span className="text-muted-foreground">Upload date</span>
              <span className="font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button onClick={onSave} className="flex-1 gradient-primary text-primary-foreground gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
