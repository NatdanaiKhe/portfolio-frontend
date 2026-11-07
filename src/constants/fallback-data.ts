import type { AppData } from "@/types";

export const FALLBACK_APP_DATA: AppData = {
  home: {
    id: 1,
    documentId: "fallback-home",
    available_status: true,
    profile_image: {
      url: "",
      formats: {},
    },
    hero_text:
      "Natdanai Khemthong builds clean, responsive, high-performance web interfaces and end-to-end solutions. View selected projects and experience.",
    role: "Full-Stack\nDeveloper",
  },
  about: {
    id: 1,
    background:
      "Software engineer focused on crafting accessible, performance-driven web and mobile interfaces with clean code and modern tooling. Experienced in architecting end-to-end full-stack applications with React, Next.js, TypeScript, and cloud services.",
    experience:
      "4+ years building high-impact web and mobile products across agency and engineering teams.",
    education: "B.Sc. in Computer Science",
  },
  techStack: [
    {
      name: "React",
      proficiency_level: "Advanced",
      tech_image: { name: "react", url: "" },
    },
    {
      name: "Next.js",
      proficiency_level: "Advanced",
      tech_image: { name: "nextjs", url: "" },
    },
    {
      name: "TypeScript",
      proficiency_level: "Advanced",
      tech_image: { name: "typescript", url: "" },
    },
    {
      name: "Tailwind CSS",
      proficiency_level: "Advanced",
      tech_image: { name: "tailwind", url: "" },
    },
    {
      name: "Node.js",
      proficiency_level: "Intermediate",
      tech_image: { name: "nodejs", url: "" },
    },
    {
      name: "PostgreSQL",
      proficiency_level: "Intermediate",
      tech_image: { name: "postgresql", url: "" },
    },
    {
      name: "Docker",
      proficiency_level: "Intermediate",
      tech_image: { name: "docker", url: "" },
    },
    {
      name: "Git",
      proficiency_level: "Advanced",
      tech_image: { name: "git", url: "" },
    },
  ],
  projects: [
    {
      name: "Developer Portfolio & Blog",
      description:
        "Modern, high-performance portfolio and blog platform built with Next.js 15 App Router, React 19, Motion, and Tailwind CSS v4, connected to a headless CMS.",
      repository: "https://github.com/NatdanaiKhe/portfolio",
      demo: "https://natdanai.dev",
      preview_image: {
        name: "portfolio-preview",
        url: "",
      },
      stacks: [
        { id: 1, name: "Next.js" },
        { id: 2, name: "TypeScript" },
        { id: 3, name: "Tailwind CSS" },
        { id: 4, name: "React" },
      ],
    },
  ],
  experience: [
    {
      exp_id: 3,
      company: "MTEL Thailand",
      title: "Full-Stack Developer",
      startDate: "2023",
      endDate: "Present",
      detail:
        "Architected scalable web and mobile frontend applications.\nCollaborated cross-functionally with UI/UX designers and backend engineers to ship enterprise-grade digital solutions.\nOptimized Core Web Vitals and client bundle size for high-traffic client portals.",
      company_icon: null,
    },
    {
      exp_id: 2,
      company: "Brilliant & Million",
      title: "Frontend Developer",
      startDate: "2022",
      endDate: "2023",
      detail:
        "Engineered responsive interactive web campaigns and client microsites with React and modern CSS.\nDelivered high-performance animated UI components and integrated RESTful APIs.",
      company_icon: null,
    },
    {
      exp_id: 1,
      company: "Ai9 Co., Ltd",
      title: "Software Engineer",
      startDate: "2021",
      endDate: "2022",
      detail:
        "Developed full-stack web solutions and internal tooling using JavaScript, Node.js, and SQL databases.\nMaintained and optimized codebases with automated CI/CD and unit testing.",
      company_icon: null,
    },
  ],
  contact: {
    email: "natdanai.khemthong@gmail.com",
    location: "Bangkok, Thailand",
    socials: [
      {
        id: 1,
        name: "GitHub",
        link: "https://github.com/NatdanaiKhe",
        icon: { name: "github", url: "" },
      },
      {
        id: 2,
        name: "LinkedIn",
        link: "https://linkedin.com/in/natdanai-khemthong",
        icon: { name: "linkedin", url: "" },
      },
    ],
  },
};
