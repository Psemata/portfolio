import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { BookOpen } from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { ProjectProp } from "@/types/project";
import { cn } from "@/lib/utils";

gsap.registerPlugin(CSSPlugin);

const Project = ({
  icon,
  title,
  tags,
  description,
  carousel,
  content,
  others,
  link,
}: ProjectProp) => {
  // Open the project modal
  const openProject = () => {
    console.log("sup");
  };

  return (
    <div className="w-full flex flex-col gap-y-4 border-destructive border-t-2 pt-3 md:flex-row md:gap-x-2">
      {/* Icon */}
      <div className={cn("md:w-1/3 md:h-auto", !icon && "hidden")}>
        {/* Is the icon a video, or an image */}
        {icon.includes("https") ? (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={icon}
              allowFullScreen
              title="Embedded Video"
            />
          </div>
        ) : (
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
          {/* Title */}
          <div className="font-portfolio_satoshi_Bl text-xl">{title}</div>
          {/* Badges */}
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
          {/* Description */}
          <div className="h-full p-3 font-portfolio_satoshi_R text-lg">
            {description}
          </div>
        </div>
        {/* Button */}
        <div className="w-full h-full flex justify-center items-center mt-8 md:w-56 md:mt-0">
          <BookOpen
            onClick={openProject}
            className="w-14 h-14 p-3 text-destructive cursor-pointer hover:text-primary hover:bg-destructive hover:shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
