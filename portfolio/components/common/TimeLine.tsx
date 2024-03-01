import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import TimeEvent from "./TimeEvent";
import { TimeLineInfo } from "@/config/timelineconst";
import { cn } from "@/lib/utils";

gsap.registerPlugin(CSSPlugin);

const TimeLine = () => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Ref on the text to be animated
  const textRef = useRef(null);

  // States for the current path step
  const [pathText, setPathText] = useState<React.JSX.Element[]>([]);
  const [current, setCurrent] = useState(-1);
  const [topPositionClass, setTopPositionClass] =
    useState<string>("top-[-9%]");

  // Top position class
  const responsivePositionCalc = (step: number) => {
    switch (step) {
      case 0: {
        setTopPositionClass("top-[-9%]");
        break;
      }
      case 1: {
        setTopPositionClass("top-[8%]");
        break;
      }
      case 2: {
        setTopPositionClass("top-[18%]");
        break;
      }
      case 3: {
        setTopPositionClass("top-[33%]");
        break;
      }
      case 4: {
        setTopPositionClass("top-[58%]");
        break;
      }
      case 5: {
        setTopPositionClass("top-[76%]");
        break;
      }
    }
  };

  // Animation of the text
  const changePathText = contextSafe((newPathText: string, order: number) => {
    const textTL = gsap.timeline();
    setCurrent(order);
    if (current != -1) {
      textTL.to(textRef.current, {
        autoAlpha: 0,
        y: -10,
        onComplete: () => {
          responsivePositionCalc(order);
          setPathText(
            newPathText
              .split(".")
              .filter((sentence) => sentence != "")
              .map((sentence, i) => (
                <div className="w-4/5 my-2" key={i}>
                  {sentence}.
                </div>
              ))
          );
        },
      });
    } else {
      responsivePositionCalc(order);
      setPathText(
        newPathText
          .split(".")
          .filter((sentence) => sentence != "")
          .map((sentence, i) => (
            <div className="w-4/5 my-2" key={i}>
              {sentence}.
            </div>
          ))
      );
    }

    textTL.to(textRef.current, {
      autoAlpha: 1,
      y: 10,
    });
    textTL.play();
  });

  return (
    <div className="w-full h-[100vh] my-32 relative flex flex-row md:justify-center md:items-center md:flex-col md:h-[40vh]">
      <div
        ref={textRef}
        className={cn(
          "w-[55%] mb-auto mr-5 ml-auto py-5 relative flex flex-col justify-start items-center bg-destructive rounded-xl shadow-2xl text-white text-sm invisible opacity-0 md:top-0 md:justify-center md:items-center md:mb-32 md:ml-0 md:mr-0 md:py-0 md:w-[50%] md:h-2/3 md:text-lg lg:text-xl",
          topPositionClass
        )}
      >
        {pathText}
      </div>
      <div className="w-full h-full absolute left-10 flex flex-col justify-evenly gap-y-10 z-50 md:gap-y-0 md:top-1/2 md:left-0 md:flex-row md:gap-x-3">
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
        <div className="absolute z-10  top-0 w-1 h-20 bg-gradient-to-b from-[#C0AE8F] to-transparent md:hidden" />
        <div className="absolute z-0 top-0 bg-destructive w-1 h-full md:top-1/2 md:w-full md:h-1 md:flex-grow" />
        <div className="absolute z-10 top-[92%] w-1 h-20 bg-gradient-to-b from-transparent to-primary md:hidden" />
      </div>
    </div>
  );
};

export default TimeLine;
