"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiThreedotjs, 
  SiFramer,
  SiStripe,
  SiFastapi,
  SiOpenai,
  SiMongodb,
} from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import { projects } from "@/data";

import { PinContainer } from "./ui/3d-pin";
import { MagicButton } from "./ui/magic-button";

type RecentProjectsProps = {
  limit?: number;
  showFilters?: boolean;
  showSearch?: boolean;
  initialSearch?: string;
  initialFields?: string[];
  initialSkills?: string[];
};

// Helper function to check if image is SVG
const isSvgImage = (src: string): boolean => {
  return src.toLowerCase().endsWith('.svg') || src.toLowerCase().includes('.svg');
};

export const RecentProjects = ({ 
  limit = 4, 
  showFilters = false, 
  showSearch = false,
  initialSearch = "",
  initialFields = [],
  initialSkills = []
}: RecentProjectsProps) => {
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState<Set<string>>(
    new Set(initialFields.length > 0 ? initialFields : ["All"])
  );
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    new Set(initialSkills.length > 0 ? initialSkills : ["All"])
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  
  // Refs for scrollable containers
  const fieldsScrollRef = useRef<HTMLDivElement>(null);
  const skillsScrollRef = useRef<HTMLDivElement>(null);
  
  // State for drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentScrollRef, setCurrentScrollRef] = useState<HTMLDivElement | null>(null);

  // Map skill names to tech fields
  const skillToField: Record<string, string> = {
    "React": "Frontend",
    "Next.js": "Frontend",
    "Tailwind CSS": "Frontend",
    "TypeScript": "Frontend",
    "Three.js": "Frontend",
    "Framer Motion": "Frontend",
    "GSAP": "Frontend",
    "Stream": "Backend",
    "Clerk": "Auth",
    "Stripe": "Frontend",
    "FastAPI": "Backend",
    "OpenAI": "Backend",
    "MongoDB": "Backend",
  };

  const projectWithFields = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        fields: Array.from(
          new Set(
            (p.skills || [])
              .map((skill) => skillToField[skill])
              .filter(Boolean) as string[]
          )
        ),
        // Use skills directly from project data
        skills: p.skills || [],
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

  // Icon component mapping for skill names
  const skillIconMap: Record<string, React.ReactNode> = {
    React: <SiReact className="h-4 w-4 md:h-5 md:w-5 text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="h-4 w-4 md:h-5 md:w-5 text-gray-100" />,
    "Tailwind CSS": <SiTailwindcss className="h-4 w-4 md:h-5 md:w-5 text-[#38B2AC]" />,
    TypeScript: <SiTypescript className="h-4 w-4 md:h-5 md:w-5 text-[#3178C6]" />,
    "Three.js": <SiThreedotjs className="h-4 w-4 md:h-5 md:w-5 text-white" />,
    "Framer Motion": <SiFramer className="h-4 w-4 md:h-5 md:w-5 text-[#0055FF]" />,
    Stream: <SiReact className="h-4 w-4 md:h-5 md:w-5 text-[#FF5844]" />, // Using React icon as placeholder for Stream
    Clerk: <SiReact className="h-4 w-4 md:h-5 md:w-5 text-[#4D4D4D]" />, // Using React icon as placeholder for Clerk
    GSAP: <SiFramer className="h-4 w-4 md:h-5 md:w-5 text-[#88CE02]" />, // Using Framer icon as placeholder for GSAP
    Stripe: <SiStripe className="h-4 w-4 md:h-5 md:w-5 text-[#635BFF]" />,
    FastAPI: <SiFastapi className="h-4 w-4 md:h-5 md:w-5 text-[#009688]" />,
    OpenAI: <SiOpenai className="h-4 w-4 md:h-5 md:w-5 text-white" />,
    MongoDB: <SiMongodb className="h-4 w-4 md:h-5 md:w-5 text-[#47A248]" />,
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

  // Drag handlers for horizontal scrolling
  const [dragStartX, setDragStartX] = useState(0);
  const [isClickAllowed, setIsClickAllowed] = useState(true);

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const startPos = e.pageX - ref.current.offsetLeft;
    const currentScroll = ref.current.scrollLeft;
    setDragStartX(e.pageX);
    setStartX(startPos);
    setScrollLeft(currentScroll);
    setCurrentScrollRef(ref.current);
    setIsClickAllowed(true);
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = 'none';
  };

  // Handle mouse move on document level for better dragging
  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!currentScrollRef || !isDragging) return;
      
      const deltaX = Math.abs(e.pageX - dragStartX);
      if (deltaX > 5) {
        setIsClickAllowed(false);
      }
      
      const x = e.pageX - currentScrollRef.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      currentScrollRef.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpGlobal = () => {
      if (currentScrollRef) {
        currentScrollRef.style.cursor = 'grab';
        currentScrollRef.style.userSelect = '';
      }
      setIsDragging(false);
      setCurrentScrollRef(null);
      setTimeout(() => setIsClickAllowed(true), 100);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, currentScrollRef, startX, scrollLeft, dragStartX]);

  const handleMouseDownStart = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    handleMouseDown(e, ref);
    setIsDragging(true);
  };

  const handleMouseLeave = () => {
    if (currentScrollRef) {
      currentScrollRef.style.cursor = 'grab';
      currentScrollRef.style.userSelect = '';
    }
    setIsDragging(false);
    setCurrentScrollRef(null);
  };

  // Touch handlers for mobile swipe
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    setCurrentScrollRef(ref.current);
    const touchStartX = e.touches[0].pageX - ref.current.offsetLeft;
    touchStartXRef.current = e.touches[0].pageX;
    setStartX(touchStartX);
    touchScrollLeftRef.current = ref.current.scrollLeft;
    setScrollLeft(ref.current.scrollLeft);
    setIsClickAllowed(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!currentScrollRef) return;
    const deltaX = Math.abs(e.touches[0].pageX - touchStartXRef.current);
    if (deltaX > 5) {
      setIsClickAllowed(false);
      e.preventDefault();
    }
    const x = e.touches[0].pageX - currentScrollRef.offsetLeft;
    const walk = (x - startX) * 2;
    currentScrollRef.scrollLeft = touchScrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    setCurrentScrollRef(null);
    setTimeout(() => setIsClickAllowed(true), 100);
  };

  const filtered = useMemo(() => {
    const filteredProjects = projectWithFields.filter((p) => {
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
    
    return filteredProjects.slice(0, limit);
  }, [projectWithFields, selectedFields, selectedSkills, searchQuery, limit]);

  // Handle search change - redirect to /projects if on main page, update URL if on projects page
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!showSearch && !showFilters && value.trim() !== "") {
      // On main page - redirect to projects page
      const params = new URLSearchParams();
      params.set("q", value);
      router.push(`/projects?${params.toString()}`);
    } else if (showSearch) {
      // On projects page - update URL params
      const params = new URLSearchParams(window.location.search);
      if (value.trim()) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/projects?${params.toString()}`);
    }
  };

  const handleFieldToggle = (field: string) => {
    // Calculate next state before updating
    const next = new Set(selectedFields);
    if (field === "All") {
      setSelectedFields(new Set(["All"]));
      if (!showFilters && !showSearch) {
        // On main page, redirect to projects with no fields filter
        router.push("/projects");
      } else if (showFilters) {
        // On projects page, update URL
        const params = new URLSearchParams(window.location.search);
        params.delete("fields");
        router.push(`/projects?${params.toString()}`);
      }
      return;
    }
    
    next.delete("All");
    if (next.has(field)) {
      next.delete(field);
    } else {
      next.add(field);
    }
    
    // Update state
    setSelectedFields(next.size === 0 ? new Set(["All"]) : next);
    
    if (!showFilters && !showSearch && next.size > 0) {
      // On main page - redirect to projects page
      const params = new URLSearchParams();
      params.set("fields", Array.from(next).join(","));
      router.push(`/projects?${params.toString()}`);
    } else if (showFilters) {
      // On projects page - update URL params
      const params = new URLSearchParams(window.location.search);
      if (next.size > 0) {
        params.set("fields", Array.from(next).join(","));
      } else {
        params.delete("fields");
      }
      router.push(`/projects?${params.toString()}`);
    }
  };

  const handleSkillToggle = (skill: string) => {
    // Calculate next state before updating
    const next = new Set(selectedSkills);
    if (skill === "All") {
      setSelectedSkills(new Set(["All"]));
      if (!showFilters && !showSearch) {
        // On main page, redirect to projects with no skills filter
        router.push("/projects");
      } else if (showFilters) {
        // On projects page, update URL
        const params = new URLSearchParams(window.location.search);
        params.delete("skills");
        router.push(`/projects?${params.toString()}`);
      }
      return;
    }
    
    next.delete("All");
    if (next.has(skill)) {
      next.delete(skill);
    } else {
      next.add(skill);
    }
    
    // Update state
    setSelectedSkills(next.size === 0 ? new Set(["All"]) : next);
    
    if (!showFilters && !showSearch && next.size > 0) {
      // On main page - redirect to projects page
      const params = new URLSearchParams();
      params.set("skills", Array.from(next).join(","));
      router.push(`/projects?${params.toString()}`);
    } else if (showFilters) {
      // On projects page - update URL params
      const params = new URLSearchParams(window.location.search);
      if (next.size > 0) {
        params.set("skills", Array.from(next).join(","));
      } else {
        params.delete("skills");
      }
      router.push(`/projects?${params.toString()}`);
    }
  };

  return (
    <section id="projects" className="py-20">
      <h1 className="heading">
        <span className="text-purple">{showFilters || showSearch ? "All Projects" : "Recent Projects"}</span>
      </h1>

      {/* Search input */}
      {showSearch && (
        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-10 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 md:text-base"
            />
          </div>
        </div>
      )}

      {/* Filter bars */}
      {showFilters && (
        <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 px-4">
          {/* Fields */}
          <div className="flex items-center gap-2">
            <div
              ref={fieldsScrollRef}
              className="flex-1 overflow-x-auto [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onMouseDown={(e) => handleMouseDownStart(e, fieldsScrollRef)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => handleTouchStart(e, fieldsScrollRef)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex gap-2 pr-4">
                {fields.map((f) => (
                  <button
                    key={f}
                    onClick={(e) => {
                      if (!isClickAllowed) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      showFilters ? toggleField(f) : handleFieldToggle(f);
                    }}
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
          <hr/>
          {/* Skills */}
          <div className="flex items-center gap-2">
            <div
              ref={skillsScrollRef}
              className="flex-1 overflow-x-auto [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onMouseDown={(e) => handleMouseDownStart(e, skillsScrollRef)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => handleTouchStart(e, skillsScrollRef)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex gap-2 pr-4">
                {skills.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      if (!isClickAllowed) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      showFilters ? toggleSkill(s) : handleSkillToggle(s);
                    }}
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
      )}

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
                      loading="lazy"
                      quality={75}
                    />
                  </div>

                  <Image
                    height={300}
                    width={464}
                    src={img}
                    alt={title}
                    className="absolute bottom-0 z-10"
                    loading="lazy"
                    quality={isSvgImage(img) ? undefined : 80}
                    unoptimized={isSvgImage(img)}
                    style={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      height: 'auto',
                    }}
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
                    {iconLists.map((skill, i) => (
                      <div
                        key={`${id}-${skill}-${i}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-10 lg:w-10"
                        style={{
                          transform: `translateX(-${5 * i * 2}px)`,
                        }}
                        title={skill}
                      >
                        {skillIconMap[skill] || (
                          <span className="text-[10px] text-white/70">{skill.charAt(0)}</span>
                        )}
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

      {/* See More button - only show on main page */}
      {!showFilters && !showSearch && filtered.length >= limit && (
        <div className="mt-12 flex justify-center">
          <Link href="/projects">
            <MagicButton
              title="See more projects"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>
      )}
    </section>
  );
};
