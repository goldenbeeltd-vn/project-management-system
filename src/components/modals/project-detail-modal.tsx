"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getStatusColor,
  getPriorityColor,
  formatCurrency,
  formatDate,
  getClientById,
  type Project,
} from "@/lib/mock-data";
import {
  getStatusIcon,
  getStatusLabel,
  getPriorityLabel,
  getRoleLabel,
} from "@/lib/project-utils";

interface ProjectDetailModalProps {
  project: Project | null;
}

export const ProjectDetailModal = memo(
  ({ project }: ProjectDetailModalProps) => {
    if (!project) return null;

    const client = getClientById(project.clientId);

    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStatusIcon(project.status)}
            <span className="text-slate-900">{project.name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="team">Nhóm</TabsTrigger>
            <TabsTrigger value="hosting">Hosting</TabsTrigger>
            <TabsTrigger value="risks">Rủi Ro</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 text-slate-900">
                  Thông Tin Cơ Bản
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">
                      Trạng thái:
                    </span>
                    <Badge className={`ml-2 ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Ưu tiên:</span>
                    <Badge
                      className={`ml-2 ${getPriorityColor(project.priority)}`}
                    >
                      {getPriorityLabel(project.priority)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Ngân sách:
                    </span>{" "}
                    <span className="text-slate-900">
                      {formatCurrency(project.budget)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Chi phí thực tế:
                    </span>{" "}
                    <span className="text-slate-900">
                      {formatCurrency(project.actualCost)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Bắt đầu:</span>{" "}
                    <span className="text-slate-900">
                      {formatDate(project.startDate)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Kết thúc:
                    </span>{" "}
                    <span className="text-slate-900">
                      {formatDate(project.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-slate-900">Khách Hàng</h4>
                {client ? (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">
                        Công ty:
                      </span>{" "}
                      <span className="text-slate-900">{client.name}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Liên hệ:
                      </span>{" "}
                      <span className="text-slate-900">{client.contact}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Email:</span>{" "}
                      <span className="text-slate-900">{client.email}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Điện thoại:
                      </span>{" "}
                      <span className="text-slate-900">{client.phone}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500">
                    Không có thông tin khách hàng
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-slate-900">Mô Tả Dự Án</h4>
              <p className="text-sm text-slate-600">{project.description}</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">
                  Tiến độ tổng thể
                </span>
                <span className="font-bold text-slate-900">
                  {project.progress}%
                </span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>

            {/* Maintenance Section */}
            {project.maintenance && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2 text-slate-900">
                  Thông Tin Bảo Trì
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">
                      Cấp độ hỗ trợ:
                    </span>
                    <Badge className="ml-2 bg-emerald-100 text-emerald-800 border-emerald-200">
                      {project.maintenance.supportLevel}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Đánh giá tiếp theo:
                    </span>{" "}
                    <span className="text-slate-900">
                      {formatDate(project.maintenance.nextReview)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Vấn đề đang mở:
                    </span>{" "}
                    <span className="text-slate-900">
                      {
                        project.maintenance.issues.filter(
                          (i) => i.status === "open"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-slate-900">
                  Project Manager
                </h4>
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-slate-50">
                  <Avatar>
                    <AvatarImage src={project.manager.avatar} />
                    <AvatarFallback>{project.manager.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">
                      {project.manager.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {project.manager.email}
                    </p>
                  </div>
                </div>
              </div>

              {Object.entries(project.team).map(([role, members]) => (
                <div key={role}>
                  <h4 className="font-medium mb-2 capitalize text-slate-900">
                    {getRoleLabel(role)}
                  </h4>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg bg-slate-50"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hosting" className="space-y-4">
            {project.hosting ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-slate-700">
                        Nhà cung cấp:
                      </span>{" "}
                      <span className="text-slate-900">
                        {project.hosting.provider}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">URL:</span>
                      <a
                        href={project.hosting.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 hover:underline"
                      >
                        {project.hosting.url}
                      </a>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Domain:
                      </span>{" "}
                      <span className="text-slate-900">
                        {project.hosting.domain}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Dung lượng:
                      </span>{" "}
                      <span className="text-slate-900">
                        {project.hosting.server.storage}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-slate-700">
                        Chi phí/tháng:
                      </span>{" "}
                      <span className="text-slate-900">
                        {formatCurrency(project.hosting.cost)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Hết hạn:
                      </span>
                      <span className="ml-2 text-slate-900">
                        {formatDate(project.hosting.expiryDate)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">
                        Trạng thái:
                      </span>
                      <Badge
                        className={`ml-2 ${getStatusColor(
                          project.hosting.status
                        )}`}
                      >
                        {project.hosting.status === "active"
                          ? "Hoạt động"
                          : project.hosting.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">
                Chưa có thông tin hosting
              </p>
            )}
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            {project.risks.length > 0 ? (
              <div className="space-y-3">
                {project.risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="border rounded-lg p-4 bg-slate-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">
                        {risk.title}
                      </h4>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(risk.level)}>
                          {risk.level === "high"
                            ? "Cao"
                            : risk.level === "medium"
                            ? "Trung bình"
                            : "Thấp"}
                        </Badge>
                        <Badge className={getStatusColor(risk.status)}>
                          {risk.status === "open"
                            ? "Mở"
                            : risk.status === "mitigated"
                            ? "Đã xử lý"
                            : "Đóng"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{risk.description}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Tạo: {formatDate(risk.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">
                Không có rủi ro nào được ghi nhận
              </p>
            )}
          </TabsContent>
        </Tabs>
      </>
    );
  }
);

ProjectDetailModal.displayName = "ProjectDetailModal";
