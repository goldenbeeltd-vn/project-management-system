"use client";

import { memo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Project } from "@/lib/mock-data";
import { ProjectTableRow } from "./project-table-row";

interface ProjectTableProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export const ProjectTable = memo(
  ({ projects, onProjectClick }: ProjectTableProps) => {
    return (
      <div className="border border-slate-200 rounded-lg bg-white p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Dự án</TableHead>
              <TableHead className="w-[150px]">Khách hàng</TableHead>
              <TableHead className="w-[120px]">Trạng thái</TableHead>
              <TableHead className="w-[120px]">Tiến độ</TableHead>
              <TableHead className="w-[120px]">Nhóm</TableHead>
              <TableHead className="w-[120px]">Ngày kết thúc</TableHead>
              <TableHead className="w-[150px]">Hosting</TableHead>
              <TableHead className="w-[100px] text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <ProjectTableRow
                key={project.id}
                project={project}
                onProjectClick={onProjectClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);

ProjectTable.displayName = "ProjectTable";
