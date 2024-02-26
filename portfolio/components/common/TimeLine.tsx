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

  const textRef = useRef(null);

  const [pathText, setPathText] = useState<string>("");
  const [current, setCurrent] = useState(-1);

  // Animation of the text
  const changePathText = contextSafe((newPathText: string, order: number) => {
    const textTL = gsap.timeline();
    if (current != -1) {
      setCurrent(order);
      textTL.to(textRef.current, {
        autoAlpha: 0,
        y: -10,
        onComplete: () => {
          setPathText(newPathText);
        },
      });
    } else {
      setCurrent(order);
      setPathText(newPathText);
    }

    textTL.to(textRef.current, {
      autoAlpha: 1,
      y: 10,
    });
    textTL.play();
  });

  return (
    <div className="w-full flex flex-col h-[35vh] relative justify-center items-center">
      <div
        ref={textRef}
        className="w-3/4 flex h-full text-lg justify-center items-center invisible opacity-0"
      >
        {pathText}
      </div>
      <div className="w-full h-full absolute top-1/2 flex flex-row justify-evenly gap-x-3 z-50">
        {TimeLineInfo.map((timeEvent) => {
          return (
            <TimeEvent
              key={timeEvent.order}
              order={timeEvent.order}
              title={timeEvent.title}
              content={timeEvent.content}
              current={current}
              changePathText={changePathText}
            />
          );
        })}
        <div className="w-full flex-grow h-1 absolute top-1/2 z-0 bg-destructive" />
      </div>
    </div>
  );
};

export default TimeLine;
