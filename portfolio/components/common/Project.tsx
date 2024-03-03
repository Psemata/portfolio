import Image from "next/image";
import { ProjectProp } from "@/types/project";
import { Badge } from "../ui/badge";
import { Link } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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

  // Make the link move when the mouse is hovering the project
  const hoverProject = contextSafe(() => {
    gsap.to(linkRef.current, {
      opacity: 0.4,
      y: -5,
      yoyo: true,
      repeat: -1,
    });
  });

  const hoverOutProject = contextSafe(() => {
    gsap.getTweensOf(linkRef.current)[0].revert();
  });

  return (
    <div
      className="w-full h-56 flex flex-row border-destructive border-t-2 pt-3 mb-10"
      onMouseEnter={() => hoverProject()}
      onMouseLeave={() => hoverOutProject()}
    >
      <div>
        {video && (
          <iframe width={450} height={250} src={video} allowFullScreen />
        )}
        {photo && (
          <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        )}
      </div>
      <div className="w-full flex flex-row ml-10">
        <div className="w-full flex flex-col">
          <div className="font-portfolio_satoshi_Bl text-xl mr-10">{title}</div>
          <div className="flex flex-row mt-2 gap-x-1">
            {tags.map((tag, i) => (
              <Badge key={i} variant="destructive">
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
          className="w-56 h-full flex justify-center items-center mt-7"
        >
          <Link className="cursor-pointer" href={link} />
        </div>
      </div>
    </div>
  );
};

export default Project;
