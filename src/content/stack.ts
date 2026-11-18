/** Tools and languages shown in the Arsenal marquee. */
export type Tech = {
  name: string;
  category: string;
  icon: string;
};

export const TECH_STACK: Tech[] = [
  { name: "TypeScript", category: "Language", icon: "/tech/typescript.svg" },
  { name: "Next.js", category: "Framework", icon: "/tech/nextjs.svg" },
  { name: "React", category: "Library", icon: "/tech/react.svg" },
  { name: "Tailwind CSS", category: "Styling", icon: "/tech/tailwindcss.svg" },
  { name: "Figma", category: "Design", icon: "/tech/figma.svg" },
  { name: "PHP", category: "Backend", icon: "/tech/php.svg" },
  { name: "Laravel", category: "Framework", icon: "/tech/laravel.svg" },
  { name: "Java", category: "Language", icon: "/tech/java.svg" },
  { name: "JavaScript", category: "Language", icon: "/tech/javascript.svg" },
  { name: "HTML5", category: "Frontend", icon: "/tech/html.svg" },
  { name: "CSS3", category: "Styling", icon: "/tech/css.svg" },
  { name: "C++", category: "Systems", icon: "/tech/cpp.svg" },
  { name: "Git", category: "VCS", icon: "/tech/git.svg" },
  { name: "Framer Motion", category: "Animation", icon: "/tech/framermotion.svg" },
];

export const TECH_COUNT = TECH_STACK.length;
