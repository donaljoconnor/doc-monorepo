import html2canvas from "html2canvas";
import { useRef, type ReactNode } from "react";

interface ScreenShotProps {
  children: ReactNode;
  filename?: string;
}

export function ScreenShot({ children, filename = "screenshot" }: ScreenShotProps) {
  const ref = useRef<HTMLDivElement>(null);

  const takeScreenshot = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    console.log('link', link.href)
    link.click();
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
