export interface Cutout {
  cx: number;
  cy: number;
  radius: number;
}

/** Pan is in frame-pixel units (offset of photo center from cutout center). Zoom 1 = cover-fit. */
export interface Transform {
  panX: number;
  panY: number;
  zoom: number;
}

export interface DrawRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Pure transform math: given a photo's natural size, a circular cutout, and a
 * pan/zoom transform, compute where to draw the photo (cover-fit the cutout
 * circle's bounding box, then apply pan + zoom) and the circular clip to
 * apply before drawing. No canvas/DOM involved, so this is unit-testable.
 */
export function computeDraw(
  photoWidth: number,
  photoHeight: number,
  cutout: Cutout,
  transform: Transform,
): { rect: DrawRect; clip: Cutout } {
  const diameter = cutout.radius * 2;
  const coverScale = Math.max(diameter / photoWidth, diameter / photoHeight);
  const scale = coverScale * transform.zoom;

  const width = photoWidth * scale;
  const height = photoHeight * scale;

  const x = cutout.cx + transform.panX - width / 2;
  const y = cutout.cy + transform.panY - height / 2;

  return {
    rect: { x, y, width, height },
    clip: { cx: cutout.cx, cy: cutout.cy, radius: cutout.radius },
  };
}
