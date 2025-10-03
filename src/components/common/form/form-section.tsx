import { LucideIcon } from "lucide-react";

const FormSection = ({
  icon: Icon,
  title,
  children,
  description,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  children: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-lg p-2">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default FormSection;
