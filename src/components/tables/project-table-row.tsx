import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Edit, Users, Calendar } from "lucide-react";
import { getStatusColor, formatDate, type Project } from "@/lib/mock-data";
import { getStatusLabel } from "@/lib/project-utils";
import { useProjectData } from "@/hooks/use-project-data";
import { useProjectActions } from "@/hooks/use-project-actions";

interface ProjectTableRowProps {
  project: Project;
  onProjectClick?: (project: Project) => void;
}

export const ProjectTableRow = memo(
  ({ project, onProjectClick }: ProjectTableRowProps) => {
    const { client, allTeamMembers, hasHostingInfo } = useProjectData(project);
    const { handleViewProject } = useProjectActions();

    return (
      <TableRow className="hover:bg-slate-50">
        {/* Project Name */}
        <TableCell>
          <div className="font-medium text-slate-900 truncate">
            {project.name}
          </div>
          <div className="text-sm text-slate-500 truncate max-w-[200px]">
            {project.description.length > 50
              ? `${project.description.substring(0, 50)}...`
              : project.description}
          </div>
        </TableCell>

        {/* Client */}
        <TableCell>
          <div className="text-sm text-slate-900">{client?.name || "-"}</div>
        </TableCell>

        {/* Status */}
        <TableCell>
          <Badge className={`${getStatusColor(project.status)} text-xs`}>
            {getStatusLabel(project.status)}
          </Badge>
        </TableCell>

        {/* Progress */}
        <TableCell>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700 min-w-[35px]">
              {project.progress}%
            </span>
            <Progress
              value={project.progress}
              className="h-2 flex-1 bg-slate-200"
            />
          </div>
        </TableCell>

        {/* Team */}
        <TableCell>
          <div className="flex items-center space-x-2">
            <Users className="size-4 text-slate-500" />
            <div className="flex -space-x-1">
              {allTeamMembers.slice(0, 3).map((member, idx) => (
                <Avatar key={idx} className="size-6 border-2 border-white">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs bg-slate-500 text-white">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
              {allTeamMembers.length > 3 && (
                <div className="size-6 bg-slate-300 rounded-full flex items-center justify-center text-xs text-slate-700 border-2 border-white">
                  +{allTeamMembers.length - 3}
                </div>
              )}
            </div>
          </div>
        </TableCell>

        {/* End Date */}
        <TableCell>
          <div className="flex items-center space-x-1 text-sm text-slate-600">
            <Calendar className="size-4" />
            <span>{formatDate(project.endDate)}</span>
          </div>
        </TableCell>

        {/* Hosting */}
        <TableCell>
          {hasHostingInfo ? (
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded font-medium">
                  {project.hosting?.provider}
                </span>
              </div>
              <div className="text-xs text-slate-600">
                Hết hạn:{" "}
                {project.hosting?.expiryDate
                  ? formatDate(project.hosting.expiryDate)
                  : "-"}
              </div>
            </div>
          ) : (
            <span className="text-sm text-slate-400">-</span>
          )}
        </TableCell>

        {/* Actions */}
        <TableCell className="text-right">
          <div className="flex justify-end space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewProject(project, onProjectClick)}
              className="size-8 p-0"
            >
              <Eye className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <Edit className="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
);

ProjectTableRow.displayName = "ProjectTableRow";
