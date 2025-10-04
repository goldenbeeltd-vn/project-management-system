"use client";

import { TabsContent, Tabs } from "@/components/ui/tabs";
import { type Project } from "@/types/projects/project";
import { ProjectDetailHeader } from "@/components/headers/projects/project-detail-header";
import { ProjectTasksTab } from "@/components/tabs/projects/project-tasks-tab";
import { ProjectCalendarTab } from "@/components/tabs/projects/project-calendar-tab";
import { ProjectDocumentsTab } from "@/components/tabs/projects/project-documents-tab";
import { ProjectTeamTab } from "@/components/tabs/projects/project-team-tab";
import { ProjectSettingsTab } from "@/components/tabs/projects/project-settings-tab";
import { ProjectCostsTab } from "@/components/tabs/projects/project-costs-tab";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  // For demo purposes, use mock data with simplified structure
  const demoProject = project;
  return (
    <div className="container mx-auto space-y-6">
      <Tabs defaultValue="tasks" className="w-full">
        <ProjectDetailHeader />

        <div className="mt-4">
          <TabsContent value="tasks" className="space-y-4">
            <ProjectTasksTab />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <ProjectCalendarTab />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <ProjectDocumentsTab />
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <ProjectTeamTab project={demoProject} />
          </TabsContent>

          <TabsContent value="cost" className="space-y-4">
            <ProjectCostsTab />
          </TabsContent>

          <TabsContent value="setting" className="space-y-4">
            <ProjectSettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
