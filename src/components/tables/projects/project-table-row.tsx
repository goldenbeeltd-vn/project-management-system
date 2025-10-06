import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Users, Calendar } from "lucide-react";
import { getStatusColor, formatDate, type Project } from "@/lib/mock-data";
import { getStatusLabel } from "@/lib/project-utils";
import { useProjectData } from "@/hooks/projects/use-project-data";
import { useProjectActions } from "@/hooks/projects/use-project-actions";
import {
  GenericTableRow,
  type TableColumn,
  type TableAction,
} from "../generic-table-row";

interface ProjectTableRowProps {
  project: Project;
  onProjectClick?: (project: Project) => void;
}

export const ProjectTableRow = memo(
  ({ project, onProjectClick }: ProjectTableRowProps) => {
    const { client, allTeamMembers } = useProjectData(project);
    const { handleViewProject } = useProjectActions();

    const columns: TableColumn[] = [
      {
        key: "name",
        content: (
          <div>
            <div className="font-medium text-slate-900 truncate">
              {project.name}
            </div>
            <div className="text-sm text-slate-500 truncate max-w-[200px]">
              {project.description.length > 50
                ? `${project.description.substring(0, 50)}...`
                : project.description}
            </div>
          </div>
        ),
      },
      {
        key: "client",
        content: (
          <div className="text-sm text-slate-900">{client?.name || "-"}</div>
        ),
      },
      {
        key: "status",
        content: (
          <Badge className={`${getStatusColor(project.status)} text-xs`}>
            {getStatusLabel(project.status)}
          </Badge>
        ),
      },
      {
        key: "progress",
        content: (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700 min-w-[35px]">
              {project.progress}%
            </span>
            <Progress
              value={project.progress}
              className="h-2 flex-1 bg-slate-200"
            />
          </div>
        ),
      },
      {
        key: "team",
        content: (
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
        ),
      },
      {
        key: "endDate",
        content: (
          <div className="flex items-center space-x-1 text-sm text-slate-600">
            <Calendar className="size-4" />
            <span>{formatDate(project.endDate)}</span>
          </div>
        ),
      },
    ];

    const actions: TableAction[] = [
      {
        label: "Xem chi tiết",
        icon: <Eye className="size-4" />,
        onClick: () => handleViewProject(project, { showModal: false }),
      },
      {
        label: "Chỉnh sửa",
        icon: <Edit className="size-4" />,
        onClick: () => {
          // Handle edit action
          console.log("Edit project:", project.id);
        },
      },
    ];

    const handleRowClick = () => {
      if (onProjectClick) {
        onProjectClick(project);
      }
    };

    return (
      <GenericTableRow
        columns={columns}
        actions={actions}
        onRowClick={handleRowClick}
      />
    );
  },
);

ProjectTableRow.displayName = "ProjectTableRow";
