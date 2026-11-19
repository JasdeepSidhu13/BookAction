import { AppHeader } from "@/components/AppHeader";
import { SignInBanner } from "@/components/SignInBanner";
import { UploadBookClient } from "@/components/UploadBookClient";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const viewer = await getViewer();

  if (!viewer.verified) {
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <AppHeader active="library" signedIn={false} />
        <main className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 py-10 sm:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 font-display text-4xl font-bold tracking-tight">Add a book</h1>
            <p className="m-0 text-[15px] text-soft">
              Uploads are saved to your Cursor account so Progress and Question Bank
              stay private to you.
            </p>
          </div>
          <SignInBanner />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <AppHeader
        active="library"
        initial={viewer.initial}
        showAddBook
        signedIn
        viewerName={viewer.name}
      />
      <UploadBookClient
        viewerName={viewer.name}
        simulated={viewer.simulated}
        verified={viewer.verified}
      />
    </div>
  );
}
