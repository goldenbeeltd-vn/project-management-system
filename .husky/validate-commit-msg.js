#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");

// Đọc commit message
const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

// Validate format commit message: #tagIssues - gitName - [Loại Task] - mô tả
const taskTypes = [
  // UI/UX & Design
  "Theme", // Giao diện, UI/UX
  "Design", // Thiết kế mới
  "Layout", // Bố cục trang
  "Component", // Tạo/sửa component
  "Style", // Format code, CSS, styling
  "Responsive", // Responsive design
  "Animation", // Hiệu ứng, animation

  // Features & Development
  "Feature", // Tính năng mới
  "Enhancement", // Cải tiến tính năng
  "Logic", // Business logic
  "API", // API endpoint
  "Database", // Thay đổi database
  "Auth", // Authentication/Authorization
  "Payment", // Thanh toán
  "Upload", // Upload file
  "Search", // Tính năng tìm kiếm
  "Filter", // Lọc dữ liệu
  "Sort", // Sắp xếp
  "Pagination", // Phân trang
  "Export", // Xuất dữ liệu
  "Import", // Nhập dữ liệu
  "Analytics", // Phân tích dữ liệu
  "Report", // Báo cáo
  "Dashboard", // Bảng điều khiển
  "Admin", // Tính năng admin
  "User", // Tính năng user
  "Profile", // Hồ sơ người dùng
  "Settings", // Cài đặt
  "Notification", // Thông báo
  "Email", // Email system
  "SMS", // SMS system
  "Chat", // Chat/messaging
  "Comment", // Bình luận
  "Rating", // Đánh giá
  "Review", // Nhận xét
  "Share", // Chia sẻ
  "Social", // Mạng xã hội
  "Integration", // Tích hợp bên thứ 3

  // Bug Fixes & Maintenance
  "Fix", // Sửa lỗi
  "Bugfix", // Sửa bug
  "Hotfix", // Sửa lỗi khẩn cấp
  "Patch", // Vá lỗi nhỏ
  "Debug", // Debug code
  "Error", // Xử lý lỗi
  "Validation", // Validation data

  // Code Quality & Structure
  "Refactor", // Tái cấu trúc code
  "Cleanup", // Dọn dẹp code
  "Optimize", // Tối ưu hóa
  "Perf", // Cải thiện hiệu suất
  "Memory", // Tối ưu memory
  "Speed", // Tối ưu tốc độ
  "SEO", // Tối ưu SEO
  "A11y", // Accessibility
  "PWA", // Progressive Web App

  // Security & Safety
  "Security", // Bảo mật
  "Privacy", // Riêng tư
  "Encrypt", // Mã hóa
  "Backup", // Sao lưu
  "Recovery", // Khôi phục

  // Documentation & Testing
  "Docs", // Tài liệu
  "README", // Cập nhật README
  "Test", // Thêm/sửa test
  "Unit", // Unit test
  "E2E", // End-to-end test
  "Mock", // Mock data
  "Fixture", // Test fixtures

  // Build & Deploy
  "Build", // Thay đổi build system
  "Deploy", // Triển khai
  "CI", // Cấu hình CI/CD
  "CD", // Continuous Deployment
  "Docker", // Docker container
  "K8s", // Kubernetes
  "AWS", // Amazon Web Services
  "Azure", // Microsoft Azure
  "GCP", // Google Cloud Platform
  "Vercel", // Vercel deployment
  "Netlify", // Netlify deployment

  // Dependencies & Config
  "Update", // Cập nhật dependencies
  "Upgrade", // Nâng cấp version
  "Downgrade", // Hạ cấp version
  "Install", // Cài đặt package
  "Remove", // Gỡ bỏ package
  "Config", // Cấu hình
  "Env", // Environment variables
  "Package", // Package.json changes
  "Migration", // Database migration
  "Seed", // Database seeding

  // Version Control & Process
  "Init", // Khởi tạo
  "Setup", // Thiết lập
  "Scaffold", // Tạo cấu trúc
  "Generate", // Tự động generate
  "Merge", // Merge branch
  "Revert", // Hoàn tác commit
  "Release", // Phát hành version
  "Tag", // Gắn tag
  "Branch", // Tạo/xóa branch
  "Workflow", // Quy trình làm việc

  // Work in Progress
  "WIP", // Work in Progress
  "Draft", // Bản nháp
  "Temp", // Tạm thời
  "Experiment", // Thử nghiệm
  "Prototype", // Nguyên mẫu
  "POC", // Proof of Concept
  "Research", // Nghiên cứu
  "Spike", // Technical spike

  // Business & Content
  "Content", // Nội dung
  "Copy", // Văn bản
  "Translation", // Dịch thuật
  "i18n", // Internationalization
  "l10n", // Localization
  "Business", // Business logic
  "Marketing", // Marketing features
  "Tracking", // Tracking events
  "Metrics", // Metrics collection

  // Maintenance & Operations
  "Chore", // Công việc bảo trì
  "Maintenance", // Bảo trì hệ thống
  "Monitor", // Giám sát
  "Log", // Logging
  "Cache", // Caching
  "Storage", // Lưu trữ
  "CDN", // Content Delivery Network
  "SSL", // SSL certificate
  "Domain", // Domain management
  "DNS", // DNS configuration
  "Redirect", // URL redirect
  "Sitemap", // XML sitemap
  "Robot", // Robots.txt
  "Health", // Health check
  "Status", // Status page
];

