import { useState } from "react";
import { UploadDropzone } from "@/components/UploadDropzone";
import { UploadMetadataPanel } from "@/components/UploadMetadataPanel";
import { toast } from "sonner";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const handleFileSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setSelectedPreview(preview);
  };

  const handleSave = () => {
    toast.success("Photo metadata saved successfully!");
    setSelectedFile(null);
    setSelectedPreview(null);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setSelectedPreview(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Upload Photos</h1>
        <p className="text-muted-foreground mt-1">
          {selectedFile
            ? "Review and add metadata to your photo."
            : "Add new photos to your library."}
        </p>
      </div>

      {selectedFile && selectedPreview ? (
        <UploadMetadataPanel
          file={selectedFile}
          preview={selectedPreview}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <UploadDropzone onFileSelected={handleFileSelected} />
      )}
    </div>
  );
}
