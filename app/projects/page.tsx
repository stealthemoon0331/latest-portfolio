"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RecentProjects } from "@/components/recent-projects";
import { FloatingNav } from "@/components/ui/floating-nav";
import { navItems } from "@/data";
import { IoArrowBack } from "react-icons/io5";

function ProjectsContent() {
  const searchParams = useSearchParams();
  
  // Get initial values from URL params
  const initialSearch = searchParams.get("q") || "";
  const initialFields = searchParams.get("fields")?.split(",").filter(Boolean) || [];
  const initialSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];

  return (
    <RecentProjects 
      limit={999} 
      showFilters={true} 
      showSearch={true}
      initialSearch={initialSearch}
      initialFields={initialFields}
      initialSkills={initialSkills}
    />
  );
}

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-clip bg-black-100 px-5 sm:px-10">
      {/* Background grid image covering entire page */}
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
          width={1260}
          height={863}
          priority
          quality={75}
          loading="eager"
        />
      </div>

      {/* <FloatingNav navItems={navItems} /> */}

      <div className="w-full max-w-7xl">
        {/* Back to Landing Page Button */}
        <div className="mb-8 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white md:text-base"
          >
            <IoArrowBack className="h-4 w-4 md:h-5 md:w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <Suspense fallback={<div className="py-20"><h1 className="heading"><span className="text-purple">Loading Projects...</span></h1></div>}>
          <ProjectsContent />
        </Suspense>
      </div>
    </main>
  );
}