const commitRegex = new RegExp(
  `^#\\d+ - \\w+ - \\[(${taskTypes.join("|")})\\] - .+`,
);

if (!commitRegex.test(commitMsg)) {
  console.error("Format commit message không hợp lệ!");
  console.error("");
  console.error("Format yêu cầu:");
  console.error("#tagIssues - gitName - [Loại Task] - mô tả công việc");
  console.error("");
  console.error("Ví dụ:");
  console.error("#1 - TruongDann - [Feature] - Thêm tính năng đăng nhập");
  console.error("#2 - TruongDann - [Fix] - Sửa lỗi validation form");
  console.error("#3 - TruongDann - [Theme] - Cập nhật giao diện dashboard");
  console.error("#4 - TruongDann - [API] - Tạo endpoint user management");
  console.error("#5 - TruongDann - [Database] - Thêm bảng notifications");
  console.error("#6 - TruongDann - [Security] - Cập nhật mã hóa password");
  console.error("");
  console.error(
    "🏷️  Tổng cộng " + taskTypes.length + " loại Task Types có sẵn!",
  );
  console.error("");
  console.error("Các nhóm Task Types chính:");
  console.error("");
  console.error("UI/UX & Design:");
  console.error(
    "• Theme, Design, Layout, Component, Style, Responsive, Animation",
  );
  console.error("");
  console.error("Features & Development:");
  console.error(
    "• Feature, Enhancement, API, Database, Auth, Payment, Dashboard",
  );
  console.error("• Search, Filter, Analytics, Report, User, Admin, Settings");
  console.error("• Upload, Export, Import, Notification, Email, Chat, Social");
  console.error("");
  console.error("Bug Fixes & Maintenance:");
  console.error("• Fix, Bugfix, Hotfix, Patch, Debug, Error, Validation");
  console.error("");
  console.error("Code Quality:");
  console.error(
    "• Refactor, Cleanup, Optimize, Perf, Memory, Speed, SEO, A11y",
  );
  console.error("");
  console.error("Security & Safety:");
  console.error("• Security, Privacy, Encrypt, Backup, Recovery");
  console.error("");
  console.error("Documentation & Testing:");
  console.error("• Docs, Test, Unit, E2E, Mock, README");
  console.error("");
  console.error("Build & Deploy:");
  console.error("• Build, Deploy, CI, CD, Docker, AWS, Vercel, K8s");
  console.error("");
  console.error("Dependencies & Config:");
  console.error("• Update, Config, Package, Migration, Env, Install");
  console.error("");
  console.error("Work in Progress:");
  console.error("• WIP, Draft, Experiment, Prototype, POC, Research");
  console.error("");
  console.error("Business & Content:");
  console.error("• Content, Marketing, Analytics, Business, Translation");
  console.error("");
  console.error("Operations:");
  console.error("• Monitor, Cache, CDN, SSL, DNS, Health, Status");
  console.error("");
  console.error("Commit message của bạn:");
  console.error(`"${commitMsg}"`);

  process.exit(1);
}

console.log("Format commit message hợp lệ!");
