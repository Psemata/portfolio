import TimeEvent from "./TimeEvent";

import { TimeLineInfo } from "@/config/timelineconst";

const TimeLine = () => {
  return (
    <div className="w-full flex h-[60vh] relative">
      <div className="w-full flex flex-row justify-evenly gap-x-3 z-50">
        {TimeLineInfo.map((timeEvent) => {
          return (
            <TimeEvent
              key={timeEvent.order}
              order={timeEvent.order}
              side={timeEvent.side}
              title={timeEvent.title}
              content={timeEvent.content}
            />
          );
        })}
        <div className="w-full flex-grow h-1 absolute top-1/2 z-0 bg-destructive" />
      </div>
    </div>
  );
};

export default TimeLine;
