import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/apps/LegalPage";
import { APPS, getApp } from "@/data/apps";

// Required pair: without `dynamicParams = false`, next-on-pages classifies the dynamic
// fallback as an invalid function and fails the build. See app/apps/[slug]/page.tsx.
export const dynamicParams = false;
export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return { title: "Not found" };
  return {
    title: `Privacy Policy — ${app.name}`,
    description: `The privacy policy for ${app.name} (${app.packageId}), an Android app by Cybiqon AI Solutions.`,
    alternates: { canonical: `/apps/${app.slug}/privacy` },
  };
}

export default async function Page({ params }: Props) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  return <LegalPage app={app} kind="privacy" />;
}
