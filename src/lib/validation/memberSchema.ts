import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1, "Họ tên bắt buộc"),
  dob: z.string().optional(),
  gender: z.enum(["Nam", "Nữ", "Khác"]),
  email: z.email("Email không hợp lệ").min(1, "Email bắt buộc"),
  phone: z.string().optional(),
  address: z.string().optional(),
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  bankAccount: z.string().optional(),
  bankHolder: z.string().optional(),
  startDate: z.string().optional(),
  department: z.string().min(1, "Phòng ban bắt buộc"),
  position: z.string().min(1, "Vị trí bắt buộc"),
  salary: z.number("Lương cơ bản phải là số").min(0, "Lương cơ bản bắt buộc"),
  allowance: z.number("Phụ cấp phải là số").min(0).optional(),
  status: z.string(),
  role: z.string(),
  username: z.string(),
  password: z.string().optional(),
  documents: z.array(z.instanceof(File)).optional(),
});

export type MemberFormType = z.infer<typeof memberSchema>;
