import {
  MenuIcon,
  Dices,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
} from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PORTFOLIO_NAV } from "@/config/navigationconfig";
import NavigationLink from "./NavigationLink";
import Link from "next/link";
import { ReactNode } from "react";

const Navbar = () => {
  // Dices icons definition
  const dicesClass =
    "relative left-14 font-semibold h-5 w-5 ml-auto mr-0 animate-throwDice";
  const dicesList: ReactNode[] = [
    <Dice1 key={0} className={dicesClass} />,
    <Dice2 key={1} className={dicesClass} />,
    <Dice3 key={2} className={dicesClass} />,
    <Dice4 key={3} className={dicesClass} />,
    <Dice5 key={4} className={dicesClass} />,
    <Dice6 key={5} className={dicesClass} />,
  ];

  return (
    <div className="fixed top-0 inset-x-0 h-20 bg-transparent z-50 pointer-events-none">
      <MaxWidthWrapper>
        <header className="flex items-center">
          <div className="h-20 pt-4 ml-auto mr-0">
            <Sheet>
              <SheetTrigger asChild>
                <MenuIcon className="pointer-events-auto bg-secondary hover:bg-accent text-accent hover:text-primary w-10 h-10 p-1 rounded-lg" />
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full bg-primary text-accent">
                <SheetHeader className="flex items-center justify-center sm:text-center text-destructive">
                  <SheetTitle>
                    <Dices className="w-14 h-14" />
                  </SheetTitle>
                  <SheetDescription className="flex flex-col italic text-destructive">
                    <span>“Alea jacta est”</span>
                    <span>Julius Caesar</span>
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col flex-grow gap-2 py-4 sm:text-lg">
                  {PORTFOLIO_NAV.map((navigation) => (
                    <NavigationLink
                      href={navigation.href}
                      label={navigation.label}
                      face={navigation.face}
                      diceIcon={dicesList[navigation.face]}
                      key={navigation.face}
                    />
                  ))}
                </div>
                <SheetFooter className="flex flex-col sm:flex-col items-center justify-center text-center text-sm text-accent animate-pulse">
                  <div>Designed & built by</div>
                  <Link
                    href="https://github.com/Psemata"
                    className="hover:underline"
                  >
                    Bruno Alexandre Da Cruz Costa                  
                  </Link>
                  <div>
                    3D from                    
                  </div>
                  <Link
                    href="https://sketchfab.com/"
                    className="hover:underline"
                  >
                    Sketchfab
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
