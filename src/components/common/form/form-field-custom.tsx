import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

type FormFieldProps = {
  label: React.ReactNode;
  required?: boolean;
  error?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
};

const FormFieldCustom = ({
  label,
  required,
  error,
  icon: Icon,
  children,
}: FormFieldProps) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
    {error && (
      <div className="flex items-center gap-1 text-xs text-red-600">
        <AlertCircle className="w-3 h-3" />
        {error}
      </div>
    )}
  </div>
);

export default FormFieldCustom;
