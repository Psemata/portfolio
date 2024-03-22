import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col flex-grow justify-center items-center gap-y-10 bg-background font-portfolioText">
      <h1 className="text-5xl font-portfolioTitle">Sketchfab</h1>
      <h2 className="text-2xl font-portfolioSubtitle">
        The 3D Models of this website have been taken from Sketchfab
      </h2>
      <p className="text-lg">Want to go back to exploration ?</p>
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
