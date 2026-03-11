import { createContext, ReactNode, useContext, useState } from "react";
import PptxGenJS from "pptxgenjs";

export interface DeckScreenshot {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
}

export interface DeckContextValue {
  screenshots: DeckScreenshot[];
  addScreenshot: (screenshot: DeckScreenshot) => void;
}

export const DeckContext = createContext<DeckContextValue | undefined>(
  undefined,
);

export function DeckProvider({ children }: { children: ReactNode }) {
  const [screenshots, setScreenshots] = useState<DeckScreenshot[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const addScreenshot = (screenshot: DeckScreenshot) => {
    setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
    // localStorage.setItem(
    //   "screenshots",
    //   JSON.stringify([...screenshots, screenshot]),
    // );
  };

  const getImageDimensions = (src: string) =>
    new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
      image.onerror = () =>
        reject(new Error("Failed to load screenshot image."));
      image.src = src;
    });

  const exportToPowerPoint = async () => {
    if (screenshots.length === 0 || isExporting) return;

    setIsExporting(true);
    try {
      const pptx = new PptxGenJS();
      pptx.layout = "LAYOUT_WIDE";
      pptx.author = "doc-monorepo";
      pptx.subject = "Screenshots";
      pptx.title = "Screenshot Export";

      const slideWidth = 13.333;
      const slideHeight = 7.5;

      for (const screenshot of screenshots) {
        const slide = pptx.addSlide();
        const { width, height } = await getImageDimensions(screenshot.image);

        const imageRatio = width / height;
        const slideRatio = slideWidth / slideHeight;

        let renderWidth = slideWidth;
        let renderHeight = slideHeight;
        let x = 0;
        let y = 0;

        if (imageRatio > slideRatio) {
          renderHeight = slideWidth / imageRatio;
          y = (slideHeight - renderHeight) / 2;
        } else {
          renderWidth = slideHeight * imageRatio;
          x = (slideWidth - renderWidth) / 2;
        }

        slide.addImage({
          data: screenshot.image,
          x,
          y,
          w: renderWidth,
          h: renderHeight,
        });

        slide.addNotes(`Screenshot: ${screenshot.name}`);
      }

      await pptx.writeFile({ fileName: `screenshots-${Date.now()}.pptx` });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DeckContext.Provider value={{ screenshots, addScreenshot }}>
      {screenshots.length > 0 && (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 bg-blue-200/80 p-3 rounded shadow-lg">
          <div className="flex flex-row items-center space-x-au">
            <button
              onClick={setScreenshots.bind(null, [])}
              className="rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {"Clear"}
            </button>

            <button
              onClick={exportToPowerPoint}
              disabled={isExporting}
              className="rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? "Exporting..." : "Export PPTX"}
            </button>
          </div>
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="w-64 h-36 rounded overflow-hidden border border-border bg-card"
            >
              <img
                src={screenshot.thumbnail}
                alt={screenshot.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {children}
    </DeckContext.Provider>
  );
}

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
