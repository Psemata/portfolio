"use client";

import Presentation from "@/components/common/3d/Presentation";
import TimeLine from "@/components/common/TimeLine";
import PassionList from "@/components/common/PassionList";
import Contact from "@/components/common/Contact";
import ProjectList from "@/components/common/ProjectList";

import { Route } from "lucide-react";
import { Flame } from "lucide-react";
import { Archive } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useScrollPosition } from "@/components/common/UseScrollPosition";

const Page = () => {
  // Ref on the first chevrons
  const chevronsRef = useRef(null);
  const firstSectionRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  // Animation which tells the user to scroll down
  useGSAP(() => {
    gsap.to(chevronsRef.current, {
      y: 15,
      yoyo: true,
      repeat: -1,
    });
  });

  // Make the chevrons disappear
  const chevronsDisappear = contextSafe(() => {
    gsap.to(chevronsRef.current, {
      autoAlpha: 0,
      duration: 1.5,
    });
  });

  // Scroll hook
  const scrollY = useScrollPosition();

  useEffect(() => {
    // Check if the parentRef has been set and is available
    if (firstSectionRef.current) {
      // Retrieve the height of the component
      const componentHeight = firstSectionRef.current.offsetHeight;
      // Calculate the top position of the component with a threshold of 500 pixels
      const componentTop = firstSectionRef.current.offsetTop + 250;
      // Calculate the bottom position of the component
      const componentBottom = componentTop + componentHeight;

      // Check if the current scroll position is within the range of the component (with threshold)
      if (scrollY >= componentTop && scrollY <= componentBottom) {
        chevronsDisappear();
      }
    }
  }, [scrollY]);

  return (
    <>
      <main className="bg-primary overflow-x-hidden">
        {/* My presentation */}
        <section
          ref={firstSectionRef}
          id="myself"
          className="relative h-[110vh]"
        >
          <Presentation />
          <div className="absolute top-3/4 w-full flex justify-center items-center">
            <ChevronsDown
              ref={chevronsRef}
              className="w-12 h-12 text-destructive"
            />
          </div>
        </section>

        {/* My path */}
        <section
          id="path"
          className="min-h-screen bg-gradient-to-b from-[#C0AE8F] to-primary md:h-[45rem] md:min-h-max"
        >
          <div className="flex justify-center items-center text-xl font-medium font-portfolioTitle text-destructive md:text-5xl">
            <Route className="w-14 h-14 pb-2 mb-20 border-b-4 rounded-b-sm border-destructive md:mb-10" />
          </div>
          <TimeLine></TimeLine>
        </section>

        {/* My passions */}
        <section id="passions" className="min-h-screen mb-28">
          <div className="flex justify-center items-center text-xl font-medium font-portfolioTitle text-destructive md:text-5xl">
            <Flame className="w-14 h-14 mb-28 mt-10 pb-2 border-b-4 rounded-b-sm border-destructive" />
          </div>
          <PassionList />
        </section>

        {/* My projects */}
        <section id="projects" className="min-h-screen">
          <div className="flex justify-center items-center text-xl font-medium font-portfolioTitle text-destructive md:text-5xl">
            <Archive className="w-14 h-14 mb-28 pb-2 border-b-4 rounded-b-sm border-destructive" />
          </div>
          <ProjectList />
        </section>

        {/* My contacts */}
        <section id="contacts" className="h-72 bg-accent">
          <Contact />
        </section>
      </main>
    </>
  );
};

export default Page;
