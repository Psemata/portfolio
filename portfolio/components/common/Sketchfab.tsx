import { SketchfabProp } from "@/types/sketchfab";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Sketchfab = ({ name, licence, link }: SketchfabProp) => {
  return (
    <div className="w-full flex flex-col grow justify-center items-center gap-y-2 md:min-h-fit">
      <div className="w-full h-full flex flex-col justify-evenly items-center gap-y-8 md:px-32 md:flex-row md:gap-y-0">
        <div className="w-80 h-full text-xl text-center flex items-center justify-center bg-secondary rounded-lg font-semibold md:w-52">
          {name}
        </div>
        <div className="flex flex-grow items-center justify-center w-3/4 text-base h-full text-left md:pl-20">
          {licence}
        </div>
        <Link
          href={link}
          className="flex flex-grow items-center justify-center text-base h-full pb-8 md:text-left md:ml-4 md:pb-0 md:pl-4 hover:underline hover:text-secondary"
        >
          <ExternalLink className="hover:text-accent" />
        </Link>        
      </div>
      <div className="w-[75%] bg-accent h-0.5 md:w-[90%]"></div>
    </div>
  );
};

export default Sketchfab;
