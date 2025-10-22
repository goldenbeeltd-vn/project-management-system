"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Lock, BellRing, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectForm } from "@/hooks/projects/use-project-form";
import { useProjectFormValidation } from "@/hooks/projects/use-project-form-validation";
import { AccountManagementTab } from "./settings/account-management-tab";
import { GeneralInfoTab } from "./settings/general-info-tab";
import { SourceCodeTab } from "./settings/source-code-tab";
import { NotificationsTab } from "./settings/notifications-tab";

// Repository interface
interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  provider: "github" | "gitlab" | "bitbucket" | "custom";
  isPrivate: boolean;
  description?: string;
  status: "connected" | "disconnected" | "error" | "creating";
  lastSync?: Date;
}

export function ProjectSettingsTab() {
  const [activeTab, setActiveTab] = useState("general");
  const { formData, errors, handleInputChange, resetForm, setFormErrors } =
    useProjectForm();
  const { validateForm } = useProjectFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    desktop: true,
    statusChange: true,
    taskAssignment: true,
    deadlineReminder: true,
    budgetAlert: true,
    weeklyReport: false,
    dailyDigest: false,
  });

  // Source code settings state
  const [sourceSettings, setSourceSettings] = useState({
    repositories: [
      {
        id: "1",
        name: "frontend",
        url: "https://github.com/company/frontend.git",
        branch: "main",
        provider: "github" as const,
        isPrivate: true,
        description: "Frontend React application",
        status: "connected" as const,
        lastSync: new Date("2024-12-25T10:30:00"),
      },
      {
        id: "2",
        name: "backend-api",
        url: "https://gitlab.com/company/backend-api.git",
        branch: "develop",
        provider: "gitlab" as const,
        isPrivate: false,
        description: "Node.js REST API backend",
        status: "connected" as const,
        lastSync: new Date("2024-12-25T09:15:00"),
      },
    ] as Repository[],
    globalAccessToken: undefined as string | undefined,
  });

  const sidebarItems = [
    {
      id: "general",
      label: "Thông tin chung",
      icon: Info,
      description: "Cấu hình thông tin cơ bản của dự án",
      active: activeTab === "general",
    },
    {
      id: "account",
      label: "Tài khoản",
      icon: Lock,
      description: "Quản lý tài khoản và quyền truy cập",
      active: activeTab === "account",
    },
    {
      id: "source",
      label: "Mã nguồn",
      icon: Code2,
      description: "Cấu hình repository và deployment",
      active: activeTab === "source",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: BellRing,
      description: "Tùy chỉnh cài đặt thông báo",
      active: activeTab === "notifications",
    },
  ];

  const handleSave = async () => {
    setIsSubmitting(true);
    const validation = validateForm(formData);

    if (!validation.isValid && activeTab === "general") {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving project settings:", {
        formData,
        notifications,
        sourceSettings,
      });
    } catch (error) {
      console.error("Error saving project settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (activeTab === "general") {
      resetForm();
    } else if (activeTab === "notifications") {
      setNotifications({
        email: true,
        sms: false,
        push: true,
        desktop: true,
        statusChange: true,
        taskAssignment: true,
        deadlineReminder: true,
        budgetAlert: true,
        weeklyReport: false,
        dailyDigest: false,
      });
    } else if (activeTab === "source") {
      setSourceSettings({
        repositories: [],
        globalAccessToken: undefined,
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Cài đặt dự án
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Quản lý cấu hình và tùy chỉnh dự án
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Đặt lại
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex min-h-[600px] border-t pt-6">
        {/* Sidebar */}
        <div className="w-56 border-r border-gray-200">
          <nav className="space-y-1 mr-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-2.5 text-sm rounded-lg transition-colors",
                    item.active
                      ? "bg-primary text-white font-medium"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      item.active ? "text-white" : "text-gray-400",
                    )}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 pl-6">
          <div className="max-w-4xl">
            {/* General Information Tab */}
            {activeTab === "general" && (
              <GeneralInfoTab
                formData={{
                  name: formData.name || "",
                  projectCode: formData.projectCode || "",
                  category: formData.category || "",
                  projectType: formData.projectType || "",
                  status: formData.status || "",
                  priority: formData.priority || "",
                  startDate: formData.startDate,
                  endDate: formData.endDate,
                  budget: formData.budget || "",
                  currency: formData.currency || "",
                  contractType: formData.contractType || "",
                  clientId: formData.clientId || "",
                  teamMemberIds: formData.teamMemberIds || [],
                  description: formData.description || "",
                }}
                errors={Object.fromEntries(
                  Object.entries(errors).map(([key, value]) => [
                    key,
                    String(value),
                  ]),
                )}
                handleInputChange={(field: string, value: unknown) =>
                  handleInputChange(field as keyof typeof formData, value)
                }
              />
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Quản lý tài khoản
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Quản lý các tài khoản dịch vụ, API keys và thông tin đăng
                    nhập
                  </p>
                </div>

                <AccountManagementTab />
              </div>
            )}

            {/* Source Code Tab */}
            {activeTab === "source" && (
              <SourceCodeTab
                sourceSettings={sourceSettings}
                setSourceSettings={setSourceSettings}
              />
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <NotificationsTab
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
