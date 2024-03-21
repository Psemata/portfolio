import { ProjectProp } from "@/types/project";
import { UseProjectModal } from "./UseProjectModal";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectModalProps {
  initProject: ProjectProp;
}

const ProjectModal = ({ initProject }: ProjectModalProps) => {
  const projectModal = UseProjectModal();

  const emptyProject: ProjectProp = {
    icon: "",
    title: "",
    tags: [],
    description: "",
    carousel: [],
    content: [],
    others: [],
    link: "",
  };

  const [project, setProject] = useState<ProjectProp | null>(
    initProject || emptyProject
  );

  useEffect(() => {
    setProject(initProject);
  }, [initProject]);

  return (
    <Dialog open={projectModal.isOpen} onOpenChange={projectModal.onClose}>
      <DialogContent className="flex flex-col rounded-lg shadow-xl w-[95vw] h-[80vh] lg:max-w-5xl overflow-y-auto overflow-x-hidden">
        <DialogHeader className="flex flex-col">
          <DialogTitle className="flex justify-center items-center mb-4">
            <Carousel className="w-[75%]">
              <CarouselContent>
                {project?.carousel.map((carou, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center w-full aspect-video"
                  >
                    {carou.includes("http") ? (
                      <iframe
                        className="w-full h-full rounded-md"
                        src={carou}
                        allowFullScreen
                        title="Embedded Video"
                      />
                    ) : (
                      <img src={carou}></img>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full text-left px-6 py-1 font-portfolioTitle text-sm md:text-2xl">
          {project?.title}
        </div>
        <div>
          {project?.content.map((contentPart, index) => (
            <div
              className={cn(
                "px-6 font-portfolioText text-sm text-left md:text-base",
                index === 1 && "my-2 font-portfolioSubtitle md:text-xl"
              )}
              key={index}
            >
              {contentPart}
            </div>
          ))}
        </div>
        {project?.others && (
          <div className="px-6 font-portfolioSubtitle text-sm text-left md:text-xl ">
            Links:
          </div>
        )}
        {project?.others &&
          project?.others.map((link, index) => (
            <div className="px-6" key={index}>
              <Link
                href={link}
                className="font-portfolioText hover:text-accent text-xs text-left underline md:text-base"
                target="_blank"
              >
                {link}
              </Link>
            </div>
          ))}

        <DialogFooter className="w-full flex flex-row justify-center items-center sm:justify-center">
          {project?.link && (
            <Link className="mt-5" target="_blank" href={project?.link!}>
              <ExternalLink className="hover:text-accent" />
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
