import { UploadDropzone } from "@/components/UploadDropzone";

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Upload Photos</h1>
        <p className="text-muted-foreground mt-1">Add new photos to your library.</p>
      </div>
      <UploadDropzone />
    </div>
  );
}
