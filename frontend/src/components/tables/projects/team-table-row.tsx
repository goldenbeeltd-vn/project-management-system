import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Eye, Edit, Trash2 } from "lucide-react";
import {
  GenericTableRow,
  type TableColumn,
  type TableAction,
} from "../generic-table-row";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

interface TeamTableRowProps {
  member: TeamMember;
  onMemberClick?: (member: TeamMember) => void;
  onEdit?: (member: TeamMember) => void;
  onDelete?: (member: TeamMember) => void;
}

const getStatusColor = (status: TeamMember["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: TeamMember["status"]) => {
  switch (status) {
    case "active":
      return "Hoạt động";
    case "inactive":
      return "Tạm dừng";
    case "pending":
      return "Chờ xác nhận";
    default:
      return "Không xác định";
  }
};

export const TeamTableRow = memo(
  ({ member, onMemberClick, onEdit, onDelete }: TeamTableRowProps) => {
    const columns: TableColumn[] = [
      {
        key: "member",
        content: (
          <div className="flex items-center space-x-3">
            <Avatar className="size-8">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-slate-500 text-white">
                {member.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-slate-900">{member.name}</div>
              <div className="text-sm text-slate-500">{member.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        content: <div className="text-sm text-slate-900">{member.role}</div>,
      },
      {
        key: "status",
        content: (
          <Badge className={`${getStatusColor(member.status)} text-xs`}>
            {getStatusLabel(member.status)}
          </Badge>
        ),
      },
      {
        key: "joinDate",
        content: (
          <div className="flex items-center space-x-1 text-sm text-slate-600">
            <Calendar className="size-4" />
            <span>{member.joinDate}</span>
          </div>
        ),
      },
    ];

    const actions: TableAction[] = [
      {
        label: "Xem chi tiết",
        icon: <Eye className="size-4" />,
        onClick: () => {
          if (onMemberClick) {
            onMemberClick(member);
          }
        },
      },
      {
        label: "Chỉnh sửa",
        icon: <Edit className="size-4" />,
        onClick: () => {
          if (onEdit) {
            onEdit(member);
          }
        },
      },
      {
        label: "Xóa",
        icon: <Trash2 className="size-4" />,
        onClick: () => {
          if (onDelete) {
            onDelete(member);
          }
        },
        variant: "destructive",
      },
    ];

    const handleRowClick = () => {
      if (onMemberClick) {
        onMemberClick(member);
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

TeamTableRow.displayName = "TeamTableRow";
