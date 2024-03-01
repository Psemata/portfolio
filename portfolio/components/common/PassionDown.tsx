import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { PassionProp } from "@/types/passion";
import { ArrowBigDownDash } from "lucide-react";

const PassionDown = ({ side, image, title, content }: PassionProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Animation refs
  const passionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef(null);

  // When passion is clicked
  const clickPassion = contextSafe(() => {
    let newHeight = 0;
    let position = 0;

    newHeight = 375;
    position = newHeight;

    const timelinePassion = gsap.timeline();

    // Moving the arrow
    timelinePassion.to(
      arrowRef.current,
      {
        y: position,
        autoAlpha: 0,
        duration: 0.5,
      },
      "<"
    );
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
  });

  // Animate the arrows
  useGSAP(() => {
    gsap.to(arrowRef.current, {
      y: -10,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.3,
    });
  });

  return (
    <div
      className="w-full relative flex flex-col justify-center items-center"
      onClick={(e) => clickPassion()}
    >
      {/* Content */}
      <div
        ref={passionRef}
        className="w-[20.8rem] h-52 p-0.5 flex flex-col justify-center items-center rounded-2xl bg-accent border-4 border-accent shadow-inner"
      >
        <div
          ref={imageRef}
          className="w-80 h-52 rounded-xl bg-destructive flex justify-center items-center"
        >
          Image
        </div>
        <div
          ref={contentRef}
          className="invisible hidden justify-start text-left m-3"
        >
          <div className="text-destructive text-lg font-portfolio_satoshi_Bl">
            {title}
          </div>
          <div className="text-secondary font-portfolio_satoshi_M">
            {content}
          </div>
        </div>
      </div>
      {/* Down arrow */}
      <div className="flex items-center justify-center absolute mt-72">
        <ArrowBigDownDash
          ref={arrowRef}
          className="w-9 h-9 text-destructive opacity-75"
        />
      </div>
    </div>
  );
};

export default PassionDown;
