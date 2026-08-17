export type Course = "ACT" | "BSIS" | "BSCS" | "BSIT";

export interface FrameDef {
  course: Course;
  label: string;
  src: string;
  /** Native pixel size of the frame asset (square). */
  size: number;
  /** Circular cutout in the frame's own pixel space. */
  cutout: { cx: number; cy: number; radius: number };
}

// Cutout region measured from the frame art (same layout across all four
// course frames, since only the photo and label differ).
const CUTOUT = { cx: 2283, cy: 1884, radius: 1305 };

export const FRAMES: FrameDef[] = [
  { course: "ACT", label: "ACT", src: "/frame-act.jpg", size: 4096, cutout: CUTOUT },
  { course: "BSIS", label: "BSIS", src: "/frame-bsis.jpg", size: 4096, cutout: CUTOUT },
  { course: "BSCS", label: "BSCS", src: "/frame-bscs.jpg", size: 4096, cutout: CUTOUT },
  { course: "BSIT", label: "BSIT", src: "/frame-bsit.jpg", size: 4096, cutout: CUTOUT },
];
