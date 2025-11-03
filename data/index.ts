import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  // { name: "Testimonials", link: "#testimonials" },
  // { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "FigPro - Collaborative Design Tool",
    des: "A collaborative design tool with real-time collaboration, vector editing, and a responsive UI.",
    img: "/p1.svg",
    skills: ["React", "Tailwind CSS", "TypeScript", "Three.js", "Framer Motion"],
    iconLists: ["React", "Tailwind CSS", "TypeScript", "Three.js", "Framer Motion"],
    link: "https://clone-figmaa.netlify.app",
    sourceCode: "https://github.com/stealthemoon0331/figma-clone",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Stream", "Clerk"],
    iconLists: ["Next.js", "Tailwind CSS", "TypeScript", "Stream", "Clerk"],
    link: "https://clone-yoom.netlify.app",
    sourceCode: "https://github.com/stealthemoon0331/zoom-clone",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    skills: ["React", "Tailwind CSS", "TypeScript", "Three.js", "Clerk"],
    iconLists: ["React", "Tailwind CSS", "TypeScript", "Three.js", "Clerk"],
    link: "https://ai-imaginify.netlify.app",
    sourceCode: "https://github.com/stealthemoon0331/imaginify",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    iconLists: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    link: "https://app-iphone.netlify.app",
    sourceCode: "https://github.com/stealthemoon0331/apple-clone",
  },
  {
    id: 5,
    title: "Novmuser AI -  AI writing companion platform",
    des: "AI writing companion platform that helps authors design, generate, and structure novels with the assistance of AI agents and collaborative feedback mechanisms.",
    img: "/novmuserai.png",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "Clerk", "Stripe", "FastAPI", "OpenAI", "MongoDB"],
    iconLists: ["Next.js", "Tailwind CSS", "TypeScript", "Clerk", "Stripe", "FastAPI", "OpenAI", "MongoDB"],
    link: "https://novmuserai.com",
    sourceCode: "https://github.com/stealthemoon0331/novmuserai",
  },
  {
    id: 6,
    title: "Shiper - AI-driven logistics platform",
    des: " AI-driven logistics platform offering route optimization, shipment tracking, and predictive delivery times for e-commerce and freight operations.",
    img: "/p3.svg",
    skills: ["React", "Tailwind CSS", "TypeScript", "Clerk", "Next.js"],
    iconLists: ["React", "Tailwind CSS", "TypeScript", "Clerk", "Next.js"],
    link: "https://shiper.io",
    sourceCode: "https://github.com/stealthemoon0331/timexpress-account-software",
  },
  // {
  //   id: 7,
  //   title: "EcoTrack - Mobile Carbon Footprint Tracker",
  //   des: "A mobile-first application for tracking carbon footprint with gamification, social sharing, and personalized sustainability recommendations.",
  //   img: "/p2.svg",
  //   skills: ["React", "Tailwind CSS", "TypeScript", "Clerk", "Next.js"],
  //   iconLists: ["React", "Tailwind CSS", "TypeScript", "Clerk", "Next.js"],
  //   link: "https://ecotrack-mobile.netlify.app",
  //   sourceCode: "https://github.com/stealthemoon0331/ecotrack",
  // },
  // {
  //   id: 8,
  //   title: "BlockChain Explorer - Real-time Analytics",
  //   des: "A real-time blockchain explorer with transaction visualization, smart contract analysis, and comprehensive network statistics dashboard.",
  //   img: "/p4.svg",
  //   skills: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Clerk"],
  //   iconLists: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Clerk"],
  //   link: "https://blockchain-explorer-demo.netlify.app",
  //   sourceCode: "https://github.com/stealthemoon0331/blockchain-explorer",
  // },
  // {
  //   id: 9,
  //   title: "CloudSync - File Storage & Collaboration",
  //   des: "A cloud storage platform with real-time file synchronization, version control, collaborative editing, and advanced sharing permissions.",
  //   img: "/p1.svg",
  //   skills: ["Next.js", "Tailwind CSS", "TypeScript", "Clerk", "Stream"],
  //   iconLists: ["Next.js", "Tailwind CSS", "TypeScript", "Clerk", "Stream"],
  //   link: "https://cloudsync-demo.netlify.app",
  //   sourceCode: "https://github.com/stealthemoon0331/cloudsync",
  // },
] as const;

export const testimonials = [
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote: `Collaborating with ${links.ownerName} was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. ${links.ownerName}'s enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, ${links.ownerName} is the ideal partner.`,
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
] as const;

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
] as const;

export const workExperience = [
  {
    id: 1,
    title: " Junior Full-Stack and ML Engineer / Intern - JustSystems XMetal",
    desc: "Contributed to full-stack features and ML prototypes, improving UI interactivity and code quality.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: " Mid-Level Full-Stack and ML Engineer - Cybozu, Inc",
    desc: "Delivered end-to-end features across frontend, backend, and ML; built scalable APIs and model services.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: " Senior Full-Stack & AI Engineer - TechFlow Solutions",
    desc: "Led architecture and delivery of AI‑powered web apps; mentored engineers and improved DX.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Freelancer",
    desc: "Built full‑stack solutions for clients—from requirements and UX to deployment and support.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },  
] as const;

export const socialMedia = [
  {
    name: "GitHub",
    img: "/git.svg",
    link: "https://github.com/stealthemoon0331",
  },
  {
    name: "Twitter",
    img: "/twit.svg",
    link: "https://twitter.com/stealthemoon031",
  },
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/sanidhyy",
  },
] as const;

export const techStack = {
  stack1: ["React.js", "Next.js", "Typescript","JavaScript"],
  stack2: ["Vue.js", "AWS", "MongoDB","Python"],
} as const;
