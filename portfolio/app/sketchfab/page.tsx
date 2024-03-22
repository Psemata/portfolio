import Sketchfab from "@/components/common/Sketchfab";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Sketchfabconst } from "@/config/sketchfabconst";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col flex-grow justify-center items-center gap-y-10 bg-background font-portfolioText">
      <h1 className="text-5xl font-portfolioTitle">Sketchfab</h1>
      <h2 className="text-2xl font-portfolioSubtitle">
        The 3D Models of this website have been taken from{" "}
        <Link
          href={"https://sketchfab.com"}
          className="text-accent hover:underline hover:text-secondary"
        >
          Sketchfab
        </Link>
      </h2>
      <div className="w-full h-[65%]">
        <div className="text-xl font-portfolioSubtitle text-center justify-center items-center mb-10">
          These are the models used
        </div>
        <div className="w-full h-[65%] flex flex-col gap-y-3 overflow-auto">
          {Sketchfabconst.map((skf) => (
            <Sketchfab
              key={skf.name}
              name={skf.name}
              licence={skf.licence}
              link={skf.link}
            ></Sketchfab>
          ))}
        </div>
      </div>
      <Link
        href="/"
        className={cn(
          "border-none text-lg",
          buttonVariants({ variant: "default" })
        )}
      >
        Back to the game
      </Link>
    </div>
  );
};

export default NotFound;
