"use client";

import type {
  HomeData,
  AboutType,
  TechStackType,
  ProjectType,
  ExperienceType,
  ContactType,
} from "@/types";
import type { BlogPost } from "@/types";
import { NavBar } from "@/components/organisms/nav-bar";
import { HomeSection } from "@/components/organisms/home-section";
import { AboutSection } from "@/components/organisms/about-section";
import { ProjectsSection } from "@/components/organisms/projects-section";
import { ExperienceSection } from "@/components/organisms/experience-section";
import { ContactSection } from "@/components/organisms/contact-section";
import { LatestBlogsSection } from "@/components/organisms/latest-blogs-section";
import { Footer } from "@/components/organisms/footer-section";

interface PageData {
  home: HomeData;
  about: AboutType;
  techStack: TechStackType[];
  projects: ProjectType[];
  experience: ExperienceType[];
  contact: ContactType;
}

export function PageSections({
  data,
  latestPosts,
}: {
  data: PageData;
  latestPosts?: BlogPost[];
}) {
  const hasBlogs = Boolean(latestPosts && latestPosts.length > 0);

  return (
    <div className="bg-bg relative">
      <NavBar showBlog={hasBlogs} />
      <HomeSection homeData={data.home} />
      <AboutSection about={data.about} techStacks={data.techStack} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection experience={data.experience} />
      <ContactSection contact={data.contact} />
      {hasBlogs && <LatestBlogsSection posts={latestPosts ?? []} />}
      <Footer />
    </div>
  );
}
