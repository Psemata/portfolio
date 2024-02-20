import TimeEvent from "./TimeEvent";

const TimeLineInfo = [
  {
    order: 0,
    side: false,
    title: "École secondaire",
    content: "Ceci est du contenu",
  },
  {
    order: 1,
    side: true,
    title: "CEFF Industrie",
    content: "Ceci est du contenu",
  },
  {
    order: 2,
    side: false,
    title: "HE-Arc",
    content: "Ceci est du contenu",
  },
  {
    order: 3,
    side: true,
    title: "Service Civil",
    content: "Ceci est du contenu",
  },
  {
    order: 4,
    side: false,
    title: "CDM",
    content: "Ceci est du contenu",
  },
  {
    order: 5,
    side: true,
    title: "?",
    content: "Ceci est du contenu",
  },
];

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
