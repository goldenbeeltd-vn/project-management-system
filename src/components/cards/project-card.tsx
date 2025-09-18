"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Users, Calendar } from "lucide-react";
import { getStatusColor, formatDate, type Project } from "@/lib/mock-data";
import { getStatusLabel } from "@/lib/project-utils";
import { useProjectData } from "@/hooks/use-project-data";
import { useProjectActions } from "@/hooks/use-project-actions";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  const { client, allTeamMembers, hasHostingInfo } = useProjectData(project);
  const { handleViewProject } = useProjectActions();

  return (
    <Card className="border border-slate-200 bg-white shadow-sm w-full min-w-0">
      <CardHeader className="pb-3 px-4">
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start w-full min-w-0">
          <div className="min-w-0 overflow-hidden">
            <CardTitle className="text-base font-semibold text-slate-900 mb-1 truncate block">
              {project.name}
            </CardTitle>
            {client && (
              <p className="text-sm text-slate-600 truncate block">
                {client.name}
              </p>
            )}
          </div>
          <div className="flex space-x-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewProject(project, onClick)}
              className="size-8 p-0"
            >
              <Eye className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <Edit className="size-4" />
            </Button>
          </div>
        </div>
        {/* Description full width */}
        <div className="mt-2">
          <p className="text-xs text-slate-500 line-clamp-2">
            {project.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        {/* Hiển thị thông tin hosting cho dự án đã hoàn thành, hoặc status/progress cho dự án khác */}
        {hasHostingInfo ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 min-w-0">
              <Badge
                className={`${getStatusColor(
                  project.status
                )} flex-shrink-0 text-xs`}
              >
                {getStatusLabel(project.status)}
              </Badge>
              <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded flex-shrink-0 font-medium">
                {project.hosting?.provider}
              </span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="text-xs text-slate-600 whitespace-nowrap">
                Hết hạn:{" "}
                <span className="font-medium text-orange-600">
                  {project.hosting?.expiryDate
                    ? formatDate(project.hosting.expiryDate)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Badge
              className={`${getStatusColor(
                project.status
              )} flex-shrink-0 text-xs`}
            >
              {getStatusLabel(project.status)}
            </Badge>
            <div className="flex items-center space-x-2 min-w-0">
              <span className="text-xs font-medium text-slate-700 flex-shrink-0">
                {project.progress}%
              </span>
              <Progress
                value={project.progress}
                className="h-1.5 flex-1 min-w-[60px] bg-slate-200"
              />
            </div>
          </div>
        )}

        {/* Team và Timeline */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <Users className="size-4 text-slate-500 flex-shrink-0" />
            <div className="flex -space-x-1">
              {allTeamMembers.slice(0, 2).map((member, idx) => (
                <Avatar key={idx} className="size-6 border-2 border-white">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs bg-slate-500 text-white">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
              {allTeamMembers.length > 2 && (
                <div className="size-6 bg-slate-300 rounded-full flex items-center justify-center text-xs text-slate-700 border-2 border-white">
                  +{allTeamMembers.length - 2}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1 text-xs text-slate-600 flex-shrink-0">
            <Calendar className="size-4" />
            <span className="truncate">{formatDate(project.endDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";
