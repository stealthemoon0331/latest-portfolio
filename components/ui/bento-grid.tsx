"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiVuedotjs, SiAmazonaws, SiMongodb, SiPython, SiNodedotjs, SiExpress, SiPrisma, SiPostgresql, SiMysql, SiRedis, SiGit, SiDocker, SiVite, SiWebpack, SiJest, SiTensorflow } from "react-icons/si";
import { IoCopyOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

import { links } from "@/config";
import { techStack } from "@/data";
import { cn } from "@/lib/utils";

import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { MagicButton } from "./magic-button";

import { GridGlobe } from "../grid-globe";

const BentoGridLottie = dynamic(() => import("./bento-grid-lottie"), {
  ssr: false,
});

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  id?: number;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [skillCategory, setSkillCategory] = useState<string>("All");

  const handleCopy = () => {
    navigator.clipboard.writeText(links.ownerEmail);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;

    const copyTimeout = setTimeout(() => {
      setCopied(false);
    }, 3500);

    return () => clearTimeout(copyTimeout);
  }, [copied]);

  // Define skill categories for the tech stack card (id === 3)
  const SKILL_CATEGORIES: Record<string, readonly string[]> = {
    All: [
      ...techStack.stack1,
      ...techStack.stack2,
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Git",
      "Docker",
      "Vite",
      "Webpack",
      "Jest",
      "TensorFlow",
    ],
    Frontend: ["React.js", "Next.js", "Typescript", "JavaScript", "Vue.js"],
    Backend: ["Node.js", "Express", "Prisma"],
    Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    AI: ["Python", "TensorFlow"],
    "Dev Tools": ["Git", "Docker", "Vite", "Webpack", "Jest", "AWS"],
  } as const;

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-3xl border border-white/[0.1] shadow-input transition duration-200 hover:shadow-xl dark:shadow-none",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={cn("h-full", id === 6 && "flex justify-center")}>
        <div className="absolute h-full w-full">
          {img && (
            <Image
              width={689}
              height={541}
              src={img}
              alt={img}
              className={cn("object-cover object-center", imgClassName)}
              loading="lazy"
              quality={80}
            />
          )}
        </div>

        <div
          className={cn(
            "absolute right-0 -mb-5",
            id === 5 && "w-full opacity-80"
          )}
        >
          {spareImg && (
            <Image
              width={208}
              height={96}
              src={spareImg}
              alt={spareImg}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              quality={75}
            />
          )}
        </div>

        {id === 6 && <BackgroundGradientAnimation />}

        <div
          className={cn(
            "relative flex flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 lg:p-10",
            id === 3 ? "" : "min-h-40 md:h-full",
            titleClassName
          )}
        >
          {id !== 3 && (
            <div className="z-10 font-sans text-sm font-extralight text-[#c1c2d3] md:text-xs lg:text-base">
              {description}
            </div>
          )}

          {id !== 3 && (
            <div className="z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl">
              {title}
            </div>
          )}

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex w-full flex-col justify-start px-2 py-2 lg:px-4 lg:py-3">
              {/* Header with current category */}
              <div className="mb-2 flex items-center gap-2">
                <h3 className="shrink-0 text-sm font-semibold text-white/80 lg:text-base">
                  {skillCategory}
                </h3>
                {/* Category buttons */}
                <div className="ml-1 flex-1 overflow-x-auto [scrollbar-width:none]">
                  <div className="flex gap-1 pr-3 text-xs lg:gap-2 lg:text-sm">
                    {Object.keys(SKILL_CATEGORIES).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSkillCategory(cat)}
                        className={cn(
                          "shrink-0 whitespace-nowrap rounded-md border border-white/10 px-2 py-1 transition-colors",
                          skillCategory === cat
                            ? "bg-white/10 text-white"
                            : "bg-black/20 text-white/60 hover:bg-white/5"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid w-full grid-cols-2 gap-2 overflow-auto [scrollbar-width:thin] md:grid-cols-3 lg:gap-3">
                {SKILL_CATEGORIES[skillCategory].map((name) => (
                  <SkillItem key={`${skillCategory}-${name}`} name={name} />
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="group relative mt-5">
              <BentoGridLottie copied={copied} />

              <MagicButton
                title={copied ? "Email copied!" : "Copy my email"}
                icon={<IoCopyOutline />}
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
                asChild
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Removed animated columns in favor of a static grid showing all items

const SKILL_ICON_MAP: Record<string, React.ReactNode> = {
  "React.js": <SiReact className="h-4 w-4 text-[#61DAFB] lg:h-5 lg:w-5" />,
  "Next.js": <SiNextdotjs className="h-4 w-4 text-black dark:text-white lg:h-5 lg:w-5" />,
  Typescript: <SiTypescript className="h-4 w-4 text-[#3178C6] lg:h-5 lg:w-5" />,
  JavaScript: <SiJavascript className="h-4 w-4 text-[#F7DF1E] lg:h-5 lg:w-5" />,
  "Vue.js": <SiVuedotjs className="h-4 w-4 text-[#41B883] lg:h-5 lg:w-5" />,
  AWS: <SiAmazonaws className="h-4 w-4 text-[#FF9900] lg:h-5 lg:w-5" />,
  MongoDB: <SiMongodb className="h-4 w-4 text-[#47A248] lg:h-5 lg:w-5" />,
  Python: <SiPython className="h-4 w-4 text-[#3776AB] lg:h-5 lg:w-5" />,
  "Node.js": <SiNodedotjs className="h-4 w-4 text-[#339933] lg:h-5 lg:w-5" />,
  Express: <SiExpress className="h-4 w-4 text-[#6D6D6D] lg:h-5 lg:w-5" />,
  Prisma: <SiPrisma className="h-4 w-4 text-[#2D3748] lg:h-5 lg:w-5" />,
  PostgreSQL: <SiPostgresql className="h-4 w-4 text-[#336791] lg:h-5 lg:w-5" />,
  MySQL: <SiMysql className="h-4 w-4 text-[#4479A1] lg:h-5 lg:w-5" />,
  Redis: <SiRedis className="h-4 w-4 text-[#DC382D] lg:h-5 lg:w-5" />,
  Git: <SiGit className="h-4 w-4 text-[#F05032] lg:h-5 lg:w-5" />,
  Docker: <SiDocker className="h-4 w-4 text-[#2496ED] lg:h-5 lg:w-5" />,
  Vite: <SiVite className="h-4 w-4 text-[#646CFF] lg:h-5 lg:w-5" />,
  Webpack: <SiWebpack className="h-4 w-4 text-[#8DD6F9] lg:h-5 lg:w-5" />,
  Jest: <SiJest className="h-4 w-4 text-[#C21325] lg:h-5 lg:w-5" />,
  TensorFlow: <SiTensorflow className="h-4 w-4 text-[#FF6F00] lg:h-5 lg:w-5" />,
};

const SkillItem = ({ name }: { name: string }) => {
  const icon = SKILL_ICON_MAP[name];

  return (
    <span
      title={name}
      className="flex items-center justify-start gap-2 rounded-lg bg-[#10132e] px-3 py-2 text-left text-xs text-white/80 lg:gap-3 lg:px-3 lg:py-3 lg:text-sm"
    >
      {icon}
      <span className="truncate">{name}</span>
    </span>
  );
};
