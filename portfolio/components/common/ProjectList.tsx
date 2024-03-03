import { useRef } from "react";

import { ArrowBigDown } from "lucide-react";

import Project from "./Project";
import { ProjectListInfo } from "@/config/projectconst";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6 px-10">
      {ProjectListInfo.map((project, i) => (
        <Project
          key={i}
          video={project.video!}
          photo={project.photo!}
          title={project.title}
          tags={project.tags}
          description={project.description}
          link={project.link}
        />
      ))}
      <div className="flex flex-col justify-center items-center h-32 mb-5 text-xl text-destructive font-portfolio_satoshi_M gap-y-3">
        There are more on my github
        <ArrowBigDown ref={arrowRef} className="h-8 w-8 text-destructive" />
      </div>
    </div>
  );
};

export default ProjectList;
