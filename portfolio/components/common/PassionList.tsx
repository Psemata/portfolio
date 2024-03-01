import Passion from "@/components/common/Passion";
import { PassionListInfo } from "@/config/passionlistconst";
import PassionDown from "./PassionDown";

const PassionList = () => {
  return (
    <>
      <div className="hidden w-full h-full md:flex md:flex-col md:justify-center md:items-center md:gap-y-10">
        {PassionListInfo.map((passion, i) => (
          <Passion
            key={i}
            side={passion.side}
            image={passion.image!}
            title={passion.title}
            content={passion.content}
          ></Passion>
        ))}
      </div>
      <div className="md:hidden w-full h-full flex flex-col justify-center items-center gap-y-20">
        {PassionListInfo.map((passion, i) => (
          <PassionDown
            key={i}
            side={passion.side}
            image={passion.image!}
            title={passion.title}
            content={passion.content}
          ></PassionDown>
        ))}
      </div>
    </>
  );
};

export default PassionList;
