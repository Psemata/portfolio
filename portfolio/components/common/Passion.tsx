import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Image from "next/image";

import { PassionProp } from "@/types/passion";

import { useScrollPosition } from "@/components/common/UseScrollPosition";

const Passion = ({ side, image, title, content }: PassionProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Scroll hook
  const scrollY = useScrollPosition();

  // Animation refs
  const parentRef = useRef<HTMLDivElement>(null);
  const passionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Width of the viewport
  const [width, setWidth] = useState(0);
  let isOpen = false;

  // Listen to the viewport changes and reanimate the element if it is opened
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      if (isOpen) {
        openPassion();
      }
    });
  });

  useEffect(() => {
    // Check if the parentRef has been set and is available
    if (parentRef.current) {
      // Retrieve the height of the component
      const componentHeight = parentRef.current.offsetHeight;
      // Calculate the top position of the component with a threshold of 500 pixels
      const componentTop = parentRef.current.offsetTop - 500;
      // Calculate the bottom position of the component
      const componentBottom = componentTop + componentHeight;

      // Check if the current scroll position is within the range of the component (with threshold)
      if (scrollY >= componentTop && scrollY <= componentBottom) {
        openPassion();
      }
    }
  }, [scrollY]);

  // When passion is clicked
  const openPassion = contextSafe(() => {
    let parentWidth = 0;
    let position = 0;
    let margin = 15;

    // If the parent exists, then get the width and animate the growth of the element
    if (parentRef.current) {
      parentWidth = parentRef.current.offsetWidth / 1.2;
      position = parentWidth / 2;
      if (!side) {
        position = position * -1;
      }
    }

    const timelinePassion = gsap.timeline();
    // Sizing the content
    timelinePassion.to(
      passionRef.current,
      {
        width: parentWidth,
        marginLeft: margin,
        marginRight: margin,
      },
      "<"
    );
    // Text animation
    timelinePassion.to(contentRef.current, {
      width: parentWidth - imageRef.current?.offsetWidth!,
      autoAlpha: 1,
      display: "flex",
      flexDirection: "column",
      duration: 1.5,
    });

    timelinePassion.play();
    isOpen = true;
  });

  return (
    <div
      ref={parentRef}
      className="w-full relative flex flex-row justify-center items-center"
    >
      {/* Content */}
      <div
        ref={passionRef}
        className="w-80 h-52 p-0.5 flex flex-row justify-center items-center rounded-2xl bg-accent border-4 border-accent shadow-inner"
      >
        {!side ? (
          <>
            <div
              ref={imageRef}
              className="w-80 h-full rounded-xl bg-destructive flex justify-center items-center overflow-hidden"
            >
              <Image src={image} width={500} height={500} alt={title}></Image>
            </div>
            <div
              ref={contentRef}
              className="invisible hidden justify-start text-left ml-8 mr-3"
            >
              <div className="text-destructive text-lg font-portfolio_satoshi_Bl">
                {title}
              </div>
              <div className="text-secondary font-portfolio_satoshi_M">
                {content}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              ref={contentRef}
              className="invisible hidden justify-end text-right mr-8 ml-3"
            >
              <div className="text-destructive text-lg font-portfolio_satoshi_Bl">
                {title}
              </div>
              <div className="text-secondary font-portfolio_satoshi_M">
                {content}
              </div>
            </div>
            <div
              ref={imageRef}
              className="w-80 h-full rounded-xl bg-destructive flex justify-center items-center overflow-hidden"
            >
              <Image src={image} width={500} height={500} alt={title}></Image>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Passion;
