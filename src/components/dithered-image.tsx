import { useEffect, useRef } from "react";

const DEFAULT_RESOLUTION = 64;

// atkinson error diffusion offsets
const ATKINSON_OFFSETS = [
  [1, 0],
  [2, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [0, 2],
] as const;

// dithers each r/g/b channel independently to preserve color
function atkinsonDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      for (let ch = 0; ch < 3; ch++) {
        const old = data[idx + ch];
        const val = old > 128 ? 255 : 0;
        const err = Math.floor((old - val) / 8);

        data[idx + ch] = val;

        for (const [dx, dy] of ATKINSON_OFFSETS) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny < height) {
            const ni = (ny * width + nx) * 4 + ch;
            data[ni] = Math.min(255, Math.max(0, data[ni] + err));
          }
        }
      }
    }
  }
}

export function DitheredImage({
  src,
  alt,
  className,
  resolution = DEFAULT_RESOLUTION,
}: {
  src: string;
  alt: string;
  className?: string;
  resolution?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (cancelled) return;

      canvas.width = resolution;
      canvas.height = resolution;
      ctx.drawImage(img, 0, 0, resolution, resolution);

      try {
        const imageData = ctx.getImageData(0, 0, resolution, resolution);
        atkinsonDither(imageData.data, resolution, resolution);
        ctx.putImageData(imageData, 0, 0);
      } catch {
        // cors blocked — canvas already has the undithered image as fallback
      }
    };

    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, resolution]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "pixelated", willChange: "transform" }}
      aria-label={alt}
      role="img"
    />
  );
}
