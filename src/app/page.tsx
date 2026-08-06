import { getAllPageData } from "@/lib/strapi";
import { PageSections } from "./page-sections";
import { ErrorSections } from "./error-sections";

// Regenerate every hour
export const revalidate = 3600;

export default async function Page() {
  try {
    const data = await getAllPageData();
    return <PageSections data={data} />;
  } catch {
    return <ErrorSections />;
  }
}
