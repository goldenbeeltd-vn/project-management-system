"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Building2,
  Calendar,
  Camera,
  Download,
  Edit,
  Mail,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dummy member data
const member = {
  id: "1",
  name: "Nguyễn Văn A",
  avatar: "",
  dob: "1995-06-15",
  gender: "Nam",
  phone: "0901234567",
  email: "anv@goldenbee.com",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  startDate: "2022-01-10",
  status: "Đang làm",
  position: "Frontend Developer",
  department: "Kỹ thuật",
  role: "User",
  departmentRole: "Thành viên",
};

const projects = [
  {
    name: "Dự án A",
    role: "Frontend",
    progress: 80,
    isCurrent: true,
    startDate: "2024-05-01",
    endDate: null,
    tasks: 12,
  },
  {
    name: "Dự án B",
    role: "Tester",
    progress: 100,
    isCurrent: false,
    startDate: "2023-12-01",
    endDate: "2024-04-30",
    tasks: 20,
  },
];

const documents = [
  { name: "CCCD", file: "cccd_nguyenvana.pdf" },
  { name: "BHYT", file: "bhyt_nguyenvana.pdf" },
  { name: "Hợp đồng lao động", file: "hdld_nguyenvana.pdf" },
];

const salaryHistory = [
  {
    month: "2024-06",
    base: 20000000,
    allowance: 2000000,
    insurance: 1500000,
  },
  {
    month: "2024-05",
    base: 20000000,
    allowance: 2000000,
    insurance: 1500000,
  },
];

type InfoCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
};

const InfoCard = ({ icon: Icon, label, value }: InfoCardProps) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#FBCB1C]/50">
    <div className="flex items-start gap-4">
      <div className="bg-[#FBCB1C]/10 rounded-lg p-3 mt-1">
        <Icon className="w-5 h-5 text-[#FBCB1C]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 mb-1 font-medium">{label}</div>
        <div className="font-medium text-gray-900 break-words">{value}</div>
      </div>
    </div>
  </div>
);

