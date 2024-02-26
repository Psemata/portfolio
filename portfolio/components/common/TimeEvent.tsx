import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

import { TimeEventProp } from "@/types/path";

gsap.registerPlugin(CSSPlugin);

const TimeEvent = ({
  order,
  title,
  content,
  current,
  changePathText,
}: TimeEventProp) => {
  // Time bubble class
  const timeBubbleClass = () => {
    return "pulse-" + order.toString();
  };

  // Start the pulse animation
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

  // Pulse animation, shows it needs to be clicked
  const clickOnBubble = () => {
    if (current != order) {
      changePathText(content, order);
    }
  };

  return (
    <div
      className={cn(
        "w-60 top-1/2 mt-1 flex justify-center items-center text-destructive"
      )}
    >
      <div className="flex justify-center items-center">
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
              current == order && "fill-[#97805F] text-[#97805F]"
            )}
          />
        </div>
        <div className="flex flex-col absolute w-80 h-60 top-1/2 mt-8">
          <div className="w-full font-portfolio_satoshi_R justify-center items-center text-center text-lg">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeEvent;
