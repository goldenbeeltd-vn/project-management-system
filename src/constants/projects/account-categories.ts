import { AccountCategory, AccountType } from "@/types/projects/accounts";

/**
 * Account categories with their respective types and metadata
 */
export const ACCOUNT_CATEGORIES: AccountCategory[] = [
  {
    id: "infrastructure",
    name: "Hạ tầng & Hosting",
    description: "Quản lý hosting, VPS, domain và các dịch vụ hạ tầng",
    icon: "Server",
    types: [
      "hosting",
      "vps",
      "domain",
      "cdn",
      "ssl",
      "cloudflare",
      "aws",
      "azure",
    ],
  },
  {
    id: "app-stores",
    name: "Cửa hàng ứng dụng",
    description: "Tài khoản Google Play, App Store và các cửa hàng ứng dụng",
    icon: "Smartphone",
    types: ["chplay", "appstore"],
  },
  {
    id: "version-control",
    name: "Quản lý mã nguồn",
    description: "GitHub, GitLab, BitBucket và các dịch vụ quản lý code",
    icon: "Code",
    types: ["github", "gitlab", "bitbucket"],
  },
  {
    id: "design-tools",
    name: "Công cụ thiết kế",
    description: "Canva, Figma, Adobe và các công cụ thiết kế",
    icon: "Palette",
    types: ["canva", "figma", "adobe"],
  },
  {
    id: "api-services",
    name: "API & Dịch vụ",
    description: "Google API, Facebook API và các dịch vụ API khác",
    icon: "Key",
    types: ["google-api", "facebook-api", "twitter-api", "firebase"],
  },
  {
    id: "databases",
    name: "Cơ sở dữ liệu",
    description: "MongoDB, MySQL, PostgreSQL và các dịch vụ database",
    icon: "Database",
    types: ["mongodb", "mysql", "postgresql", "redis"],
  },
  {
    id: "payment",
    name: "Thanh toán",
    description: "Stripe, PayPal và các dịch vụ thanh toán",
    icon: "CreditCard",
    types: ["stripe", "paypal"],
  },
  {
    id: "communication",
    name: "Liên lạc & Thông báo",
    description: "Email, SMS, Push notification",
    icon: "Mail",
    types: ["email", "sms", "push-notification"],
  },
  {
    id: "analytics",
    name: "Phân tích & SEO",
    description: "Google Analytics, SEO tools và các công cụ phân tích",
    icon: "BarChart",
    types: ["analytics", "seo-tools"],
  },
  {
    id: "social-media",
    name: "Mạng xã hội",
    description: "Facebook, Twitter, LinkedIn và các mạng xã hội",
    icon: "MonitorSpeaker",
    types: ["social-media"],
  },
  {
    id: "monitoring",
    name: "Giám sát & Backup",
    description: "Monitoring, backup và các dịch vụ bảo trì",
    icon: "Shield",
    types: ["monitoring", "backup"],
  },
  {
    id: "other",
    name: "Khác",
    description: "Các tài khoản khác không thuộc danh mục trên",
    icon: "Package",
    types: ["other"],
  },
];

/**
 * Account type configurations with specific field requirements
 */
export const ACCOUNT_TYPE_CONFIGS: Record<
  AccountType,
  {
    name: string;
    description?: string;
    requiredFields: string[];
    optionalFields: string[];
    fieldLabels: Record<string, string>;
    placeholders: Record<string, string>;
  }