const MemberPage = () => {
  const [tab, setTab] = useState("info");
  // const [role, setRole] = useState(member.role);
  // const [depRole, setDepRole] = useState(member.departmentRole);

  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="md:w-72 w-full flex flex-col items-center gap-4 bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-200 p-6 h-fit">
        <div className="relative">
          <Avatar className="size-28 shadow-md">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#FBCB1C]/90 to-[#FBCB1C] text-white text-2xl font-bold">
              {member.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // TODO: Xử lý đổi avatar, ví dụ upload lên server hoặc set state
                    // alert("Đã chọn file avatar: " + file.name);
                  }
                }}
              />
              <Button
                size="icon"
                variant="default"
                className="bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                asChild
              >
                <span>
                  <Camera className="size-5 text-gray-800" />
                </span>
              </Button>
            </label>
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl text-gray-900">{member.name}</div>
          <div className="text-blue-600 font-medium mt-1">
            {member.position}
          </div>
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-1">
            <Building2 className="w-4 h-4" />
            {member.department}
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Trạng thái
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
              {member.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Ngày vào:</span>
            <span>{member.startDate}</span>
          </div>
        </div>
        <Button
          className="mt-2 w-full shadow-md"
          variant="default"
          onClick={() => router.push(`/members/${member.id}/edit`)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Chỉnh sửa thông tin
        </Button>
      </aside>
      {/* Main content with Tabs */}
      <div className="flex-1">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 border shadow-sm">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="projects">Dự án</TabsTrigger>
            <TabsTrigger value="documents">Hồ sơ</TabsTrigger>
            <TabsTrigger value="salary">Lương</TabsTrigger>
            {/* <TabsTrigger value="roles">Phân quyền</TabsTrigger> */}
          </TabsList>
          {/* Tab: Thông tin */}
          <TabsContent value="info">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b">
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoCard icon={User} label="Họ tên" value={member.name} />
                <InfoCard
                  icon={Calendar}
                  label="Ngày sinh"
                  value={member.dob}
                />
                <InfoCard icon={User} label="Giới tính" value={member.gender} />
                <InfoCard
                  icon={Phone}
                  label="Số điện thoại"
                  value={member.phone}
                />
                <InfoCard icon={Mail} label="Email" value={member.email} />
                <InfoCard
                  icon={MapPin}
                  label="Địa chỉ"
                  value={member.address}
                />
                <InfoCard
                  icon={Calendar}
                  label="Ngày bắt đầu làm việc"
                  value={member.startDate}
                />
                <InfoCard
                  icon={User}
                  label="Trạng thái"
                  value={member.status}
                />
                <InfoCard
                  icon={Briefcase}
                  label="Vị trí"
                  value={member.position}
                />
                <InfoCard
                  icon={Building2}
                  label="Phòng ban"
                  value={member.department}
                />
              </div>
            </div>
          </TabsContent>
          {/* Tab: Dự án */}
          <TabsContent value="projects">
            {/* Thống kê dự án */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="mb-6 font-semibold text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-green-600 rounded"></div>
                Thống kê dự án
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-2">
                    Tổng số dự án đã tham gia
                  </div>
                  <div className="font-bold text-2xl text-green-800">
                    {projects.length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-2">
                    Đang thực hiện
                  </div>
                  <div className="font-bold text-2xl text-blue-800">
                    {projects.filter((p) => p.isCurrent).length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-2">
                    Đã hoàn thành
                  </div>
                  <div className="font-bold text-2xl text-orange-800">
                    {projects.filter((p) => !p.isCurrent).length}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="mb-4 font-semibold text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Dự án đang thực hiện
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên dự án</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Ngày kết thúc</TableHead>
                    <TableHead>Số task</TableHead>
                    <TableHead>Tiến độ (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects
                    .filter((p) => p.isCurrent)
                    .map((p, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.role}</TableCell>
                        <TableCell>{p.startDate}</TableCell>
                        <TableCell>{p.endDate ?? "-"}</TableCell>
                        <TableCell>{p.tasks}</TableCell>
                        <TableCell>{p.progress}%</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4 font-semibold text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-gray-400 rounded"></div>
                Dự án đã hoàn thành
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên dự án</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Ngày kết thúc</TableHead>
                    <TableHead>Số task</TableHead>
                    <TableHead>Tiến độ (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects
                    .filter((p) => !p.isCurrent)
                    .map((p, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.role}</TableCell>
                        <TableCell>{p.startDate}</TableCell>
                        <TableCell>{p.endDate ?? "-"}</TableCell>
                        <TableCell>{p.tasks}</TableCell>
                        <TableCell>{p.progress}%</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          {/* Tab: Hồ sơ */}
          <TabsContent value="documents">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-semibold text-lg">Danh sách giấy tờ</span>
                <Button variant="outline" size="sm" className="shadow-sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload giấy tờ
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên giấy tờ</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.file}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          {/* Tab: Lương */}
          <TabsContent value="salary">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="mb-6 font-semibold text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-green-600 rounded"></div>
                Lương hiện tại
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-2">
                    Lương cơ bản
                  </div>
                  <div className="font-bold text-2xl text-green-800">
                    20,000,000₫
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-2">
                    Phụ cấp
                  </div>
                  <div className="font-bold text-2xl text-blue-800">
                    2,000,000₫
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-2">
                    Bảo hiểm
                  </div>
                  <div className="font-bold text-2xl text-orange-800">
                    1,500,000₫
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="mb-4 font-semibold text-lg flex items-center gap-2">
                <div className="w-1 h-6 bg-gray-400 rounded"></div>
                Lịch sử lương
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tháng</TableHead>
                    <TableHead>Lương cơ bản</TableHead>
                    <TableHead>Phụ cấp</TableHead>
                    <TableHead>Bảo hiểm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryHistory.map((s, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{s.month}</TableCell>
                      <TableCell>{s.base.toLocaleString()}₫</TableCell>
                      <TableCell>{s.allowance.toLocaleString()}₫</TableCell>
                      <TableCell>{s.insurance.toLocaleString()}₫</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          {/* Tab: Phân quyền */}
          {/* <TabsContent value="roles">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b">
                Cài đặt phân quyền
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <div className="mb-2 font-medium">Role hệ thống</div>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 font-medium">Chức vụ phòng ban</div>
                  <Select value={depRole} onValueChange={setDepRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chức vụ" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentRoles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md"
                >
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default MemberPage;
