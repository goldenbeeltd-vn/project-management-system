"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface NotificationsTabProps {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    desktop: boolean;
    statusChange: boolean;
    taskAssignment: boolean;
    deadlineReminder: boolean;
    budgetAlert: boolean;
    weeklyReport: boolean;
    dailyDigest: boolean;
  };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      sms: boolean;
      push: boolean;
      desktop: boolean;
      statusChange: boolean;
      taskAssignment: boolean;
      deadlineReminder: boolean;
      budgetAlert: boolean;
      weeklyReport: boolean;
      dailyDigest: boolean;
    }>
  >;
}

export function NotificationsTab({
  notifications,
  setNotifications,
}: NotificationsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">
          Cài đặt thông báo
        </h4>
        <p className="text-gray-600 text-sm mt-1">
          Tùy chỉnh cách nhận thông báo về dự án và hoạt động
        </p>
      </div>

      <Separator />

      <div className="space-y-8">
        {/* Notification Channels */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Kênh thông báo
          </h5>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">
                  Nhận thông báo qua email
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    email: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SMS</p>
                <p className="text-sm text-gray-500">
                  Nhận thông báo qua tin nhắn
                </p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, sms: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Push Notification</p>
                <p className="text-sm text-gray-500">
                  Thông báo đẩy trên trình duyệt
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    push: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Desktop Notification</p>
                <p className="text-sm text-gray-500">Thông báo trên desktop</p>
              </div>
              <Switch
                checked={notifications.desktop}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    desktop: checked,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Loại thông báo
          </h5>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Thay đổi trạng thái</p>
                <p className="text-sm text-gray-500">
                  Thông báo khi trạng thái dự án thay đổi
                </p>
              </div>
              <Switch
                checked={notifications.statusChange}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    statusChange: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Phân công task</p>
                <p className="text-sm text-gray-500">
                  Thông báo khi được giao nhiệm vụ mới
                </p>
              </div>
              <Switch
                checked={notifications.taskAssignment}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    taskAssignment: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Nhắc nhở deadline</p>
                <p className="text-sm text-gray-500">
                  Nhắc nhở trước deadline 1 ngày
                </p>
              </div>
              <Switch
                checked={notifications.deadlineReminder}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    deadlineReminder: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cảnh báo ngân sách</p>
                <p className="text-sm text-gray-500">
                  Thông báo khi vượt quá 80% ngân sách
                </p>
              </div>
              <Switch
                checked={notifications.budgetAlert}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    budgetAlert: checked,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Report Notifications */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Báo cáo định kỳ
          </h5>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Báo cáo hàng tuần</p>
                <p className="text-sm text-gray-500">
                  Tổng hợp tiến độ và hoạt động tuần
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    weeklyReport: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Digest hàng ngày</p>
                <p className="text-sm text-gray-500">
                  Tóm tắt các hoạt động trong ngày
                </p>
              </div>
              <Switch
                checked={notifications.dailyDigest}
                onCheckedChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    dailyDigest: checked,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
