import Image from "next/image";

import { Approach } from "@/components/approach";
import { Clients } from "@/components/clients";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Grid } from "@/components/grid";
import { Hero } from "@/components/hero";
import { FloatingNav } from "@/components/ui/floating-nav";
import { RecentProjects } from "@/components/recent-projects";
import { navItems } from "@/data";

const MainPage = () => {
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
        />
      </div>

      <FloatingNav navItems={navItems} />

      <div className="w-full max-w-7xl">
        <Hero />
        <Grid />
        <Experience />
        <RecentProjects />
        {/* <Clients /> */}
        {/* <Approach /> */}
        {/* <Footer /> */}
      </div>
    </main>
  );
};

export default MainPage;
