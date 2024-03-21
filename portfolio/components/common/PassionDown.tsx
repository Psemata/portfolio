import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Image from "next/image";

import { PassionProp } from "@/types/passion";
import { ArrowBigDownDash } from "lucide-react";

import { useScrollPosition } from "@/components/common/UseScrollPosition";

const PassionDown = ({ side, image, title, content }: PassionProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Scroll hook
  const scrollY = useScrollPosition();

  // Animation refs
  const parentRef = useRef<HTMLDivElement>(null);
  const passionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  // When passion is clicked
  const openPassion = contextSafe(() => {
    let newHeight = 0;
    let position = 0;

    // The height the element will get when it is clicked
    newHeight = 450;
    position = newHeight;

    const timelinePassion = gsap.timeline();
    // Sizing the content
    timelinePassion.to(
      passionRef.current,
      {
        height: newHeight,
      },
      "<"
    );
    // Text animation
    timelinePassion.to(contentRef.current, {
      height: newHeight - imageRef.current?.offsetHeight!,
      autoAlpha: 1,
      display: "flex",
      flexDirection: "column",
      duration: 1.5,
    });

    timelinePassion.play();
    setIsOpen(true);
  });

  useEffect(() => {
    // Check if the parentRef has been set and is available
    if (parentRef.current) {
      // Retrieve the height of the component
      const componentHeight = parentRef.current.offsetHeight;
      // Calculate the top position of the component with a threshold of 500 pixels
      const componentTop = parentRef.current.offsetTop - 400;
      // Calculate the bottom position of the component
      const componentBottom = componentTop + componentHeight;

      // Check if the current scroll position is within the range of the component (with threshold)
      if (scrollY >= componentTop && scrollY <= componentBottom) {
        if (!isOpen) {
          openPassion();
        }
      }
    }
  }, [scrollY, openPassion, isOpen]);

  return (
    <div
      ref={parentRef}
      className="w-full relative flex flex-col justify-center items-center"
    >
      {/* Content */}
      <div
        ref={passionRef}
        className="w-[20.8rem] h-52 p-0.5 flex flex-col justify-center items-center rounded-2xl bg-background border-4 border-primary"
      >
        <div
          ref={imageRef}
          className="w-80 h-52 rounded-xl flex justify-center items-center overflow-hidden"
        >
          <Image
            priority={true}
            src={image}
            width={500}
            height={500}
            alt={title}
          ></Image>
        </div>
        <div
          ref={contentRef}
          className="invisible hidden justify-start text-left m-3"
        >
          <div className="font-portfolioSubtitle font-semibold text-lg text-accent">
            {title}
          </div>
          <div className="font-portfolioText font-semibold text-base text-primary">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassionDown;
