"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { ReactNode, useEffect, useState } from "react";

const NavigationLink = ({
  href,
  label,
  face,
  diceIcon,
}: {
  href: string;
  label: string;
  face: number;
  diceIcon: ReactNode;
}) => {
  // Get current pathname
  const pathname = usePathname();

  // Get the hash
  const params = useParams();
  const [hash, setHash] = useState<string>(window.location.hash);

  // Update hash when hash changes in the URL
  useEffect(() => {
    setHash(window.location.hash.replace("#", ""));
  }, [params]);

  return (
    <>
      {face == 5 && <Separator className="bg-accent" />}
      <Link
        href={href}
        className={cn(
          "flex flex-row items-center hover:text-accent",
          pathname == href || hash == href.split("#")[1] ? "font-semibold" : ""
        )}
      >
        {label}
        {(pathname == href || hash == href.split("#")[1]) && diceIcon}
      </Link>
    </>
  );
};

export default NavigationLink;
