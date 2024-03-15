import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

import { TimeEventProp } from "@/types/path";
import { useRef } from "react";

gsap.registerPlugin(CSSPlugin);

const TimeEvent = ({
  order,
  title,
  content,
  current,
  changePathText,
}: TimeEventProp) => {
  // Animations classes
  const timeBubbleClass = () => {
    return "pulse-" + order.toString();
  };
  const circleClass = () => {
    return "circle-" + order.toString();
  };
  const titleRef = useRef(null);

  // Animation on click
  const { contextSafe } = useGSAP();

  // Pulse animation, shows it needs to be clicked
  useGSAP(() => {
    gsap.to("." + timeBubbleClass(), {
      scale: 1.75,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.1,
        repeat: -1,
      },
    });
  });

  const bumpClick = contextSafe(() => {
    const timelineBP = gsap.timeline();
    timelineBP.to("." + circleClass(), {
      duration: 0.2,
      y: -5,
    });
    timelineBP.to(
      titleRef.current,
      {
        duration: 0.2,
        y: -5,
      },
      "<"
    );
    timelineBP.to(
      "." + timeBubbleClass(),
      {
        duration: 0.2,
        y: -5,
      },
      "<"
    );
    timelineBP.to("." + circleClass(), {
      duration: 0.2,
      y: 0,
    });
    timelineBP.to(
      titleRef.current,
      {
        duration: 0.2,
        y: 0,
      },
      "<"
    );
    timelineBP.to(
      "." + timeBubbleClass(),
      {
        duration: 0.2,
        y: 0,
      },
      "<"
    );
    timelineBP.play();
  });

  
  const clickOnBubble = () => {
    bumpClick();
    if (current != order) {
      changePathText(content, order);
    }
  };

  return (
    <div
      className={cn(
        "flex justify-start items-start ml-0.5 text-destructive md:justify-center md:items-center md:w-60 md:mt-1 md:ml-0 md:top-1/2"
      )}
    >
      <div className="flex justify-center items-center relative">
        <div className="flex justify-center items-center group">
          <Circle
            className={cn(
              "absolute fill-destructive group-hover:fill-[#97805F] group-hover:text-[#97805F]",
              timeBubbleClass(),
              current == order && "fill-[#97805F] text-[#97805F]"
            )}
          />
          <Circle
            onClick={(e) => clickOnBubble()}
            className={cn(
              "absolute z-50 fill-destructive group-hover:fill-[#97805F] group-hover:text-[#97805F]",
              circleClass(),
              current == order && "fill-[#97805F] text-[#97805F]"
            )}
          />
        </div>
        <div className="flex absolute w-20 ml-32 md:top-1/2 md:ml-0 md:mt-8 md:w-28">
          <div
            ref={titleRef}
            className="w-full font-portfolioTitle justify-center items-center text-left text-sm md:text-center md:text-base lg:text-lg"
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeEvent;
