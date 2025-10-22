/**
 * Application Messages
 * Error messages, success messages, validation messages
 */

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    LOGIN: "Đăng nhập thành công",
    LOGOUT: "Đăng xuất thành công",
    REGISTER: "Đăng ký tài khoản thành công",
    UPDATE_PROFILE: "Cập nhật thông tin thành công",
    CREATE_PROJECT: "Tạo dự án thành công",
    UPDATE_PROJECT: "Cập nhật dự án thành công",
    DELETE_PROJECT: "Xóa dự án thành công",
    UPLOAD_FILE: "Tải file thành công",
    SAVE_CHANGES: "Lưu thay đổi thành công",
  },

  // Error messages
  ERROR: {
    GENERIC: "Đã xảy ra lỗi, vui lòng thử lại",
    NETWORK: "Lỗi kết nối mạng",
    UNAUTHORIZED: "Bạn không có quyền truy cập",
    FORBIDDEN: "Bạn không có quyền thực hiện hành động này",
    NOT_FOUND: "Không tìm thấy tài nguyên",
    VALIDATION: "Dữ liệu không hợp lệ",

    // Auth errors
    INVALID_CREDENTIALS: "Tên đăng nhập hoặc mật khẩu không chính xác",
    EMAIL_EXISTS: "Email này đã được sử dụng",
    WEAK_PASSWORD: "Mật khẩu quá yếu",
    TOKEN_EXPIRED: "Phiên đăng nhập đã hết hạn",

    // File upload errors
    FILE_TOO_LARGE: "File quá lớn",
    INVALID_FILE_TYPE: "Loại file không được hỗ trợ",
    UPLOAD_FAILED: "Tải file thất bại",
  },

  // Validation messages
  VALIDATION: {
    REQUIRED: "Trường này là bắt buộc",
    EMAIL_INVALID: "Email không hợp lệ",
    PASSWORD_MIN_LENGTH: "Mật khẩu phải có ít nhất 8 ký tự",
    PASSWORD_MISMATCH: "Mật khẩu xác nhận không khớp",
    PHONE_INVALID: "Số điện thoại không hợp lệ",
    NAME_MIN_LENGTH: "Tên phải có ít nhất 2 ký tự",
    NAME_MAX_LENGTH: "Tên không được quá 50 ký tự",
  },

  // Confirmation messages
  CONFIRM: {
    DELETE_PROJECT: "Bạn có chắc muốn xóa dự án này?",
    DELETE_USER: "Bạn có chắc muốn xóa người dùng này?",
    LOGOUT: "Bạn có muốn đăng xuất?",
    DISCARD_CHANGES: "Bạn có muốn hủy bỏ các thay đổi?",
  },

  // Info messages
  INFO: {
    LOADING: "Đang tải dữ liệu...",
    NO_DATA: "Không có dữ liệu",
    COMING_SOON: "Tính năng này sẽ sớm được ra mắt",
    MAINTENANCE: "Hệ thống đang được bảo trì",
  },
} as const;
