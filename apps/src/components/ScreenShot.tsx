import * as React from "react";
import html2canvas from "html2canvas";
import { CameraIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type ScreenShotProps = {
  children: React.ReactNode;
};

export function ScreenShot({ children }: ScreenShotProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [isCapturing, setIsCapturing] = React.useState(false);

  const handleCapture = React.useCallback(async () => {
    if (!containerRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: window.devicePixelRatio > 1 ? 2 : 1,
      });

      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `screenshot-${Date.now()}.png`;
      link.click();
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  return (
    <div className="space-y-3">
      <Button onClick={handleCapture} disabled={isCapturing} variant="outline">
        <CameraIcon className="size-4" aria-hidden="true" />
        {isCapturing ? "Capturing..." : "Take screenshot"}
      </Button>
      <div ref={containerRef}>{children}</div>
    </div>
  );
}
