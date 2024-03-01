import Project from "./Project";

import { ProjectListInfo } from "@/config/projectconst";

const ProjectList = () => {
  return (
    <div>
      {ProjectListInfo.map((project) => (
        <Project
          file={project.file!}
          title={project.title}
          tags={project.tags}
          description={project.description}
          link={project.link}
        ></Project>
      ))}
    </div>
  );
};

export default ProjectList;
