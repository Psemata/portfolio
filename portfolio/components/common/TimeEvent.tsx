import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

import { TimeEventProp } from "@/types/path";

const TimeEvent = ({ order, side, title, content }: TimeEventProp) => {
  // GSAP & animations
  const { contextSafe } = useGSAP();
  let timeLinePulse: gsap.core.Tween;

  // Circle
  const circle = useRef(null);

  // Pulse animation, shows it needs to be clicked
  const continueTimeline = contextSafe(() => {
    timeLinePulse.revert();
    gsap.killTweensOf(".pulse");
  });

  // Start the pulse animation
  useGSAP(() => {
    timeLinePulse = gsap.to(".pulse", {
      scale: 1.75,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.1,
        repeat: -1,
      },
    });
  });

  return (
    <div
      className={cn(
        "w-60 flex justify-center items-center gap-y-4 text-destructive",
        side ? "flex-col mt-[5.5rem]" : "flex-col-reverse mb-[5rem]"
      )}
    >
      <div className="flex justify-center items-center relative my-5 group">
        <Circle className="pulse absolute fill-destructive group-hover:fill-[#97805F] group-hover:text-[#97805F]" />
        <Circle
          ref={circle}
          onClick={(e) => continueTimeline()}
          className="absolute z-50 fill-destructive group-hover:fill-[#97805F] group-hover:text-[#97805F]"
        />
      </div>
      <div className="text-xl">{title}</div>
      <div className="text-justify">{content}</div>
    </div>
  );
};

export default TimeEvent;
