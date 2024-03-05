import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col flex-grow justify-center items-center gap-y-10 bg-primary font-portfolio_satoshi_R">
      <h1 className="text-5xl font-portfolio_satoshi_Bl">Error 404</h1>
      <h2>You have lost your path...</h2>
      <p>Want to go back to exploration ?</p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>Back to the game</Link>
    </div>
  );
};

export default NotFound;
