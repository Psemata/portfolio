import { ProjectProp } from "@/types/project";

const Project = ({ file, title, tags, description, link }: ProjectProp) => {
  return (
    <div>
      <div>Image ou vidéo</div>
      <div>Titre</div>
      <div>Tags</div>
      <div>Description</div>
      <div>Lien</div>
    </div>
  );
};

export default Project;
