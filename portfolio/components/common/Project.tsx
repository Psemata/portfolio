import { useRef } from "react";
import Image from "next/image";

import { Badge } from "../ui/badge";
import { Link } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { ProjectProp } from "@/types/project";
import { cn } from "@/lib/utils";

gsap.registerPlugin(CSSPlugin);

const Project = ({
  photo,
  video,
  title,
  tags,
  description,
  link,
}: ProjectProp) => {
  // GSAP
  const { contextSafe } = useGSAP();

  // Link ref
  const linkRef = useRef(null);

  // Animation
  const hoverProjectAnimation = gsap.timeline({paused: true});

  useGSAP(() => {    
    hoverProjectAnimation.to(linkRef.current, {
      duration: 0.4,
      opacity: 0.4,
      y: -5,
      yoyo: true,
      repeat: -1,
    });
  });

  // Make the link move when the mouse is hovering the project
  const hoverProject = contextSafe(() => {
    hoverProjectAnimation.play();
  });

  // Make the link stop
  const hoverOutProject = contextSafe(() => {
    hoverProjectAnimation.reverse();
  });

  return (
    <div
      className="w-full flex flex-col gap-y-4 border-destructive border-t-2 pt-3 md:mb-6 md:flex-row md:gap-x-2"
      onMouseEnter={() => hoverProject()}
      onMouseLeave={() => hoverOutProject()}
    >
      <div className={cn("mb-auto mt-auto", !video && !photo && "hidden")}>
        {video && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src={video}
              allowFullScreen
              title="Embedded Video"
            />
          </div>
        )}
        {photo && (
          <div className="aspect-w-1 aspect-h-1">
            <Image
              className="object-cover"
              src="/profile.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        )}
      </div>
      <div className="w-full p-3 flex flex-col md:flex-row md:ml-10 md:p-0">
        <div className="w-full flex flex-col">
          <div className="font-portfolio_satoshi_Bl text-xl">{title}</div>
          <div className="flex flex-wrap mt-2 gap-x-1 md:w-full">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                variant="destructive"
                className="min-h-fit flex-shrink-0 mb-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="h-full p-3 font-portfolio_satoshi_R text-lg">
            {description}
          </div>
        </div>
        <div
          ref={linkRef}
          className="w-full h-full flex pt-10 pb-3 justify-center items-center md:w-56"
        >
          <Link className="cursor-pointer" href={link} />
        </div>
      </div>
    </div>
  );
};

export default Project;
