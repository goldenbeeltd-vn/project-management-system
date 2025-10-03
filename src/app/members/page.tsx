"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dummy data for illustration
const members = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "",
    position: "Frontend Developer",
    department: "Kỹ thuật",
    startDate: "2022-01-10",
    status: "Đang làm",
    email: "anv@goldenbee.com",
    projects: ["Dự án A", "Dự án B"],
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "",
    position: "Tester",
    department: "QA",
    startDate: "2023-03-15",
    status: "Thử việc",
    email: "btt@goldenbee.com",
    projects: ["Dự án B"],
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "",
    position: "Marketing Specialist",
    department: "Marketing",
    startDate: "2021-11-20",
    status: "Nghỉ việc",
    email: "clv@goldenbee.com",
    projects: [],
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "",
    position: "Chief Technology Officer (CTO)",
    department: "Điều hành",
    startDate: "2020-05-30",
    status: "Đang làm",
    email: "dpt@goldenbee.com",
    projects: ["Dự án A"],
  },
  // ...more members...
];

const departments = [
  { value: "all", label: "Tất cả phòng ban" },
  { value: "Kỹ thuật", label: "Kỹ thuật" },
  { value: "QA", label: "QA" },
  { value: "Marketing", label: "Marketing" },
  { value: "Điều hành", label: "Điều hành" },
  // ...other departments...
];

const statuses = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Đang làm", label: "Đang làm" },
  { value: "Thử việc", label: "Thử việc" },
  { value: "Nghỉ việc", label: "Nghỉ việc" },
];

const MembersPage = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const router = useRouter();

  const handleDelete = (id: string) => {
    setDeleteMemberId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    // TODO: Thực hiện xóa thành viên với id: deleteMemberId
    // Ví dụ: gọi API hoặc cập nhật state
    console.log("Đã xóa thành viên " + deleteMemberId);
    setOpenDeleteDialog(false);
    setDeleteMemberId(null);
    // alert("Đã xóa thành viên " + deleteMemberId);
  };

  // Filter logic
  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = department !== "all" ? m.department === department : true;
    const matchStatus = status !== "all" ? m.status === status : true;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <Input
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 bg-white"
          />
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="min-w-40 bg-white">
              <SelectValue placeholder="Phòng ban" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-2" onClick={() => router.push("/members/new")}>
          <Plus className="w-4 h-4" />
          Thêm nhân viên
        </Button>
      </div>
      <div className="rounded-lg border bg-background p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Phòng ban</TableHead>
              <TableHead>Ngày bắt đầu làm</TableHead>
              <TableHead>Dự án tham gia</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  Không có nhân viên nào phù hợp.
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>
                        {m.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.position}</TableCell>
                  <TableCell>{m.department}</TableCell>
                  <TableCell>{m.startDate}</TableCell>
                  <TableCell>
                    {m.projects && m.projects.length > 0
                      ? `${m.projects.length}`
                      : "0"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        m.status === "Đang làm"
                          ? "text-green-600 font-medium"
                          : m.status === "Thử việc"
                            ? "text-yellow-600 font-medium"
                            : "text-red-600 font-medium"
                      }
                    >
                      {m.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/members/${m.id}`)}
                        >
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/members/${m.id}/edit`)}
                        >
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(m.id)}>
                          Xóa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            /* handle permission */
                          }}
                        >
                          Phân quyền
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Pagination UI */}
        <div className="flex justify-end mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="h-8" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="size-8">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="size-8">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#5" className="size-8">
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="h-8" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa thành viên</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa thành viên này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Xác nhận xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersPage;
