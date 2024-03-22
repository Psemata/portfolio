import { SketchfabProp } from "@/types/sketchfab";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Sketchfab = ({ name, licence, link }: SketchfabProp) => {
  return (
    <div className="w-full h-16 flex flex-col justify-center items-center gap-y-2">
      <div className="w-full h-full flex flex-row justify-evenly items-center px-32">
        <div className="text-xl w-52 h-full text-center flex items-center justify-center bg-secondary rounded-lg font-semibold">
          {name}
        </div>
        <div className="flex flex-grow items-center justify-center w-3/4 text-base h-full text-left pl-20">
          {licence}
        </div>
        <Link
          href={link}
          className="flex flex-grow items-center justify-center text-base h-full text-left  hover:underline hover:text-secondary"
        >
          <ExternalLink className="hover:text-accent" />
        </Link>        
      </div>
      <div className="w-[90%] bg-accent h-0.5"></div>
    </div>
  );
};

export default Sketchfab;
