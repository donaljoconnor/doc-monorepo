import { useDeck } from "@/app/dashboard/contexts/DeckContext";
import html2canvas from "html2canvas";
import { v4 as uuid } from "uuid";
import { useRef, type ReactNode } from "react";

interface ScreenShotProps {
  children: ReactNode;
  filename?: string;
}

export function ScreenShot({
  children,
  filename = "screenshot",
}: ScreenShotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { addScreenshot } = useDeck();

  const takeScreenshot = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);

    // Create a thumbnail (scaled-down version)
    const thumbnailCanvas = document.createElement("canvas");
    const scale = 0.2; // 20% of original size
    thumbnailCanvas.width = canvas.width * scale;
    thumbnailCanvas.height = canvas.height * scale;
    const ctx = thumbnailCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        canvas,
        0,
        0,
        thumbnailCanvas.width,
        thumbnailCanvas.height,
      );
    }
    const thumbnailDataUrl = thumbnailCanvas.toDataURL("image/png");

    addScreenshot({
      id: uuid(),
      name: filename,
      image: canvas.toDataURL("image/png"),
      thumbnail: thumbnailDataUrl,
    });
  };

  return (
    <div className="relative inline-block">
      <div ref={ref}>{children}</div>
      <button
        onClick={takeScreenshot}
        className="absolute top-2 right-2 px-2.5 py-1 text-xs cursor-pointer bg-black/60 text-white border-none rounded"
      >
        Screenshot
      </button>
    </div>
  );
}
