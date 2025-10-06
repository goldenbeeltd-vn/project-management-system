"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, Edit, Users, Calendar } from "lucide-react";
import { getStatusColor, formatDate, type Project } from "@/lib/mock-data";
import { getStatusLabel } from "@/lib/project-utils";
import { useProjectData } from "@/hooks/projects/use-project-data";
import { useProjectActions } from "@/hooks/projects/use-project-actions";
import { useModal } from "@/hooks/projects/use-modal";
import { ProjectDetailModal } from "@/components/modals/projects/project-detail-modal";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard = memo(({ project, onClick }: ProjectCardProps) => {
  const { client, allTeamMembers, hasHostingInfo } = useProjectData(project);
  const { handleViewProject } = useProjectActions();
  const {
    isOpen,
    data: modalProject,
    openModal,
    closeModal,
  } = useModal<Project>();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      handleViewProject(project);
    }
  };

  const handleViewModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(project);
  };

  const handleEditProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleViewProject(project);
  };

  return (
    <>
      <Card
        className="border border-slate-200 bg-white shadow-sm w-full min-w-0 cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3 px-4">
          <div className="grid grid-cols-[1fr_auto] gap-3 items-start w-full min-w-0">
            <div className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-base font-semibold text-slate-900 truncate block">
                  {project.name}
                </CardTitle>
              </div>
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
                onClick={handleViewModal}
                className="size-8 p-0"
                title="Xem chi tiết"
              >
                <Eye className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={handleEditProject}
                title="Chỉnh sửa"
              >
                <Edit className="size-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-slate-500 line-clamp-2">
              {project.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-4">
          {hasHostingInfo ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2 min-w-0">
                <Badge
                  className={`${getStatusColor(
                    project.status,
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
                  project.status,
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

      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ProjectDetailModal project={modalProject} />
        </DialogContent>
      </Dialog>
    </>
  );
});

ProjectCard.displayName = "ProjectCard";
