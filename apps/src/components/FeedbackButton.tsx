import * as React from "react";
import { MessageSquareIcon, XIcon } from "lucide-react";

export function FeedbackButton() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setText("");
    }, 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Give feedback"
        className="inline-flex items-center gap-1.5 rounded-sm border border-[#E5E5E3] bg-[#FAFAF8] px-3 py-1.5 text-[11px] tracking-wide text-[#6F6F6B] transition-colors hover:border-[#111110] hover:text-[#111110]"
      >
        <MessageSquareIcon className="size-3" />
        Feedback
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Feedback"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-sm rounded border border-[#E5E5E3] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#111110]">
                Feedback
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close feedback"
                className="text-[#A8A8A4] hover:text-[#111110]"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>

            {submitted ? (
              <p className="py-4 text-center text-sm text-[#3D9A60]">
                Thanks for your feedback!
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <textarea
                  aria-label="Feedback text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us what you think…"
                  rows={4}
                  className="w-full resize-none rounded-sm border border-[#E5E5E3] bg-[#FAFAF8] p-3 text-sm text-[#111110] outline-none placeholder:text-[#C4C4C0] focus:border-[#111110]"
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="mt-3 w-full rounded-sm bg-[#111110] py-2 text-[11px] font-medium tracking-widest uppercase text-[#FAFAF8] transition-opacity disabled:opacity-40"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
