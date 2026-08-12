import React from "react";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
