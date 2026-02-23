import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhotoCard } from "@/components/PhotoCard";
import { mockPhotos, mockStats } from "@/lib/mock-data";
import { Images, Users, Activity, HardDrive, Upload, Sparkles } from "lucide-react";

const stats = [
  { label: "Total Photos", value: mockStats.totalPhotos.toLocaleString(), icon: Images },
  { label: "People Detected", value: mockStats.peopleDetected.toString(), icon: Users },
  { label: "Recent Activity", value: mockStats.recentActivity.toString(), icon: Activity },
  { label: "Storage Used", value: mockStats.storageUsed, icon: HardDrive },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your photos.</p>
        </div>
        <Button className="gradient-primary text-primary-foreground rounded-full">
          <Upload className="h-4 w-4 mr-2" />
          Quick Upload
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            className="hover:shadow-md transition-shadow animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="gradient-primary rounded-xl p-2.5">
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Photos */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockPhotos.slice(0, 8).map((photo) => (
            <PhotoCard key={photo.id} url={photo.url} title={photo.title} isFavorite={photo.isFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
}
