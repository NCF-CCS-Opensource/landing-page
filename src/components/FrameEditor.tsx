"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { computeDraw, type Transform } from "@/lib/compositor";
import { FRAMES, type Course } from "@/lib/frames";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function pointerDistance(a: PointerEvent, b: PointerEvent) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

export function FrameEditor() {
  const [course, setCourse] = useState<Course>("ACT");
  const frame = FRAMES.find((f) => f.course === course)!;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  const photoImgRef = useRef<HTMLImageElement | null>(null);

  const [transform, setTransform] = useState<Transform>({ panX: 0, panY: 0, zoom: 1 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const [, forceRedraw] = useState(0);

  // Load the frame art whenever the course changes.
  useEffect(() => {
    const img = new Image();
    img.src = frame.src;
    img.onload = () => {
      frameImgRef.current = img;
      forceRedraw((n) => n + 1);
    };
  }, [frame.src]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const frameImg = frameImgRef.current;
    if (!canvas || !frameImg) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const photoImg = photoImgRef.current;
    if (photoImg) {
      const { rect, clip } = computeDraw(photoImg.naturalWidth, photoImg.naturalHeight, frame.cutout, transform);
      ctx.save();
      ctx.beginPath();
      ctx.arc(clip.cx, clip.cy, clip.radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(photoImg, rect.x, rect.y, rect.width, rect.height);
      ctx.restore();
    }

    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
  }, [frame, transform]);

  useEffect(() => {
    draw();
  }, [draw]);

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      photoImgRef.current = img;
      setTransform({ panX: 0, panY: 0, zoom: 1 });
    };
  }

  function toCanvasScale() {
    const canvas = canvasRef.current;
    if (!canvas) return 1;
    return canvas.width / canvas.clientWidth;
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current) return;
    const scale = toCanvasScale();
    const dx = (e.clientX - dragRef.current.x) * scale;
    const dy = (e.clientY - dragRef.current.y) * scale;
    dragRef.current = { x: e.clientX, y: e.clientY };
    setTransform((t) => ({ ...t, panX: t.panX + dx, panY: t.panY + dy }));
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  function onWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setTransform((t) => ({ ...t, zoom: clamp(t.zoom + delta, MIN_ZOOM, MAX_ZOOM) }));
  }

  // Pinch-to-zoom: native pointer events give us access to two simultaneous pointers.
  function onTouchPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    onPointerDown(e);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = new Map<number, PointerEvent>();

    function onDown(e: PointerEvent) {
      active.set(e.pointerId, e);
    }
    function onMove(e: PointerEvent) {
      if (!active.has(e.pointerId)) return;
      active.set(e.pointerId, e);
      if (active.size === 2) {
        const [a, b] = [...active.values()];
        const dist = pointerDistance(a, b);
        if (!pinchRef.current) {
          pinchRef.current = { dist, zoom: transform.zoom };
        } else {
          const ratio = dist / pinchRef.current.dist;
          setTransform((t) => ({ ...t, zoom: clamp(pinchRef.current!.zoom * ratio, MIN_ZOOM, MAX_ZOOM) }));
        }
      }
    }
    function onUp(e: PointerEvent) {
      active.delete(e.pointerId);
      if (active.size < 2) pinchRef.current = null;
    }

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [transform.zoom]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `beyond-the-code-${course.toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        {FRAMES.map((f) => (
          <button
            key={f.course}
            onClick={() => setCourse(f.course)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              f.course === course
                ? "bg-accent-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "border border-violet-500/40 text-violet-200 hover:border-accent-glow"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={frame.size}
        height={frame.size}
        className="aspect-square w-full max-w-md touch-none rounded-2xl border border-violet-500/30 bg-navy-900 shadow-[0_0_40px_rgba(56,189,248,0.15)]"
        onPointerDown={onTouchPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />

      <div className="flex w-full max-w-md flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-violet-200">
          Upload your photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="rounded-lg border border-violet-500/30 bg-navy-900/60 p-2 text-violet-200 file:mr-3 file:rounded-md file:border-0 file:bg-accent-purple file:px-3 file:py-1 file:text-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-violet-200">
          Zoom
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.01}
            value={transform.zoom}
            onChange={(e) => setTransform((t) => ({ ...t, zoom: Number(e.target.value) }))}
          />
        </label>

        <button
          onClick={handleDownload}
          className="rounded-xl bg-accent-glow px-4 py-3 font-display font-bold text-navy-950 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition hover:brightness-110"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
