import { describe, expect, it } from "vitest";
import { computeDraw } from "./compositor";

const cutout = { cx: 200, cy: 200, radius: 100 }; // 200x200 cutout box

describe("computeDraw", () => {
  it("cover-fits a wider photo at zoom 1 with no pan: height matches diameter, centered on cutout", () => {
    const { rect, clip } = computeDraw(400, 200, cutout, { panX: 0, panY: 0, zoom: 1 });

    expect(rect.height).toBeCloseTo(200); // diameter
    expect(rect.width).toBeCloseTo(400); // 2x scale applied to width too
    expect(rect.x).toBeCloseTo(200 - rect.width / 2);
    expect(rect.y).toBeCloseTo(200 - rect.height / 2);
    expect(clip).toEqual(cutout);
  });

  it("cover-fits a taller photo at zoom 1: width matches diameter", () => {
    const { rect } = computeDraw(200, 400, cutout, { panX: 0, panY: 0, zoom: 1 });

    expect(rect.width).toBeCloseTo(200);
    expect(rect.height).toBeCloseTo(400);
  });

  it("doubling zoom doubles the drawn size, still centered", () => {
    const base = computeDraw(200, 200, cutout, { panX: 0, panY: 0, zoom: 1 });
    const zoomed = computeDraw(200, 200, cutout, { panX: 0, panY: 0, zoom: 2 });

    expect(zoomed.rect.width).toBeCloseTo(base.rect.width * 2);
    expect(zoomed.rect.height).toBeCloseTo(base.rect.height * 2);
  });

  it("pan offsets the photo center away from the cutout center", () => {
    const { rect } = computeDraw(200, 200, cutout, { panX: 30, panY: -10, zoom: 1 });
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    expect(centerX).toBeCloseTo(cutout.cx + 30);
    expect(centerY).toBeCloseTo(cutout.cy - 10);
  });

  it("panned+zoomed: pan offset and zoom scale both apply together", () => {
    const base = computeDraw(200, 200, cutout, { panX: 0, panY: 0, zoom: 1 });
    const { rect } = computeDraw(200, 200, cutout, { panX: 30, panY: -10, zoom: 2 });

    expect(rect.width).toBeCloseTo(base.rect.width * 2);
    expect(rect.height).toBeCloseTo(base.rect.height * 2);
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    expect(centerX).toBeCloseTo(cutout.cx + 30);
    expect(centerY).toBeCloseTo(cutout.cy - 10);
  });

  it("clip always equals the cutout regardless of transform", () => {
    const { clip } = computeDraw(500, 500, cutout, { panX: 999, panY: -999, zoom: 3 });
    expect(clip).toEqual(cutout);
  });
});
