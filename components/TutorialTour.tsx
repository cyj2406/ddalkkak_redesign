"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export interface TutorialStepConfig {
  /**
   * CSS selector(s) (e.g. `[data-tutorial="..."]`). An array highlights the
   * union of all matched elements' bounding boxes. null = centered, no spotlight.
   */
  target: string | string[] | null;
  title: string;
  description: string;
  /** Runs when the tour enters this step (e.g. open a modal). */
  onEnter?: () => void;
  /** Runs when the tour leaves this step (e.g. close a modal). */
  onExit?: () => void;
}

function measureTarget(target: string | string[]): DOMRect | null {
  const selectors = Array.isArray(target) ? target : [target];
  const rects = selectors
    .map((sel) => document.querySelector(sel)?.getBoundingClientRect())
    .filter((r): r is DOMRect => !!r);
  if (rects.length === 0) return null;
  const top = Math.min(...rects.map((r) => r.top));
  const left = Math.min(...rects.map((r) => r.left));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  const right = Math.max(...rects.map((r) => r.right));
  return new DOMRect(left, top, right - left, bottom - top);
}

interface TutorialTourProps {
  isOpen: boolean;
  steps: TutorialStepConfig[];
  onClose: () => void;
}

const SPOTLIGHT_PADDING = 8;
const TOOLTIP_WIDTH = 320;
const TOOLTIP_GAP = 16;
const VIEWPORT_MARGIN = 12;

export default function TutorialTour({ isOpen, steps, onClose }: TutorialTourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState(160);

  const step = steps[stepIndex];
  const total = steps.length;

  // Reset to the first step whenever the tour (re)opens. Adjusted during
  // render (React's recommended pattern) instead of an effect, so it commits
  // in the same render pass without an extra round trip.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setStepIndex(0);
  }

  // Step enter/exit side effects (e.g. opening/closing a modal for this step).
  useEffect(() => {
    if (!isOpen) return;
    steps[stepIndex]?.onEnter?.();
    return () => {
      steps[stepIndex]?.onExit?.();
    };
  }, [isOpen, stepIndex, steps]);

  // Measure the target a few frames after entering a step, to catch modal-open animations.
  useEffect(() => {
    if (!isOpen || !step?.target) return;
    let frame = 0;
    let raf = 0;
    const measure = () => {
      const next = measureTarget(step.target as string | string[]);
      if (next) {
        document.querySelector(Array.isArray(step.target) ? step.target[0] : (step.target as string))
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      setRect(next);
      frame += 1;
      if (frame < 12) raf = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(raf);
  }, [isOpen, stepIndex, step?.target]);

  // Keep the spotlight glued to the target on resize/scroll (responsive requirement).
  useEffect(() => {
    if (!isOpen || !step?.target) return;
    const recalc = () => setRect(measureTarget(step.target as string | string[]));
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, true);
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc, true);
    };
  }, [isOpen, step?.target]);

  useLayoutEffect(() => {
    const next = tooltipRef.current?.offsetHeight;
    if (next && next !== tooltipHeight) {
      setTooltipHeight(next);
    }
  }, [stepIndex, step?.title, step?.description, rect, tooltipHeight]);

  if (!isOpen || !step) return null;

  // Ignore a stale rect left over from a previous step that had a target.
  const activeRect = step.target ? rect : null;

  const handleNext = () => {
    if (stepIndex === total - 1) onClose();
    else setStepIndex((i) => i + 1);
  };
  const handlePrev = () => setStepIndex((i) => Math.max(0, i - 1));

  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  let tooltipStyle: React.CSSProperties;
  if (activeRect) {
    const spaceBelow = viewportH - activeRect.bottom;
    const spaceAbove = activeRect.top;
    const spaceRight = viewportW - activeRect.right;

    let top: number;
    let left: number;
    if (spaceBelow >= tooltipHeight + TOOLTIP_GAP) {
      top = activeRect.bottom + TOOLTIP_GAP;
      left = activeRect.left + activeRect.width / 2 - TOOLTIP_WIDTH / 2;
    } else if (spaceAbove >= tooltipHeight + TOOLTIP_GAP) {
      top = activeRect.top - tooltipHeight - TOOLTIP_GAP;
      left = activeRect.left + activeRect.width / 2 - TOOLTIP_WIDTH / 2;
    } else if (spaceRight >= TOOLTIP_WIDTH + TOOLTIP_GAP) {
      top = activeRect.top + activeRect.height / 2 - tooltipHeight / 2;
      left = activeRect.right + TOOLTIP_GAP;
    } else {
      top = activeRect.top + activeRect.height / 2 - tooltipHeight / 2;
      left = activeRect.left - TOOLTIP_WIDTH - TOOLTIP_GAP;
    }

    left = Math.min(Math.max(left, VIEWPORT_MARGIN), viewportW - TOOLTIP_WIDTH - VIEWPORT_MARGIN);
    top = Math.min(Math.max(top, VIEWPORT_MARGIN), viewportH - tooltipHeight - VIEWPORT_MARGIN);

    tooltipStyle = { position: "fixed", top, left, width: TOOLTIP_WIDTH };
  } else {
    tooltipStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: TOOLTIP_WIDTH,
    };
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Click blocker: keeps the tour read-only while active */}
      <div className="fixed inset-0" />

      {/* Dim layer with spotlight cutout, or full dim when there's no target */}
      {activeRect ? (
        <div
          className="fixed rounded-2xl transition-all duration-200 ease-out pointer-events-none"
          style={{
            top: activeRect.top - SPOTLIGHT_PADDING,
            left: activeRect.left - SPOTLIGHT_PADDING,
            width: activeRect.width + SPOTLIGHT_PADDING * 2,
            height: activeRect.height + SPOTLIGHT_PADDING * 2,
            boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.55)",
            border: "2px solid rgba(255,255,255,0.9)",
          }}
        />
      ) : (
        <div className="fixed inset-0 bg-slate-900/55 pointer-events-none" />
      )}

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100 p-5 text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="닫기"
        >
          <X size={14} />
        </button>

        <h3 className="text-[15px] font-bold text-slate-900 tracking-tight pr-6">{step.title}</h3>
        <p className="text-[13px] text-slate-600 leading-relaxed mt-2">{step.description}</p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-[12px] font-semibold text-slate-400">
            {stepIndex + 1} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className={`px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border transition-colors ${
                stepIndex === 0
                  ? "border-slate-100 text-slate-300 cursor-not-allowed"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              }`}
            >
              ← 이전
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg text-[12.5px] font-semibold bg-slate-900 text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {stepIndex === total - 1 ? "완료" : "다음 →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
