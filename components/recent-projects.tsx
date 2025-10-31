"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiThreedotjs, SiFramer } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import { projects } from "@/data";

import { PinContainer } from "./ui/3d-pin";

export const RecentProjects = () => {
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set(["All"]));
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set(["All"]));
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Map icon filenames to broad tech fields
  const iconToField: Record<string, string> = {
    "/re.svg": "Frontend",
    "/next.svg": "Frontend",
    "/tail.svg": "Frontend",
    "/ts.svg": "Frontend",
    "/three.svg": "Frontend",
    "/fm.svg": "Frontend",
    "/stream.svg": "Backend",
    "/c.svg": "Auth",
  };

  const iconToSkill: Record<string, string> = {
    "/re.svg": "React",
    "/next.svg": "Next.js",
    "/tail.svg": "Tailwind CSS",
    "/ts.svg": "TypeScript",
    "/three.svg": "Three.js",
    "/fm.svg": "Framer Motion",
    "/stream.svg": "Stream",
    "/c.svg": "Clerk/Auth",
  };

  const projectWithFields = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        fields: Array.from(
          new Set(
            p.iconLists
              .map((icon) => iconToField[icon])
              .filter(Boolean) as string[]
          )
        ),
        skills: Array.from(
          new Set(
            p.iconLists
              .map((icon) => iconToSkill[icon])
              .filter(Boolean) as string[]
          )
        ),
      })),
    []
  );

  const fields = useMemo(() => {
    const set = new Set<string>(["All", "Mobile", "AI"]);
    projectWithFields.forEach((p) => p.fields.forEach((f) => set.add(f)));
    return Array.from(set);
  }, [projectWithFields]);

  const skills = useMemo(() => {
    const set = new Set<string>(["All"]);
    projectWithFields.forEach((p) => p.skills?.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [projectWithFields]);

  const skillIconMap: Record<string, React.ReactNode> = {
    React: <SiReact className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    "Next.js": <SiNextdotjs className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    "Tailwind CSS": <SiTailwindcss className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    TypeScript: <SiTypescript className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    "Three.js": <SiThreedotjs className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    "Framer Motion": <SiFramer className="h-3.5 w-3.5 md:h-4 md:w-4" />,
    // Stream and Clerk/Auth don't have simple-icons here; will fallback to text
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) => {
      const next = new Set(prev);
      if (field === "All") {
        return new Set(["All"]);
      }
      next.delete("All");
      if (next.has(field)) {
        next.delete(field);
        if (next.size === 0) {
          return new Set(["All"]);
        }
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (skill === "All") {
        return new Set(["All"]);
      }
      next.delete("All");
      if (next.has(skill)) {
        next.delete(skill);
        if (next.size === 0) {
          return new Set(["All"]);
        }
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    return projectWithFields.filter((p) => {
      const fieldOk =
        selectedFields.has("All") ||
        p.fields.some((f) => selectedFields.has(f));
      const skillOk =
        selectedSkills.has("All") ||
        (p.skills && p.skills.some((s) => selectedSkills.has(s)));
      
      const searchOk =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.des.toLowerCase().includes(searchQuery.toLowerCase());
      
      return fieldOk && skillOk && searchOk;
    });
  }, [projectWithFields, selectedFields, selectedSkills, searchQuery]);

  return (
    <section id="projects" className="py-20">
      <h1 className="heading">
        <span className="text-purple">Projects</span>
      </h1>

      {/* Search input */}
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-center px-4">
        <div className="relative w-full max-w-md">
          <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-10 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 md:text-base"
          />
        </div>
      </div>

      {/* Filter bars */}
      <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 px-4">
        {/* Fields */}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-white/60 md:text-sm">Fields</span>
          <div className="flex-1 overflow-x-auto [scrollbar-width:none]">
            <div className="flex gap-2 pr-4">
              {fields.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleField(f)}
                  className={
                    "shrink-0 rounded-md border border-white/10 px-3 py-1 text-xs transition-colors md:text-sm " +
                    (selectedFields.has(f)
                      ? "bg-white/10 text-white"
                      : "bg-black/20 text-white/70 hover:bg-white/5")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-xs text-white/60 md:text-sm">Skills</span>
          <div className="flex-1 overflow-x-auto [scrollbar-width:none]">
            <div className="flex gap-2 pr-4">
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={
                    "shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs transition-colors md:text-sm " +
                    (selectedSkills.has(s)
                      ? "bg-white/10 text-white"
                      : "bg-black/20 text-white/70 hover:bg-white/5")
                  }
                >
                  <span className="flex items-center gap-1.5 md:gap-2">
                    {skillIconMap[s]}
                    <span className="whitespace-nowrap">{s}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-24 gap-y-8 p-4">
        {filtered.map(
          ({ id, des, iconLists, img, link, sourceCode, title, fields }) => (
            <div
              key={id}
              className="flex h-[32rem] w-[90vw] items-center justify-center sm:h-[41rem] sm:w-[570px] lg:min-h-[32.5rem]"
            >
              <PinContainer title="Visit" href={link}>
                <div className="relative mb-10 flex h-[30vh] w-[80vw] items-center justify-center overflow-hidden sm:h-[40vh] sm:w-[570px]">
                  <div className="relative h-full w-full overflow-hidden bg-[#13162d] lg:rounded-3xl">
                    <Image
                      height={330}
                      width={552}
                      src="/bg.png"
                      alt="bg-img"
                    />
                  </div>

                  <Image
                    height={300}
                    width={464}
                    src={img}
                    alt={title}
                    className="absolute bottom-0 z-10"
                  />
                </div>

                <h1 className="line-clamp-1 text-base font-bold md:text-xl lg:text-2xl">
                  {title}
                </h1>

                {fields && fields.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {fields.map((tag) => (
                      <span
                        key={`${id}-${tag}`}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/80 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="line-clamp-2 text-sm font-light lg:text-xl lg:font-normal">
                  {des}
                </p>

                <div className="mb-3 mt-7 flex items-center justify-between">
                  <div className="flex items-center">
                    {iconLists.map((icon, i) => (
                      <div
                        key={icon}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-10 lg:w-10"
                        style={{
                          transform: `translateX(-${5 * i * 2}px)`,
                        }}
                      >
                        <Image
                          height={40}
                          width={40}
                          src={icon}
                          alt={icon}
                          className="p-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <Link
                      href={sourceCode}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex text-sm text-purple md:text-xs lg:text-xl"
                    >
                      Source Code
                    </Link>

                    <FaLocationArrow className="ms-3" color="#cbacf9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          )
        )}
      </div>
    </section>
  );
};
