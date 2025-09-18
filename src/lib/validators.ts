/**
 * Validation Logic
 * Form validation và business logic validation
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

export interface ValidationRules {
  [field: string]: ValidationRule;
}

export interface ValidationErrors {
  [field: string]: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[\d\s\-()]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9-]+$/,
} as const;

class Validator {
  // Validate single field
  validateField(value: unknown, rule: ValidationRule): string | null {
    const stringValue = String(value || "");

    // Required validation
    if (rule.required && (!value || stringValue.trim() === "")) {
      return "Trường này là bắt buộc";
    }

    // Skip other validations if field is empty and not required
    if (!value || stringValue.trim() === "") {
      return null;
    }

    // Min length validation
    if (rule.minLength && stringValue.length < rule.minLength) {
      return `Phải có ít nhất ${rule.minLength} ký tự`;
    }

    // Max length validation
    if (rule.maxLength && stringValue.length > rule.maxLength) {
      return `Không được quá ${rule.maxLength} ký tự`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return "Định dạng không hợp lệ";
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }

  // Validate multiple fields
  validate(
    data: Record<string, unknown>,
    rules: ValidationRules
  ): ValidationResult {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
      const value = data[field];
      const rule = rules[field];
      const error = this.validateField(value, rule);

      if (error) {
        errors[field] = error;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Pre-defined validation methods
  validateEmail(email: string): string | null {
    return this.validateField(email, {
      required: true,
      pattern: VALIDATION_PATTERNS.EMAIL,
    });
  }

  validatePassword(password: string): string | null {
    return this.validateField(password, {
      required: true,
      minLength: 8,
      pattern: VALIDATION_PATTERNS.PASSWORD,
    });
  }

  validateConfirmPassword(
    password: string,
    confirmPassword: string
  ): string | null {
    if (password !== confirmPassword) {
      return "Mật khẩu xác nhận không khớp";
    }
    return null;
  }

  validatePhone(phone: string): string | null {
    return this.validateField(phone, {
      pattern: VALIDATION_PATTERNS.PHONE,
    });
  }

  validateUrl(url: string): string | null {
    return this.validateField(url, {
      pattern: VALIDATION_PATTERNS.URL,
    });
  }

  validateRequired(value: unknown): string | null {
    return this.validateField(value, { required: true });
  }

  // Business logic validators
  validateProjectName(name: string): string | null {
    return this.validateField(name, {
      required: true,
      minLength: 2,
      maxLength: 100,
    });
  }

  validateUserRole(role: string): string | null {
    const validRoles = ["admin", "manager", "developer", "client", "guest"];
    if (!validRoles.includes(role)) {
      return "Vai trò không hợp lệ";
    }
    return null;
  }

  validateDateRange(startDate: Date, endDate: Date): string | null {
    if (startDate >= endDate) {
      return "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
    }
    if (startDate < new Date()) {
      return "Ngày bắt đầu không thể là quá khứ";
    }
    return null;
  }

  // File validation
  validateFile(
    file: File,
    options: {
      maxSize?: number;
      allowedTypes?: string[];
    } = {}
  ): string | null {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options;

    if (file.size > maxSize) {
      return `File không được vượt quá ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${allowedTypes.join(
        ", "
      )}`;
    }

    return null;
  }

  // Array validation
  validateArray(
    arr: unknown[],
    options: {
      minLength?: number;
      maxLength?: number;
      itemValidator?: (item: unknown) => string | null;
    } = {}
  ): string | null {
    const { minLength, maxLength, itemValidator } = options;

    if (minLength && arr.length < minLength) {
      return `Phải có ít nhất ${minLength} phần tử`;
    }

    if (maxLength && arr.length > maxLength) {
      return `Không được quá ${maxLength} phần tử`;
    }

    if (itemValidator) {
      for (let i = 0; i < arr.length; i++) {
        const error = itemValidator(arr[i]);
        if (error) {
          return `Phần tử thứ ${i + 1}: ${error}`;
        }
      }
    }

    return null;
  }
}

export const validator = new Validator();
export default validator;
