import { ProjectFormData, FormErrors } from "./use-project-form";

export function useProjectFormValidation() {
  const validateForm = (
    formData: ProjectFormData,
  ): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Tên dự án là bắt buộc";
    } else if (formData.name.length < 3) {
      newErrors.name = "Tên dự án phải có ít nhất 3 ký tự";
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Mô tả dự án là bắt buộc";
    } else if (formData.description.length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục dự án";
    }

    // Validate status
    if (!formData.status) {
      newErrors.status = "Vui lòng chọn trạng thái dự án";
    }

    // Validate dates
    if (formData.startDate && formData.endDate) {
      if (formData.startDate >= formData.endDate) {
        newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
      }
    }

    // Validate budget
    if (
      formData.budget &&
      isNaN(Number(formData.budget.replace(/[^0-9]/g, "")))
    ) {
      newErrors.budget = "Ngân sách phải là số hợp lệ";
    }

    // Validate client
    if (!formData.clientId) {
      newErrors.clientId = "Vui lòng chọn khách hàng";
    }

    // Validate team members
    if (formData.teamMemberIds.length === 0) {
      newErrors.teamMemberIds = "Vui lòng chọn ít nhất một thành viên";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  return { validateForm };
}
