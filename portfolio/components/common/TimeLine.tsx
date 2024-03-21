import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import TimeEvent from "./TimeEvent";
import { TimeLineInfo } from "@/config/timelineconst";

gsap.registerPlugin(CSSPlugin);

const TimeLine = () => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Ref on the text to be animated
  const textRef = useRef(null);

  // States for the current path step
  const [pathText, setPathText] = useState<string>(TimeLineInfo[0].content);
  const [subtitleText, setSubtitleText] = useState<string>(
    TimeLineInfo[0].subtitle
  );
  const [current, setCurrent] = useState(0);

  // Animation of the text
  const changePathText = contextSafe(
    (newPathSubtitle: string, newPathText: string, order: number) => {
      // Animation timeline
      const textTL = gsap.timeline();

      // Set the current text
      setCurrent(order);

      textTL.to(textRef.current, {
        autoAlpha: 0,
        y: -10,
        onComplete: () => {
          // Format the text
          setSubtitleText(newPathSubtitle);
          setPathText(newPathText);
        },
      });

      textTL.to(textRef.current, {
        autoAlpha: 1,
        y: 10,
      });
      textTL.play();
    }
  );

  return (
    <div className="w-full h-[100vh] mb-20 relative flex flex-row md:justify-center md:items-center md:flex-col md:h-[30rem] md:my-0">
      <div
        ref={textRef}
        className="w-[54%] my-auto mr-2 ml-auto py-5 pr-5 pl-1 relative flex flex-col justify-center items-center text-sm whitespace-pre-line md:top-0 md:justify-center md:items-center md:mx-0 md:p-10 md:mb-24 md:mt-16 md:w-[60%] md:text-lg"
      >
        <div className="w-full text-left font-portfolioSubtitle text-accent text-lg font-bold mb-3 md:text-xl">
          {subtitleText}
        </div>
        <div className="w-full">{pathText}</div>
      </div>
      <div className="w-full h-full absolute left-10 flex flex-col justify-evenly gap-y-10 z-[40] md:gap-y-0 md:top-1/2 md:left-0 md:flex-row">
        {TimeLineInfo.map((timeEvent) => {
          return (
            <TimeEvent
              key={timeEvent.order}
              order={timeEvent.order}
              title={timeEvent.title}
              subtitle={timeEvent.subtitle}
              content={timeEvent.content}
              current={current}
              changePathText={changePathText}
            />
          );
        })}
        <div className="w-full h-full absolute flex flex-col md:flex-row">
          <div className="absolute z-10 top-0 w-1 h-20 bg-gradient-to-b from-[#C0AE8F] to-transparent md:left-0 md:top-1/2 md:w-14 md:h-1.5 md:bg-gradient-to-r md:to-transparent md:from-background" />
          <div className="absolute z-0 top-0 bg-foreground w-1 h-full md:top-1/2 md:w-full md:h-1 md:flex-grow" />
          <div className="absolute z-10 bottom-0 w-1 h-20 bg-gradient-to-b from-transparent to-primary md:right-0 md:top-1/2 md:w-14 md:h-1.5 md:bg-gradient-to-l md:to-transparent md:from-background" />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
