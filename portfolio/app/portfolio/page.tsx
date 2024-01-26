import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <main className="bg-primary">
        {/* Ma présentation */}
        <section id="myself" className="min-h-screen">
          <div>Hi ! My name is Bruno Alexandre Da Cruz Costa</div>
          <div>
            I&apos;m a game/web fullstack/desktop developer based in Switzerland
          </div>
        </section>

        {/* Mon parcours */}
        <section id="path" className="min-h-screen">
          <div>Sup 2</div>
          <div>Sup 2</div>
        </section>

        {/* Mes passions */}
        <section id="passions" className="min-h-screen">
          <div>Sup 3</div>
          <div>Sup 3</div>
        </section>

        {/* Mes projets */}
        <section id="projects" className="min-h-screen">
          <div>Sup 4</div>
          <div>Sup 4</div>
        </section>

        {/* Mes contacts */}
        <section id="contacts" className="h-72 bg-accent">
          <div className="flex flex-col justify-center items-center gap-10 md:gap-8">
            <div className="w-full p-3 text-destructive">
              <div className="text-3xl p-2">Contacts</div>
              <div className="px-2">
                Do you want to ask any question or work with me ? Feel free to
                contact me.
              </div>
            </div>
            <div className="flex flex-row gap-4 md:gap-14 justify-center items-center text-destructive">
              <div>
                <Link
                  className={cn(
                    "md:h-20 md:text-lg text-destructive",
                    buttonVariants({ variant: "secondary" })
                  )}
                  href="mailto:bruno@dacruzcosta.ch"
                >
                  Write me an email !
                </Link>
              </div>
              <div className="text-xl">or</div>
              <div className="flex flex-row gap-4">
                <Link href="https://github.com/Psemata">
                  <Github className="md:h-10 md:w-10 hover:text-secondary" />
                </Link>
                <Link href="https://www.linkedin.com/in/bruno-alexandre-da-cruz-costa-5547672b0/">
                  <Linkedin className="md:h-10 md:w-10 hover:text-secondary" />
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm">
                Designed & built by{" "}
                <Link
                  href="https://github.com/Psemata"
                  className="hover:underline"
                >
                  Bruno Alexandre Da Cruz Costa
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
