import { cn } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 md:gap-8">
      <div className="w-full p-3">
        <div className="text-3xl p-2">Contacts</div>
        <div className="px-2">
          Do you want to ask any question or work with me ? Feel free to contact
          me.
        </div>
      </div>
      <div className="flex flex-row gap-4 md:gap-14 justify-center items-center">
        <div>
          <Link
            className={cn(
              "shadow-lg border-none md:h-20 md:text-lg",
              buttonVariants({ variant: "outline" })
            )}
            href="mailto:bruno@dacruzcosta.ch"
          >
            Write me an email !
          </Link>
        </div>
        <div className="relative flex flex-col justify-center items-center w-16 h-4 text-center text-xl font-bold">
          <span className="z-50 bg-secondary p-2">or</span>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-foreground z-0"></div>
        </div>
        <div className="flex flex-row gap-4">
          <Link href="https://github.com/Psemata" target="_blank">
            <Github className="md:h-10 md:w-10 hover:text-background" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/bruno-alexandre-da-cruz-costa-5547672b0/"
            target="_blank"
          >
            <Linkedin className="md:h-10 md:w-10 hover:text-background" />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-xs md:text-sm">
          Designed & built by{" "}
          <Link href="https://github.com/Psemata" className="hover:underline">
            Bruno Alexandre Da Cruz Costa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
