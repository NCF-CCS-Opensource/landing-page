import Link from "next/link";
import { FrameEditor } from "@/components/FrameEditor";

export default function GeneratorPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <Link href="/" className="self-start text-sm text-violet-300 hover:text-accent-glow">
          ← Back
        </Link>
        <h1 className="font-display text-4xl font-black text-accent-mint">Make a Frame</h1>
        <p className="text-violet-200">
          Pick your course, upload a photo, drag to reposition, and pinch or scroll to zoom.
        </p>
      </div>

      <FrameEditor />
    </main>
  );
}
