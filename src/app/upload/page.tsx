import { AppHeader } from "@/components/AppHeader";
import { UploadBookClient } from "@/components/UploadBookClient";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const viewer = await getViewer();
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader active="library" initial={viewer.initial} showAddBook />
      <UploadBookClient
        viewerName={viewer.name}
        simulated={viewer.simulated}
        verified={viewer.verified}
      />
    </div>
  );
}
