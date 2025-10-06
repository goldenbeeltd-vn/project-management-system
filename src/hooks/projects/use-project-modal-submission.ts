import { useState } from "react";
import { ProjectFormData } from "./use-project-form";

interface UseProjectModalSubmissionProps {
  onSubmit?: (data: ProjectFormData) => Promise<void> | void;
  onClose: () => void;
  resetForm: () => void;
}

export function useProjectModalSubmission({
  onSubmit,
  onClose,
  resetForm,
}: UseProjectModalSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }

      // Reset form và đóng modal
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Có thể thêm toast notification ở đây
      throw error; // Re-throw để component có thể handle
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return {
    isSubmitting,
    handleSubmit,
    handleClose,
  };
}
