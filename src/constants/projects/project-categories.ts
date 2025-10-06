/**
 * Project Categories Constants
 * Danh mục dự án và các utility functions
 */
import { CategoryOption, ProjectCategory } from "@/types/projects/common";

export const PROJECT_CATEGORIES: CategoryOption[] = [
  {
    value: "wordpress",
    label: "WordPress",
    color: "bg-blue-100 text-blue-800",
    description: "Website WordPress, plugin, theme",
  },
  {
    value: "website",
    label: "Website",
    color: "bg-green-100 text-green-800",
    description: "Website tĩnh, landing page, corporate",
  },
  {
    value: "software",
    label: "Phần mềm",
    color: "bg-purple-100 text-purple-800",
    description: "Phần mềm desktop, ứng dụng quản lý",
  },
  {
    value: "mobile",
    label: "Mobile App",
    color: "bg-pink-100 text-pink-800",
    description: "Ứng dụng iOS, Android",
  },
  {
    value: "seo",
    label: "SEO",
    color: "bg-orange-100 text-orange-800",
    description: "Tối ưu SEO, marketing online",
  },
  {
    value: "ecommerce",
    label: "E-Commerce",
    color: "bg-red-100 text-red-800",
    description: "Website bán hàng, thương mại điện tử",
  },
  {
    value: "cms",
    label: "CMS",
    color: "bg-indigo-100 text-indigo-800",
    description: "Hệ thống quản lý nội dung",
  },
  {
    value: "api",
    label: "API/Backend",
    color: "bg-gray-100 text-gray-800",
    description: "API, microservices, backend",
  },
  {
    value: "system",
    label: "Hệ thống",
    color: "bg-teal-100 text-teal-800",
    description: "Hệ thống doanh nghiệp, ERP, CRM",
  },
  {
    value: "maintenance",
    label: "Bảo trì",
    color: "bg-yellow-100 text-yellow-800",
    description: "Bảo trì, cập nhật, sửa lỗi",
  },
  {
    value: "marketing",
    label: "Marketing",
    color: "bg-rose-100 text-rose-800",
    description: "Chiến dịch marketing, quảng cáo",
  },
  {
    value: "consulting",
    label: "Tư vấn",
    color: "bg-cyan-100 text-cyan-800",
    description: "Tư vấn kỹ thuật, phân tích",
  },
  {
    value: "other",
    label: "Khác",
    color: "bg-slate-100 text-slate-800",
    description: "Dự án khác",
  },
];

/**
 * Lấy thông tin category theo value
 */
export const getCategoryByValue = (
  value: ProjectCategory,
): CategoryOption | undefined => {
  return PROJECT_CATEGORIES.find((cat) => cat.value === value);
};

/**
 * Lấy tên hiển thị của category
 */
export const getCategoryLabel = (value: ProjectCategory): string => {
  const category = getCategoryByValue(value);
  return category ? category.label : "Không xác định";
};

/**
 * Lấy màu sắc của category
 */
export const getCategoryColor = (value: ProjectCategory): string => {
  const category = getCategoryByValue(value);
  return category
    ? category.color || "bg-slate-100 text-slate-800"
    : "bg-slate-100 text-slate-800";
};

/**
 * Lấy icon của category
 */
export const getCategoryIcon = (value: ProjectCategory): string => {
  const category = getCategoryByValue(value);
  return category
    ? category.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAxIzs2yRTPxONA1yBwMZdhkNwlqmIpxFug&s"
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAxIzs2yRTPxONA1yBwMZdhkNwlqmIpxFug&s";
};

/**
 * Lấy mô tả của category
 */
export const getCategoryDescription = (value: ProjectCategory): string => {
  const category = getCategoryByValue(value);
  return category ? category.description || "" : "";
};