> = {
  hosting: {
    name: "Hosting",
    description: "Tài khoản hosting website",
    requiredFields: ["name", "url", "username"],
    optionalFields: ["password", "email", "notes"],
    fieldLabels: {
      url: "URL Control Panel",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      email: "Email tài khoản",
    },
    placeholders: {
      name: "Tên hosting (VD: VPS Digital Ocean)",
      url: "https://panel.hosting.com",
      username: "username hoặc email",
      password: "Mật khẩu",
      email: "Email tài khoản hosting",
    },
  },
  vps: {
    name: "VPS",
    description: "Virtual Private Server",
    requiredFields: ["name", "url", "username"],
    optionalFields: ["password", "port", "notes"],
    fieldLabels: {
      url: "IP Address/Domain",
      username: "SSH Username",
      password: "SSH Password/Key",
      port: "SSH Port",
    },
    placeholders: {
      name: "Tên VPS (VD: AWS EC2 Production)",
      url: "192.168.1.100 hoặc server.domain.com",
      username: "root hoặc ubuntu",
      password: "Mật khẩu hoặc SSH key",
      port: "22",
    },
  },
  domain: {
    name: "Tên miền",
    description: "Quản lý tên miền",
    requiredFields: ["name", "url"],
    optionalFields: [
      "username",
      "password",
      "email",
      "expirationDate",
      "notes",
    ],
    fieldLabels: {
      url: "Nhà cung cấp domain",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      email: "Email đăng ký",
      expirationDate: "Ngày hết hạn",
    },
    placeholders: {
      name: "example.com",
      url: "https://namecheap.com",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      email: "Email đăng ký domain",
    },
  },
  chplay: {
    name: "Google Play Console",
    description: "Tài khoản Google Play Developer",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "notes"],
    fieldLabels: {
      email: "Email tài khoản",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản Play Console",
      email: "developer@company.com",
      password: "Mật khẩu Google",
    },
  },
  appstore: {
    name: "App Store Connect",
    description: "Tài khoản Apple Developer",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "notes"],
    fieldLabels: {
      email: "Apple ID",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản App Store",
      email: "developer@company.com",
      password: "Mật khẩu Apple ID",
    },
  },
  github: {
    name: "GitHub",
    description: "Tài khoản GitHub",
    requiredFields: ["name", "username"],
    optionalFields: ["email", "password", "accessToken", "notes"],
    fieldLabels: {
      username: "GitHub Username",
      email: "Email",
      password: "Mật khẩu",
      accessToken: "Personal Access Token",
    },
    placeholders: {
      name: "Tên tài khoản GitHub",
      username: "github_username",
      email: "email@company.com",
      password: "Mật khẩu GitHub",
      accessToken: "ghp_xxxxxxxxxxxxxxxxxxxx",
    },
  },
  gitlab: {
    name: "GitLab",
    description: "Tài khoản GitLab",
    requiredFields: ["name", "username"],
    optionalFields: ["email", "password", "accessToken", "url", "notes"],
    fieldLabels: {
      username: "GitLab Username",
      email: "Email",
      password: "Mật khẩu",
      accessToken: "Access Token",
      url: "GitLab URL",
    },
    placeholders: {
      name: "Tên tài khoản GitLab",
      username: "gitlab_username",
      email: "email@company.com",
      password: "Mật khẩu GitLab",
      accessToken: "glpat-xxxxxxxxxxxxxxxxxxxx",
      url: "https://gitlab.com (nếu self-hosted)",
    },
  },
  bitbucket: {
    name: "Bitbucket",
    description: "Tài khoản Bitbucket",
    requiredFields: ["name", "username"],
    optionalFields: ["email", "password", "accessToken", "notes"],
    fieldLabels: {
      username: "Bitbucket Username",
      email: "Email",
      password: "Mật khẩu",
      accessToken: "App Password",
    },
    placeholders: {
      name: "Tên tài khoản Bitbucket",
      username: "bitbucket_username",
      email: "email@company.com",
      password: "Mật khẩu Bitbucket",
      accessToken: "App password từ Bitbucket",
    },
  },
  canva: {
    name: "Canva",
    description: "Tài khoản Canva Pro",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "notes"],
    fieldLabels: {
      email: "Email tài khoản",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản Canva",
      email: "design@company.com",
      password: "Mật khẩu Canva",
    },
  },
  figma: {
    name: "Figma",
    description: "Tài khoản Figma",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "accessToken", "notes"],
    fieldLabels: {
      email: "Email tài khoản",
      password: "Mật khẩu",
      accessToken: "Personal Access Token",
    },
    placeholders: {
      name: "Tên tài khoản Figma",
      email: "design@company.com",
      password: "Mật khẩu Figma",
      accessToken: "figd_xxxxxxxxxxxxxxxxxx",
    },
  },
  adobe: {
    name: "Adobe Creative Cloud",
    description: "Tài khoản Adobe CC",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "notes"],
    fieldLabels: {
      email: "Adobe ID",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản Adobe",
      email: "creative@company.com",
      password: "Mật khẩu Adobe",
    },
  },
  "google-api": {
    name: "Google API",
    description: "Google Cloud Platform API",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["email", "secretKey", "notes"],
    fieldLabels: {
      apiKey: "API Key",
      email: "Email tài khoản",
      secretKey: "Secret Key",
    },
    placeholders: {
      name: "Tên project Google API",
      apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx",
      email: "api@company.com",
      secretKey: "Secret key (nếu có)",
    },
  },
  "facebook-api": {
    name: "Facebook API",
    description: "Facebook Graph API",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "accessToken", "notes"],
    fieldLabels: {
      apiKey: "App ID",
      secretKey: "App Secret",
      accessToken: "Access Token",
    },
    placeholders: {
      name: "Tên Facebook App",
      apiKey: "123456789012345",
      secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      accessToken: "EAAxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  },
  "twitter-api": {
    name: "Twitter API",
    description: "Twitter/X API",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "accessToken", "notes"],
    fieldLabels: {
      apiKey: "Consumer Key",
      secretKey: "Consumer Secret",
      accessToken: "Access Token",
    },
    placeholders: {
      name: "Tên Twitter App",
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxx",
      secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      accessToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  },
  firebase: {
    name: "Firebase",
    description: "Google Firebase",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "url", "notes"],
    fieldLabels: {
      apiKey: "Web API Key",
      secretKey: "Private Key",
      url: "Project URL",
    },
    placeholders: {
      name: "Tên Firebase Project",
      apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxx",
      secretKey: "Service Account Key (JSON)",
      url: "https://project-id.firebaseio.com",
    },
  },
  aws: {
    name: "Amazon AWS",
    description: "Amazon Web Services",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "notes"],
    fieldLabels: {
      apiKey: "Access Key ID",
      secretKey: "Secret Access Key",
    },
    placeholders: {
      name: "Tên AWS Account",
      apiKey: "AKIAXXXXXXXXXXXXXXXXX",
      secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  },
  azure: {
    name: "Microsoft Azure",
    description: "Microsoft Azure Cloud",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "notes"],
    fieldLabels: {
      apiKey: "Application ID",
      secretKey: "Client Secret",
    },
    placeholders: {
      name: "Tên Azure App",
      apiKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  },
  cloudflare: {
    name: "Cloudflare",
    description: "Cloudflare CDN & Security",
    requiredFields: ["name", "email"],
    optionalFields: ["apiKey", "password", "notes"],
    fieldLabels: {
      email: "Email tài khoản",
      apiKey: "API Token",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản Cloudflare",
      email: "admin@company.com",
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      password: "Mật khẩu Cloudflare",
    },
  },
  mongodb: {
    name: "MongoDB",
    description: "MongoDB Database",
    requiredFields: ["name", "url"],
    optionalFields: ["username", "password", "database", "port", "notes"],
    fieldLabels: {
      url: "Connection URL/Host",
      username: "Database User",
      password: "Password",
      database: "Database Name",
      port: "Port",
    },
    placeholders: {
      name: "Tên MongoDB Instance",
      url: "mongodb://localhost hoặc mongodb+srv://...",
      username: "db_user",
      password: "db_password",
      database: "database_name",
      port: "27017",
    },
  },
  mysql: {
    name: "MySQL",
    description: "MySQL Database",
    requiredFields: ["name", "url"],
    optionalFields: ["username", "password", "database", "port", "notes"],
    fieldLabels: {
      url: "Host",
      username: "Username",
      password: "Password",
      database: "Database Name",
      port: "Port",
    },
    placeholders: {
      name: "Tên MySQL Database",
      url: "localhost hoặc mysql.example.com",
      username: "mysql_user",
      password: "mysql_password",
      database: "database_name",
      port: "3306",
    },
  },
  postgresql: {
    name: "PostgreSQL",
    description: "PostgreSQL Database",
    requiredFields: ["name", "url"],
    optionalFields: ["username", "password", "database", "port", "notes"],
    fieldLabels: {
      url: "Host",
      username: "Username",
      password: "Password",
      database: "Database Name",
      port: "Port",
    },
    placeholders: {
      name: "Tên PostgreSQL Database",
      url: "localhost hoặc postgres.example.com",
      username: "postgres_user",
      password: "postgres_password",
      database: "database_name",
      port: "5432",
    },
  },
  redis: {
    name: "Redis",
    description: "Redis Cache",
    requiredFields: ["name", "url"],
    optionalFields: ["password", "port", "notes"],
    fieldLabels: {
      url: "Host",
      password: "Password",
      port: "Port",
    },
    placeholders: {
      name: "Tên Redis Instance",
      url: "localhost hoặc redis.example.com",
      password: "redis_password",
      port: "6379",
    },
  },
  stripe: {
    name: "Stripe",
    description: "Stripe Payment Gateway",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "notes"],
    fieldLabels: {
      apiKey: "Publishable Key",
      secretKey: "Secret Key",
    },
    placeholders: {
      name: "Tên Stripe Account",
      apiKey: "pk_test_EXAMPLE_KEY_ONLY",
      secretKey: "sk_test_EXAMPLE_KEY_ONLY",
    },
  },
  paypal: {
    name: "PayPal",
    description: "PayPal Payment",
    requiredFields: ["name", "email"],
    optionalFields: ["apiKey", "secretKey", "notes"],
    fieldLabels: {
      email: "PayPal Email",
      apiKey: "Client ID",
      secretKey: "Client Secret",
    },
    placeholders: {
      name: "Tên PayPal Account",
      email: "business@company.com",
      apiKey: "EXAMPLE_CLIENT_ID_ONLY",
      secretKey: "EXAMPLE_CLIENT_SECRET_ONLY",
    },
  },
  email: {
    name: "Email Service",
    description: "Email SMTP/API Service",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "url", "port", "apiKey", "notes"],
    fieldLabels: {
      email: "Email/Username",
      password: "Password",
      url: "SMTP Server",
      port: "Port",
      apiKey: "API Key",
    },
    placeholders: {
      name: "Tên Email Service",
      email: "smtp@company.com",
      password: "email_password",
      url: "smtp.gmail.com",
      port: "587",
      apiKey: "API Key (nếu sử dụng API)",
    },
  },
  sms: {
    name: "SMS Service",
    description: "SMS API Service",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "url", "notes"],
    fieldLabels: {
      apiKey: "API Key",
      secretKey: "Secret Key",
      url: "API Endpoint",
    },
    placeholders: {
      name: "Tên SMS Service",
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      url: "https://api.smsservice.com",
    },
  },
  "push-notification": {
    name: "Push Notification",
    description: "Push Notification Service",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "notes"],
    fieldLabels: {
      apiKey: "Server Key",
      secretKey: "Sender ID",
    },
    placeholders: {
      name: "Tên Push Service",
      apiKey: "AAAAxxxxxxx:APA91bxxxxxxxxxxxxxxxxxx",
      secretKey: "123456789012",
    },
  },
  analytics: {
    name: "Analytics",
    description: "Google Analytics, etc.",
    requiredFields: ["name", "apiKey"],
    optionalFields: ["secretKey", "notes"],
    fieldLabels: {
      apiKey: "Tracking ID/API Key",
      secretKey: "Secret Key",
    },
    placeholders: {
      name: "Tên Analytics Property",
      apiKey: "GA_TRACKING_ID hoặc API Key",
      secretKey: "Secret Key (nếu có)",
    },
  },
  "seo-tools": {
    name: "SEO Tools",
    description: "SEMrush, Ahrefs, etc.",
    requiredFields: ["name", "email"],
    optionalFields: ["password", "apiKey", "notes"],
    fieldLabels: {
      email: "Email tài khoản",
      password: "Mật khẩu",
      apiKey: "API Key",
    },
    placeholders: {
      name: "Tên SEO Tool",
      email: "seo@company.com",
      password: "Mật khẩu",
      apiKey: "API Key (nếu có)",
    },
  },
  "social-media": {
    name: "Social Media",
    description: "Facebook, Instagram, etc.",
    requiredFields: ["name", "username"],
    optionalFields: ["email", "password", "notes"],
    fieldLabels: {
      username: "Username/Page ID",
      email: "Email tài khoản",
      password: "Mật khẩu",
    },
    placeholders: {
      name: "Tên tài khoản/trang",
      username: "username hoặc page_id",
      email: "social@company.com",
      password: "Mật khẩu",
    },
  },
  cdn: {
    name: "CDN Service",
    description: "Content Delivery Network",
    requiredFields: ["name", "url"],
    optionalFields: ["apiKey", "secretKey", "notes"],
    fieldLabels: {
      url: "CDN URL",
      apiKey: "API Key",
      secretKey: "Secret Key",
    },
    placeholders: {
      name: "Tên CDN Service",
      url: "https://cdn.example.com",
      apiKey: "API Key",
      secretKey: "Secret Key",
    },
  },
  ssl: {
    name: "SSL Certificate",
    description: "SSL/TLS Certificate",
    requiredFields: ["name", "url"],
    optionalFields: ["expirationDate", "notes"],
    fieldLabels: {
      url: "Domain/Provider",
      expirationDate: "Ngày hết hạn",
    },
    placeholders: {
      name: "Tên SSL Certificate",
      url: "example.com hoặc Let's Encrypt",
    },
  },
  monitoring: {
    name: "Monitoring",
    description: "Server/App Monitoring",
    requiredFields: ["name", "url"],
    optionalFields: ["apiKey", "username", "password", "notes"],
    fieldLabels: {
      url: "Monitor URL",
      apiKey: "API Key",
      username: "Username",
      password: "Password",
    },
    placeholders: {
      name: "Tên Monitoring Service",
      url: "https://monitor.example.com",
      apiKey: "API Key",
      username: "Username",
      password: "Password",
    },
  },
  backup: {
    name: "Backup Service",
    description: "Backup & Recovery",
    requiredFields: ["name", "url"],
    optionalFields: ["apiKey", "username", "password", "notes"],
    fieldLabels: {
      url: "Backup URL/Location",
      apiKey: "API Key",
      username: "Username",
      password: "Password",
    },
    placeholders: {
      name: "Tên Backup Service",
      url: "https://backup.example.com",
      apiKey: "API Key",
      username: "Username",
      password: "Password",
    },
  },
  other: {
    name: "Khác",
    description: "Tài khoản khác",
    requiredFields: ["name"],
    optionalFields: ["username", "email", "password", "apiKey", "url", "notes"],
    fieldLabels: {
      username: "Tên đăng nhập",
      email: "Email",
      password: "Mật khẩu",
      apiKey: "API Key",
      url: "URL",
    },
    placeholders: {
      name: "Tên tài khoản",
      username: "Username",
      email: "Email",
      password: "Password",
      apiKey: "API Key",
      url: "URL",
    },
  },
};

/**
 * Get account type configuration
 */
export const getAccountTypeConfig = (type: AccountType) => {
  return ACCOUNT_TYPE_CONFIGS[type];
};

/**
 * Get account category by ID
 */
export const getAccountCategory = (categoryId: string) => {
  return ACCOUNT_CATEGORIES.find((category) => category.id === categoryId);
};

/**
 * Get account types by category
 */
export const getAccountTypesByCategory = (categoryId: string) => {
  const category = getAccountCategory(categoryId);
  return category ? category.types : [];
};
