import { useRef } from "react";

import { ArrowBigDown } from "lucide-react";

import Project from "./Project";
import { ProjectListInfo } from "@/config/projectconst";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);

const ProjectList = () => {
  // Arrow animation ref
  const arrowRef = useRef(null);

  useGSAP(() => {
    gsap.to(arrowRef.current, {
      y: 10,
      yoyo: true,
      repeat: -1,
    });
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6 px-10 md:px-40">
      {ProjectListInfo.map((project, i) => (
        <Project
          key={i}
          icon={project.icon}
          title={project.title}
          tags={project.tags}
          description={project.description}
          carousel={project.carousel}
          content={project.content}
          others={project.others}
          link={project.link}
        />
      ))}
      <div className="flex flex-col justify-center items-center h-32 mb-5 text-xl font-portfolioSubtitle gap-y-3">
        There are more on my github
        <ArrowBigDown ref={arrowRef} className="h-8 w-8" />
      </div>
    </div>
  );
};

export default ProjectList;
