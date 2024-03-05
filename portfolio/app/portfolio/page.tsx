"use client";

import Presentation from "@/components/common/3d/Presentation";
import TimeLine from "@/components/common/TimeLine";
import PassionList from "@/components/common/PassionList";
import Contact from "@/components/common/Contact";
import ProjectList from "@/components/common/ProjectList";

const Page = () => {
  // TODO : Animations lors du premier hover pour chaque section
  // TODO : Rapprocher les sections
  // TODO : Séparer les titres, sous-titres, texte courant (police, taille, éléments, ...)
  // TODO : Ajouter du remplissage (fioritures, éléments 3d, ...)
  // TODO : Not Found

  return (
    <>
      <main className="bg-primary overflow-x-hidden">
        {/* My presentation */}
        <section id="myself" className="relative h-[110vh]">
          <Presentation />
        </section>

        {/* My path */}
        <section
          id="path"
          className="min-h-screen bg-gradient-to-b from-[#C0AE8F] to-primary md:h-[95vh] md:min-h-max md:mb-36"
        >
          <div className="text-xl ml-1 font-medium font-portfolio_satoshi_Bl text-destructive md:ml-3 md:text-5xl">
            To better understand me, here's my path and where I am in life today
          </div>
          <TimeLine></TimeLine>
        </section>

        {/* My passions */}
        <section id="passions" className="min-h-screen mb-28">
          <div className="text-xl ml-1 mb-20 font-medium font-portfolio_satoshi_Bl text-destructive md:ml-3 md:text-5xl">
            And this is what I am passionate about
          </div>
          <PassionList />
        </section>

        {/* My projects */}
        <section id="projects" className="min-h-screen">
          <div className="text-xl mb-12 ml-1 font-medium font-portfolio_satoshi_Bl text-destructive md:ml-3 md:text-5xl md:mb-20">
            Here are my projects
          </div>
          <ProjectList />
        </section>

        {/* My contacts */}
        <section id="contacts" className="h-72 bg-accent">
          <Contact />
        </section>
      </main>
    </>
  );
};

export default Page;
