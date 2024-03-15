import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col flex-grow justify-center items-center gap-y-10 bg-primary font-portfolioText">
      <h1 className="text-5xl font-portfolioTitle">Error 404</h1>
      <h2 className="text-2xl font-portfolioSubtitle">You have lost your path...</h2>
      <p className="text-lg">Want to go back to exploration ?</p>
      <Link href="/" className={buttonVariants({ variant: "destructive" })}>Back to the game</Link>
    </div>
  );
};

export default NotFound;
