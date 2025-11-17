import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// This would fetch from Sanity
// For now, returning not found
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Blog Post Not Found",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // This would fetch from Sanity
  // For now, showing not found
  notFound();
}

