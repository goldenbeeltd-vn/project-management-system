import { useState } from "react";
import { ProjectCategory } from "@/types/projects/common";

export interface ProjectFormData {
  name: string;
  projectCode: string;
  description: string;
  category: ProjectCategory | "";
  projectType: string;
  status: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budget: string;
  priority: string;
  contractType: string;
  clientId: string;
  teamMemberIds: string[];
  currency: string;
}

export interface FormErrors {
  name?: string;
  projectCode?: string;
  description?: string;
  category?: string;
  projectType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  priority?: string;
  contractType?: string;
  clientId?: string;
  teamMemberIds?: string;
  currency?: string;
}

const initialFormData: ProjectFormData = {
  name: "",
  projectCode: "",
  description: "",
  category: "",
  projectType: "",
  status: "planning",
  startDate: undefined,
  endDate: undefined,
  budget: "",
  priority: "medium",
  contractType: "",
  clientId: "",
  teamMemberIds: [],
  currency: "VND",
};

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof ProjectFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const setFormErrors = (newErrors: FormErrors) => {
    setErrors(newErrors);
  };

  return {
    formData,
    errors,
    handleInputChange,
    resetForm,
    setFormErrors,
  };
}
