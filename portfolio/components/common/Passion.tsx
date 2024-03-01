import { useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { PassionProp } from "@/types/passion";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

const Passion = ({ side, image, title, content }: PassionProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  const [width, setWidth] = useState(0);
  let isOpen = false;

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      if (isOpen) {
        clickPassion();
      }
    });
  });

  // Animation refs
  const parentRef = useRef<HTMLDivElement>(null);
  const passionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(null);

  // When passion is clicked
  const clickPassion = contextSafe(() => {
    let parentWidth = 0;
    let position = 0;
    let margin = 15;

    if (parentRef.current) {
      parentWidth = parentRef.current.offsetWidth / 1.3;
      position = parentWidth / 2;
      if (!side) {
        position = position * -1;
      }
    }

    const timelinePassion = gsap.timeline();

    // Moving the arrow
    timelinePassion.to(
      arrowRef.current,
      {
        x: position,
        autoAlpha: 0,
        duration: 0.5,
      },
      "<"
    );
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

  // Animate the arrows
  useGSAP(() => {
    if (side) {
      gsap.to(arrowRef.current, {
        x: 10,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
      });
    } else {
      gsap.to(arrowRef.current, {
        x: -10,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
      });
    }
  });

  return (
    <div
      ref={parentRef}
      className="w-full relative flex flex-row justify-center items-center"
      onClick={(e) => clickPassion()}
    >
      {/* Left arrow */}
      {!side && (
        <div className="md:flex md:items-center md:justify-center md:absolute md:mr-96">
          <ArrowBigLeftDash
            ref={arrowRef}
            className="w-9 h-9 text-destructive opacity-75 mr-10"
          />
        </div>
      )}
      {/* Content */}
      <div
        ref={passionRef}
        className="w-80 h-52 p-0.5 flex flex-row justify-center items-center rounded-2xl bg-accent border-4 border-accent shadow-inner"
      >
        {!side ? (
          <>
            <div
              ref={imageRef}
              className="w-80 h-full rounded-xl bg-destructive flex justify-center items-center"
            >
              Image
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
              className="w-80 h-full rounded-xl bg-destructive flex justify-center items-center"
            >
              Image
            </div>
          </>
        )}
      </div>
      {/* Right arrow */}
      {side && (
        <div className="md:flex md:items-center md:justify-center md:absolute md:ml-96">
          <ArrowBigRightDash
            ref={arrowRef}
            className="w-9 h-9 text-destructive opacity-75 ml-10"
          />
        </div>
      )}
    </div>
  );
};

export default Passion;
