"use client";

import FileUploadBox from "@/components/common/form/file-upload";
import FormFieldCustom from "@/components/common/form/form-field-custom";
import FormSection from "@/components/common/form/form-section";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberFormType, memberSchema } from "@/lib/validation/memberSchema";
import { formatVND } from "@/utils/formatters";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const departments = [
  { value: "Kỹ thuật", label: "Kỹ thuật" },
  { value: "QA", label: "QA" },
  { value: "Marketing", label: "Marketing" },
  { value: "Điều hành", label: "Điều hành" },
];

const positions = [
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Tester", label: "Tester" },
  { value: "Marketing Specialist", label: "Marketing Specialist" },
  { value: "CTO", label: "Chief Technology Officer (CTO)" },
];

const statuses = [
  { value: "Đang làm", label: "Đang làm" },
  { value: "Thử việc", label: "Thử việc" },
  { value: "Nghỉ việc", label: "Nghỉ việc" },
];

const roles = [
  { value: "Admin", label: "Admin" },
  { value: "HR", label: "HR" },
  { value: "User", label: "User" },
  { value: "Manager", label: "Manager" },
];

const banks = [
  "Vietcombank",
  "Techcombank",
  "ACB",
  "MB Bank",
  "VPBank",
  "BIDV",
  "Sacombank",
];

const NewMemberPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MemberFormType>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      dob: "",
      gender: "Nam",
      email: "",
      phone: "",
      address: "",
      bankName: "",
      bankBranch: "",
      bankAccount: "",
      bankHolder: "",
      startDate: "",
      department: "",
      position: "",
      status: "Đang làm",
      role: "User",
      username: "",
      password: "",
      documents: [],
    },
  });

  const emailValue = watch("email");
  useState(() => {
    if (emailValue) {
      setValue("username", emailValue);
    }
  });

  const router = useRouter();

  const onSubmit = async (data: MemberFormType) => {
    console.log(data);
    toast.success("Thêm thành viên thành công!");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thêm thành viên mới
        </h1>
        <p className="text-gray-600">
          Điền đầy đủ thông tin để tạo tài khoản nhân viên mới
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cá nhân */}
          <FormSection
            icon={User}
            title="Thông tin cá nhân"
            description="Thông tin cơ bản về nhân viên"
          >
            <div className="space-y-5">
              <FormFieldCustom
                label="Họ và tên"
                required
                error={errors.name?.message}
                icon={User}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập họ và tên đầy đủ"
                      className={`h-10 ${errors.name ? "border-red-500" : ""}`}
                    />
                  )}
                />
              </FormFieldCustom>

              <div className="grid grid-cols-2 gap-4">
                <FormFieldCustom label="Ngày sinh" icon={Calendar}>
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DatePicker {...field} value={field.value ?? ""} />
                    )}
                  />
                </FormFieldCustom>

                <FormFieldCustom label="Giới tính" icon={User}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Nam" id="nam" />
                          <Label htmlFor="nam" className="cursor-pointer">
                            Nam
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Nữ" id="nu" />
                          <Label htmlFor="nu" className="cursor-pointer">
                            Nữ
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Khác" id="khac" />
                          <Label htmlFor="khac" className="cursor-pointer">
                            Khác
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </FormFieldCustom>
              </div>

              <FormFieldCustom
                label="Email công việc"
                required
                error={errors.email?.message}
                icon={Mail}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="email@goldenbee.com"
                      className={`h-10 ${errors.email ? "border-red-500" : ""}`}
                    />
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Số điện thoại" icon={Phone}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="0901234567"
                      className="h-10"
                    />
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Địa chỉ" icon={MapPin}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Số nhà, đường, quận, thành phố"
                      className="h-10"
                    />
                  )}
                />
              </FormFieldCustom>
            </div>
          </FormSection>

          {/* Thông tin công việc */}
          <FormSection
            icon={Briefcase}
            title="Thông tin công việc"
            description="Vị trí và vai trò trong công ty"
          >
            <div className="space-y-5">
              <FormFieldCustom label="Ngày bắt đầu làm việc" icon={Calendar}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker {...field} value={field.value ?? ""} />
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom
                label="Phòng ban"
                required
                error={errors.department?.message}
                icon={Building2}
              >
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Chọn phòng ban" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((d) => (
                          <SelectItem key={d.value} value={d.value}>
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom
                label="Vị trí / Chức vụ"
                required
                error={errors.position?.message}
                icon={Briefcase}
              >
                <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Trạng thái làm việc" icon={CheckCircle2}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom
                label="Lương cơ bản"
                required
                error={errors.salary?.message}
                icon={CreditCard}
              >
                <Controller
                  name="salary"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="numeric"
                        min={0}
                        placeholder="Nhập lương cơ bản"
                        className={`h-10 pr-16 ${
                          errors.salary ? "border-red-500" : ""
                        }`}
                        value={formatVND(field.value ?? "")}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          field.onChange(raw === "" ? "" : Number(raw));
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                        VND
                      </span>
                    </div>
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom
                label="Phụ cấp"
                error={errors.allowance?.message}
                icon={CreditCard}
              >
                <Controller
                  name="allowance"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="numeric"
                        min={0}
                        placeholder="Nhập phụ cấp (nếu có)"
                        className="h-10 pr-16"
                        value={formatVND(field.value ?? "")}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          field.onChange(raw === "" ? "" : Number(raw));
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                        VND
                      </span>
                    </div>
                  )}
                />
              </FormFieldCustom>
            </div>
          </FormSection>

          {/* Thông tin ngân hàng */}
          <FormSection
            icon={CreditCard}
            title="Thông tin ngân hàng"
            description="Dùng cho việc chi trả lương"
          >
            <div className="space-y-5">
              <FormFieldCustom label="Tên ngân hàng" icon={Building2}>
                <Controller
                  name="bankName"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Chọn ngân hàng" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Chi nhánh" icon={MapPin}>
                <Controller
                  name="bankBranch"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="VD: Chi nhánh Quận 1"
                      className="h-10"
                    />
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Số tài khoản" icon={CreditCard}>
                <Controller
                  name="bankAccount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập số tài khoản"
                      className="h-10"
                    />
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Chủ tài khoản" icon={User}>
                <Controller
                  name="bankHolder"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Tên chủ tài khoản"
                      className="h-10"
                    />
                  )}
                />
              </FormFieldCustom>
            </div>
          </FormSection>

          {/* Tài khoản & Phân quyền */}
          <FormSection
            icon={Shield}
            title="Tài khoản & Phân quyền"
            description="Quyền truy cập hệ thống"
          >
            <div className="space-y-5">
              <FormFieldCustom label="Role hệ thống" icon={Shield}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
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
                  )}
                />
              </FormFieldCustom>

              <FormFieldCustom label="Tên đăng nhập" icon={User}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      readOnly
                      className="h-10 bg-gray-50"
                      placeholder="Tự động điền từ email"
                    />
                  )}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tự động sử dụng email làm tên đăng nhập
                </p>
              </FormFieldCustom>

              <FormFieldCustom label="Mật khẩu" icon={Lock}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Để trống để tự động tạo"
                      className="h-10"
                    />
                  )}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nếu để trống, hệ thống sẽ tự động tạo mật khẩu
                </p>
              </FormFieldCustom>
            </div>
          </FormSection>
        </div>

        {/* Hồ sơ giấy tờ */}
        <FormSection
          icon={FileText}
          title="Hồ sơ giấy tờ"
          description="Tải lên các giấy tờ cần thiết"
        >
          <Controller
            name="documents"
            control={control}
            render={({ field }) => (
              <FileUploadBox
                label="Hồ sơ giấy tờ"
                accept=".pdf,.jpg,.png"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormSection>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg rounded-t-2xl px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Trường bắt buộc
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="px-6 h-10"
              onClick={() => {
                reset();
                router.push("/members");
              }}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" className="px-8 h-10 shadow-md">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Thêm thành viên
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewMemberPage;
