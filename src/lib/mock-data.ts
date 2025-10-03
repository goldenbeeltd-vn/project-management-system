export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "manager" | "developer" | "qc" | "devops";
  phone?: string;
  position?: string;
  department?: string;
  salary?: {
    hourlyRate: number; // VND per hour
    monthlyRate: number; // VND per month
    overtimeRate: number; // VND per overtime hour
  };
  experience?: string; // e.g., "2+ years", "Senior", etc.
  skills?: string[];
}

export interface Account {
  id: string;
  projectId: string;
  type: "admin" | "user" | "api";
  username: string;
  password?: string;
  apiKey?: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

export interface Hosting {
  id: string;
  projectId: string;
  provider: string;
  url: string;
  domain: string;
  server: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  expiryDate: string;
  cost: number;
  renewalDate: string;
  status: "active" | "expired" | "suspended";
  credentials: {
    username: string;
    password: string;
    ftpDetails?: {
      host: string;
      port: number;
      username: string;
      password: string;
    };
  };
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  contractValue: number;
  contractDate: string;
  renewalDate: string;
  feedback: {
    rating: number;
    comment: string;
    date: string;
  }[];
  projects: string[];
}

import { ProjectCategory } from "@/types/projects/common";

export interface Project {
  id: string;
  name: string;
  description: string;
  type: "web" | "mobile" | "desktop" | "api" | "other";
  category: ProjectCategory;
  status:
    | "planning"
    | "in_progress"
    | "on_hold"
    | "completed"
    | "cancelled"
    | "maintenance";
  priority: "low" | "medium" | "high" | "urgent";
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  progress: number;
  manager: User;
  team: {
    frontend: User[];
    backend: User[];
    qc: User[];
    devops: User[];
  };
  clientId: string;
  hosting?: Hosting;
  accounts: Account[];
  risks: Risk[];
  documents: {
    id: string;
    name: string;
    url: string;
    type: "contract" | "design" | "technical" | "other";
    uploadDate: string;
  }[];
  integrations: {
    jira?: {
      projectKey: string;
      url: string;
      lastSync: string;
    };
    github?: {
      repository: string;
      branch: string;
    };
    slack?: {
      channelId: string;
      webhookUrl: string;
    };
  };
  maintenance?: {
    isActive: boolean;
    supportLevel: "basic" | "standard" | "premium";
    responsibleTeam: User[];
    nextReview: string;
    issues: {
      id: string;
      title: string;
      description: string;
      priority: "low" | "medium" | "high" | "urgent";
      status: "open" | "in_progress" | "resolved";
      createdAt: string;
      resolvedAt?: string;
    }[];
  };
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  level: "low" | "medium" | "high";
  status: "open" | "mitigated" | "closed";
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: User;
  projectId: string;
  createdAt: string;
  dueDate: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  fileCount: number;
  color: string;
  lastModified: string;
  size?: number;
  files?: DocumentFile[];
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  url?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "an@company.com",
    avatar: "/api/placeholder/40/40",
    role: "manager",
    phone: "0901234567",
    position: "Project Manager",
    department: "Quản lý dự án",
    salary: {
      hourlyRate: 500000,
      monthlyRate: 25000000,
      overtimeRate: 750000,
    },
    experience: "5+ years",
    skills: ["Project Management", "Scrum", "Leadership", "Planning"],
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "binh@company.com",
    avatar: "/api/placeholder/40/40",
    role: "developer",
    phone: "0901234568",
    position: "Frontend Developer",
    department: "Phát triển",
    salary: {
      hourlyRate: 350000,
      monthlyRate: 18000000,
      overtimeRate: 525000,
    },
    experience: "3+ years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX"],
  },
  {
    id: "3",
    name: "Lê Văn Cường",
    email: "cuong@company.com",
    avatar: "/api/placeholder/40/40",
    role: "developer",
    phone: "0901234569",
    position: "Backend Developer",
    department: "Phát triển",
    salary: {
      hourlyRate: 380000,
      monthlyRate: 20000000,
      overtimeRate: 570000,
    },
    experience: "4+ years",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
  },
  {
    id: "4",
    name: "Phạm Thị Dung",
    email: "dung@company.com",
    avatar: "/api/placeholder/40/40",
    role: "qc",
    phone: "0901234570",
    position: "QC Tester",
    department: "QC & Testing",
    salary: {
      hourlyRate: 300000,
      monthlyRate: 15000000,
      overtimeRate: 450000,
    },
    experience: "2+ years",
    skills: ["Manual Testing", "Automated Testing", "Selenium", "Bug Tracking"],
  },
  {
    id: "5",
    name: "Hoàng Văn Em",
    email: "em@company.com",
    avatar: "/api/placeholder/40/40",
    role: "devops",
    phone: "0901234571",
    position: "DevOps Engineer",
    department: "DevOps & Infrastructure",
    salary: {
      hourlyRate: 400000,
      monthlyRate: 22000000,
      overtimeRate: 600000,
    },
    experience: "3+ years",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    id: "6",
    name: "Võ Thị Fong",
    email: "fong@company.com",
    avatar: "/api/placeholder/40/40",
    role: "admin",
    phone: "0901234572",
    position: "System Admin",
    department: "IT & Administration",
    salary: {
      hourlyRate: 450000,
      monthlyRate: 20000000,
      overtimeRate: 675000,
    },
    experience: "5+ years",
    skills: ["System Administration", "Network Management", "Security"],
  },
  {
    id: "7",
    name: "Đặng Văn Giang",
    email: "giang@company.com",
    avatar: "/api/placeholder/40/40",
    role: "developer",
    phone: "0901234573",
    position: "Mobile Developer",
    department: "Phát triển",
    salary: {
      hourlyRate: 370000,
      monthlyRate: 19000000,
      overtimeRate: 555000,
    },
    experience: "3+ years",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
  },
  {
    id: "8",
    name: "Bùi Thị Hạnh",
    email: "hanh@company.com",
    avatar: "/api/placeholder/40/40",
    role: "manager",
    phone: "0901234574",
    position: "Technical Lead",
    department: "Quản lý dự án",
    salary: {
      hourlyRate: 480000,
      monthlyRate: 24000000,
      overtimeRate: 720000,
    },
    experience: "6+ years",
    skills: [
      "Technical Leadership",
      "Architecture",
      "Code Review",
      "Mentoring",
    ],
  },
  {
    id: "9",
    name: "Phan Văn Ích",
    email: "ich@company.com",
    avatar: "/api/placeholder/40/40",
    role: "developer",
    phone: "0901234575",
    position: "Full Stack Developer",
    department: "Phát triển",
    salary: {
      hourlyRate: 420000,
      monthlyRate: 21000000,
      overtimeRate: 630000,
    },
    experience: "4+ years",
    skills: ["React", "Node.js", "MongoDB", "Express", "GraphQL"],
  },
  {
    id: "10",
    name: "Lý Thị Kiều",
    email: "kieu@company.com",
    avatar: "/api/placeholder/40/40",
    role: "qc",
    phone: "0901234576",
    position: "QA Lead",
    department: "QC & Testing",
    salary: {
      hourlyRate: 350000,
      monthlyRate: 17000000,
      overtimeRate: 525000,
    },
    experience: "4+ years",
    skills: [
      "Test Strategy",
      "Team Management",
      "Automation",
      "Quality Assurance",
    ],
  },
];

// Mock Clients - Updated with more fields
export const mockClients: Client[] = [
  {
    id: "1",
    name: "Công ty ABC",
    industry: "Thương mại điện tử",
    contact: "Mr. Minh",
    email: "minh@abc.com",
    phone: "0281234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    contractValue: 250000000,
    contractDate: "2024-01-01",
    renewalDate: "2025-01-01",
    feedback: [
      {
        rating: 4,
        comment: "Dự án được thực hiện tốt, đúng tiến độ",
        date: "2024-07-15",
      },
    ],
    projects: ["1"],
  },
  {
    id: "2",
    name: "Tập đoàn XYZ",
    industry: "Dịch vụ nhân sự",
    contact: "Ms. Hoa",
    email: "hoa@xyz.vn",
    phone: "0281234568",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    contractValue: 180000000,
    contractDate: "2023-10-01",
    renewalDate: "2024-10-01",
    feedback: [
      {
        rating: 5,
        comment: "Hệ thống hoạt động ổn định, hỗ trợ tốt",
        date: "2024-03-10",
      },
    ],
    projects: ["2"],
  },
  {
    id: "3",
    name: "FastShip Co.",
    industry: "Logistics",
    contact: "Mr. Tùng",
    email: "tung@fastship.vn",
    phone: "0281234569",
    address: "789 Đường FastShip, Quận 7, TP.HCM",
    contractValue: 300000000,
    contractDate: "2024-04-01",
    renewalDate: "2025-04-01",
    feedback: [],
    projects: ["3"],
  },
  {
    id: "4",
    name: "TechStart Vietnam",
    industry: "Fintech",
    contact: "Ms. Lan",
    email: "lan@techstart.vn",
    phone: "0281234570",
    address: "101 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    contractValue: 450000000,
    contractDate: "2024-03-01",
    renewalDate: "2025-03-01",
    feedback: [
      {
        rating: 5,
        comment: "Chất lượng xuất sắc, đội ngũ chuyên nghiệp",
        date: "2024-08-01",
      },
    ],
    projects: ["4"],
  },
  {
    id: "5",
    name: "EduSoft Solutions",
    industry: "Giáo dục",
    contact: "Mr. Nam",
    email: "nam@edusoft.edu.vn",
    phone: "0281234571",
    address: "25 Võ Văn Tần, Quận 3, TP.HCM",
    contractValue: 320000000,
    contractDate: "2024-02-15",
    renewalDate: "2025-02-15",
    feedback: [
      {
        rating: 4,
        comment: "Sản phẩm đáp ứng tốt yêu cầu giáo dục",
        date: "2024-06-20",
      },
    ],
    projects: ["5"],
  },
  {
    id: "6",
    name: "MedCare Hospital",
    industry: "Y tế",
    contact: "Dr. Phong",
    email: "phong@medcare.vn",
    phone: "0281234572",
    address: "300 Pasteur, Quận 1, TP.HCM",
    contractValue: 580000000,
    contractDate: "2023-12-01",
    renewalDate: "2024-12-01",
    feedback: [
      {
        rating: 5,
        comment: "Hệ thống quản lý bệnh viện hiệu quả",
        date: "2024-05-15",
      },
    ],
    projects: ["6"],
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Bán Hàng ABC Shop",
    description:
      "Phát triển website thương mại điện tử với đầy đủ tính năng thanh toán, quản lý kho, CRM",
    type: "web",
    category: "ecommerce",
    status: "in_progress",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 250000000,
    actualCost: 180000000,
    progress: 65,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1], mockUsers[2]],
      backend: [mockUsers[2], mockUsers[4]],
      qc: [mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "1",
    hosting: {
      id: "1",
      projectId: "1",
      provider: "AWS",
      url: "https://abc-shop.com",
      domain: "abc-shop.com",
      server: {
        cpu: "4 cores",
        ram: "8GB",
        storage: "100GB SSD",
        bandwidth: "1TB/month",
      },
      expiryDate: "2025-01-15",
      cost: 2000000,
      renewalDate: "2025-01-01",
      status: "active",
      credentials: {
        username: "admin",
        password: "secretpass123",
        ftpDetails: {
          host: "ftp.abc-shop.com",
          port: 21,
          username: "ftpuser",
          password: "ftppass123",
        },
      },
    },
    accounts: [
      {
        id: "1",
        projectId: "1",
        type: "admin",
        username: "admin@abc-shop.com",
        password: "admin123",
        permissions: ["full_access"],
        lastLogin: "2024-08-20",
        isActive: true,
      },
    ],
    risks: [
      {
        id: "1",
        title: "Delay API Third-party",
        description: "API thanh toán có thể bị delay do bên thứ 3",
        level: "medium",
        status: "open",
        createdAt: "2024-03-01",
      },
    ],
    documents: [
      {
        id: "1",
        name: "Hợp đồng dự án ABC",
        url: "/documents/abc-contract.pdf",
        type: "contract",
        uploadDate: "2024-01-15",
      },
    ],
    integrations: {
      jira: {
        projectKey: "ABC",
        url: "https://company.atlassian.net/browse/ABC",
        lastSync: "2024-08-20",
      },
    },
  },
  {
    id: "2",
    name: "Hệ Thống Quản Lý Nhân Sự",
    description:
      "Xây dựng hệ thống quản lý nhân sự toàn diện cho doanh nghiệp 500+ nhân viên",
    type: "web",
    category: "system",
    status: "maintenance",
    priority: "medium",
    startDate: "2023-10-01",
    endDate: "2024-02-28",
    budget: 180000000,
    actualCost: 175000000,
    progress: 100,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1]],
      backend: [mockUsers[2], mockUsers[4]],
      qc: [mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "2",
    hosting: {
      id: "2",
      projectId: "2",
      provider: "VPS",
      url: "https://hrm-xyz.vn",
      domain: "hrm-xyz.vn",
      server: {
        cpu: "2 cores",
        ram: "4GB",
        storage: "50GB SSD",
        bandwidth: "500GB/month",
      },
      expiryDate: "2024-12-01",
      cost: 1500000,
      renewalDate: "2024-11-01",
      status: "active",
      credentials: {
        username: "root",
        password: "vpspass123",
      },
    },
    accounts: [],
    risks: [],
    documents: [],
    integrations: {},
    maintenance: {
      isActive: true,
      supportLevel: "standard",
      responsibleTeam: [mockUsers[2], mockUsers[4]],
      nextReview: "2024-09-01",
      issues: [
        {
          id: "1",
          title: "Báo cáo tháng bị lỗi",
          description: "Module báo cáo không hiển thị đúng dữ liệu tháng",
          priority: "medium",
          status: "in_progress",
          createdAt: "2024-08-15",
        },
      ],
    },
  },
  {
    id: "3",
    name: "App Mobile Giao Hàng",
    description: "Ứng dụng mobile cho dịch vụ giao hàng nhanh trong thành phố",
    type: "mobile",
    category: "mobile",
    status: "planning",
    priority: "urgent",
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    budget: 300000000,
    actualCost: 45000000,
    progress: 15,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[6]],
      backend: [mockUsers[2], mockUsers[8]],
      qc: [mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "3",
    accounts: [],
    risks: [
      {
        id: "2",
        title: "Thiếu Mobile Developer",
        description: "Chưa có đủ developer có kinh nghiệm React Native",
        level: "high",
        status: "open",
        createdAt: "2024-03-15",
      },
    ],
    documents: [],
    integrations: {},
  },
  {
    id: "4",
    name: "Nền Tảng Fintech",
    description:
      "Xây dựng nền tảng fintech với tính năng cho vay, thanh toán và quản lý tài chính cá nhân",
    type: "web",
    category: "software",
    status: "in_progress",
    priority: "high",
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    budget: 450000000,
    actualCost: 280000000,
    progress: 45,
    manager: mockUsers[7],
    team: {
      frontend: [mockUsers[1], mockUsers[8]],
      backend: [mockUsers[2], mockUsers[4], mockUsers[8]],
      qc: [mockUsers[9], mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "4",
    hosting: {
      id: "4",
      projectId: "4",
      provider: "Google Cloud",
      url: "https://fintech-platform.vn",
      domain: "fintech-platform.vn",
      server: {
        cpu: "8 cores",
        ram: "16GB",
        storage: "500GB SSD",
        bandwidth: "5TB/month",
      },
      expiryDate: "2025-03-01",
      cost: 5000000,
      renewalDate: "2025-02-15",
      status: "active",
      credentials: {
        username: "admin",
        password: "fintech@2024",
      },
    },
    accounts: [
      {
        id: "4",
        projectId: "4",
        type: "admin",
        username: "admin@fintech-platform.vn",
        password: "secure123",
        permissions: ["full_access", "financial_data"],
        lastLogin: "2024-08-22",
        isActive: true,
      },
    ],
    risks: [
      {
        id: "4",
        title: "Bảo mật dữ liệu tài chính",
        description:
          "Cần đảm bảo an toàn tuyệt đối cho dữ liệu tài chính khách hàng",
        level: "high",
        status: "mitigated",
        createdAt: "2024-03-05",
      },
      {
        id: "5",
        title: "Tuân thủ quy định ngân hàng",
        description:
          "Phải đảm bảo tuân thủ các quy định của Ngân hàng Nhà nước",
        level: "high",
        status: "open",
        createdAt: "2024-04-01",
      },
    ],
    documents: [
      {
        id: "4",
        name: "Tài liệu tuân thủ pháp lý",
        url: "/documents/fintech-compliance.pdf",
        type: "technical",
        uploadDate: "2024-03-15",
      },
    ],
    integrations: {
      jira: {
        projectKey: "FINTECH",
        url: "https://company.atlassian.net/browse/FINTECH",
        lastSync: "2024-08-22",
      },
      github: {
        repository: "techstart/fintech-platform",
        branch: "develop",
      },
    },
  },
  {
    id: "5",
    name: "Hệ Thống E-Learning",
    description:
      "Nền tảng học trực tuyến với video streaming, bài tập tương tác và quản lý lớp học",
    type: "web",
    category: "system",
    status: "completed",
    priority: "medium",
    startDate: "2024-02-15",
    endDate: "2024-07-30",
    budget: 320000000,
    actualCost: 315000000,
    progress: 100,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1], mockUsers[8]],
      backend: [mockUsers[2]],
      qc: [mockUsers[9]],
      devops: [mockUsers[4]],
    },
    clientId: "5",
    hosting: {
      id: "5",
      projectId: "5",
      provider: "AWS",
      url: "https://edusoft-learning.vn",
      domain: "edusoft-learning.vn",
      server: {
        cpu: "6 cores",
        ram: "12GB",
        storage: "300GB SSD",
        bandwidth: "2TB/month",
      },
      expiryDate: "2025-02-15",
      cost: 3500000,
      renewalDate: "2025-01-15",
      status: "active",
      credentials: {
        username: "root",
        password: "edusoft2024",
      },
    },
    accounts: [
      {
        id: "5",
        projectId: "5",
        type: "admin",
        username: "admin@edusoft-learning.vn",
        password: "edu123",
        permissions: ["full_access", "content_management"],
        lastLogin: "2024-08-20",
        isActive: true,
      },
    ],
    risks: [],
    documents: [
      {
        id: "5",
        name: "Hướng dẫn sử dụng hệ thống",
        url: "/documents/edusoft-manual.pdf",
        type: "other",
        uploadDate: "2024-07-25",
      },
    ],
    integrations: {
      slack: {
        channelId: "edusoft-team",
        webhookUrl: "https://hooks.slack.com/services/edusoft",
      },
    },
  },
  {
    id: "6",
    name: "Hệ Thống Quản Lý Bệnh Viện",
    description:
      "Hệ thống tổng thể quản lý bệnh viện: bệnh nhân, lịch hẹn, thuốc, thiết bị y tế",
    type: "web",
    category: "system",
    status: "on_hold",
    priority: "high",
    startDate: "2023-12-01",
    endDate: "2024-10-31",
    budget: 580000000,
    actualCost: 420000000,
    progress: 70,
    manager: mockUsers[7],
    team: {
      frontend: [mockUsers[1], mockUsers[8]],
      backend: [mockUsers[2], mockUsers[4], mockUsers[8]],
      qc: [mockUsers[3], mockUsers[9]],
      devops: [mockUsers[4]],
    },
    clientId: "6",
    hosting: {
      id: "6",
      projectId: "6",
      provider: "Private Server",
      url: "https://medcare-system.local",
      domain: "medcare-system.local",
      server: {
        cpu: "12 cores",
        ram: "32GB",
        storage: "1TB SSD",
        bandwidth: "Unlimited",
      },
      expiryDate: "2025-12-01",
      cost: 8000000,
      renewalDate: "2025-11-01",
      status: "active",
      credentials: {
        username: "sysadmin",
        password: "medcare@secure2024",
      },
    },
    accounts: [
      {
        id: "6",
        projectId: "6",
        type: "admin",
        username: "admin@medcare.local",
        password: "medical123",
        permissions: ["full_access", "patient_data", "medical_records"],
        lastLogin: "2024-08-15",
        isActive: true,
      },
    ],
    risks: [
      {
        id: "6",
        title: "Yêu cầu thay đổi từ khách hàng",
        description: "Khách hàng yêu cầu bổ sung module telemedicine",
        level: "medium",
        status: "open",
        createdAt: "2024-07-01",
      },
    ],
    documents: [
      {
        id: "6",
        name: "Quy trình bảo mật y tế",
        url: "/documents/medical-security.pdf",
        type: "technical",
        uploadDate: "2023-12-15",
      },
    ],
    integrations: {
      jira: {
        projectKey: "MEDCARE",
        url: "https://company.atlassian.net/browse/MEDCARE",
        lastSync: "2024-08-15",
      },
    },
  },
  {
    id: "7",
    name: "Website WordPress Spa & Wellness",
    description:
      "Phát triển website WordPress cho trung tâm spa với tính năng đặt lịch hẹn, thanh toán online",
    type: "web",
    category: "wordpress",
    status: "completed",
    priority: "medium",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    budget: 80000000,
    actualCost: 75000000,
    progress: 100,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1]],
      backend: [mockUsers[2]],
      qc: [mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "1",
    accounts: [],
    risks: [],
    documents: [],
    integrations: {},
  },
  {
    id: "8",
    name: "Plugin WordPress WooCommerce Custom",
    description:
      "Phát triển plugin tùy chỉnh cho WooCommerce với tính năng quản lý đơn hàng đặc biệt",
    type: "web",
    category: "wordpress",
    status: "in_progress",
    priority: "high",
    startDate: "2024-07-01",
    endDate: "2024-10-30",
    budget: 120000000,
    actualCost: 60000000,
    progress: 50,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1]],
      backend: [mockUsers[2]],
      qc: [mockUsers[3]],
      devops: [],
    },
    clientId: "2",
    accounts: [],
    risks: [],
    documents: [],
    integrations: {},
  },
  {
    id: "9",
    name: "Tối Ưu SEO Website Doanh Nghiệp",
    description:
      "Dự án tối ưu SEO toàn diện cho website doanh nghiệp, tăng thứ hạng từ khóa mục tiêu",
    type: "web",
    category: "seo",
    status: "in_progress",
    priority: "medium",
    startDate: "2024-06-01",
    endDate: "2024-12-31",
    budget: 60000000,
    actualCost: 30000000,
    progress: 40,
    manager: mockUsers[7],
    team: {
      frontend: [],
      backend: [],
      qc: [mockUsers[3]],
      devops: [],
    },
    clientId: "3",
    accounts: [],
    risks: [],
    documents: [],
    integrations: {},
  },
  {
    id: "10",
    name: "Website Landing Page Marketing",
    description:
      "Thiết kế và phát triển landing page cho chiến dịch marketing sản phẩm mới",
    type: "web",
    category: "website",
    status: "completed",
    priority: "high",
    startDate: "2024-05-01",
    endDate: "2024-06-15",
    budget: 45000000,
    actualCost: 42000000,
    progress: 100,
    manager: mockUsers[0],
    team: {
      frontend: [mockUsers[1]],
      backend: [],
      qc: [mockUsers[3]],
      devops: [mockUsers[4]],
    },
    clientId: "4",
    accounts: [],
    risks: [],
    documents: [],
    integrations: {},
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Thiết kế Database Schema",
    description: "Thiết kế cấu trúc database cho module sản phẩm và đơn hàng",
    status: "done",
    priority: "high",
    assignee: mockUsers[2],
    projectId: "1",
    createdAt: "2024-01-20",
    dueDate: "2024-02-15",
  },
  {
    id: "2",
    title: "Phát triển API Authentication",
    description: "Xây dựng hệ thống xác thực người dùng với JWT",
    status: "in_progress",
    priority: "high",
    assignee: mockUsers[4],
    projectId: "1",
    createdAt: "2024-02-01",
    dueDate: "2024-03-01",
  },
  {
    id: "3",
    title: "UI/UX Trang Chủ",
    description: "Thiết kế và code giao diện trang chủ website",
    status: "review",
    priority: "medium",
    assignee: mockUsers[1],
    projectId: "1",
    createdAt: "2024-02-10",
    dueDate: "2024-03-10",
  },
  {
    id: "4",
    title: "Tích hợp Payment Gateway",
    description: "Tích hợp cổng thanh toán VNPay và MoMo",
    status: "todo",
    priority: "high",
    assignee: mockUsers[2],
    projectId: "1",
    createdAt: "2024-03-01",
    dueDate: "2024-04-15",
  },
  {
    id: "5",
    title: "Module Quản lý Nhân viên",
    description: "Phát triển module quản lý thông tin và chấm công nhân viên",
    status: "done",
    priority: "medium",
    assignee: mockUsers[2],
    projectId: "2",
    createdAt: "2023-11-01",
    dueDate: "2023-12-15",
  },
  {
    id: "6",
    title: "Báo cáo Dashboard",
    description: "Tạo dashboard hiển thị các báo cáo tổng quan",
    status: "in_progress",
    priority: "medium",
    assignee: mockUsers[1],
    projectId: "2",
    createdAt: "2024-01-15",
    dueDate: "2024-02-28",
  },
  {
    id: "7",
    title: "UI/UX Mobile App",
    description: "Thiết kế giao diện cho ứng dụng mobile giao hàng",
    status: "in_progress",
    priority: "urgent",
    assignee: mockUsers[6],
    projectId: "3",
    createdAt: "2024-04-05",
    dueDate: "2024-05-30",
  },
  {
    id: "8",
    title: "GPS Tracking System",
    description: "Phát triển hệ thống theo dõi GPS cho shipper",
    status: "todo",
    priority: "high",
    assignee: mockUsers[8],
    projectId: "3",
    createdAt: "2024-04-10",
    dueDate: "2024-06-15",
  },
  {
    id: "9",
    title: "API Quản lý Giao dịch",
    description: "Xây dựng API cho hệ thống quản lý giao dịch tài chính",
    status: "in_progress",
    priority: "high",
    assignee: mockUsers[2],
    projectId: "4",
    createdAt: "2024-03-15",
    dueDate: "2024-05-01",
  },
  {
    id: "10",
    title: "Module KYC/AML",
    description: "Phát triển module xác minh danh tính khách hàng",
    status: "review",
    priority: "high",
    assignee: mockUsers[8],
    projectId: "4",
    createdAt: "2024-04-01",
    dueDate: "2024-06-30",
  },
  {
    id: "11",
    title: "Video Streaming Platform",
    description: "Xây dựng nền tảng streaming video cho bài giảng",
    status: "done",
    priority: "high",
    assignee: mockUsers[2],
    projectId: "5",
    createdAt: "2024-03-01",
    dueDate: "2024-05-15",
  },
  {
    id: "12",
    title: "Quiz & Assessment System",
    description: "Hệ thống tạo và chấm bài kiểm tra tự động",
    status: "done",
    priority: "medium",
    assignee: mockUsers[1],
    projectId: "5",
    createdAt: "2024-04-01",
    dueDate: "2024-06-30",
  },
  {
    id: "13",
    title: "Module Quản lý Bệnh nhân",
    description: "Phát triển module quản lý thông tin bệnh nhân",
    status: "done",
    priority: "high",
    assignee: mockUsers[8],
    projectId: "6",
    createdAt: "2023-12-15",
    dueDate: "2024-03-31",
  },
  {
    id: "14",
    title: "Hệ thống Lịch hẹn",
    description: "Xây dựng hệ thống đặt lịch khám bệnh online",
    status: "in_progress",
    priority: "medium",
    assignee: mockUsers[1],
    projectId: "6",
    createdAt: "2024-02-01",
    dueDate: "2024-05-31",
  },
  {
    id: "15",
    title: "Module Telemedicine",
    description: "Thêm tính năng khám bệnh từ xa qua video call",
    status: "todo",
    priority: "high",
    assignee: mockUsers[2],
    projectId: "6",
    createdAt: "2024-07-01",
    dueDate: "2024-09-30",
  },
];

// Helper functions for form data
export const getClientOptions = () =>
  mockClients.map((client) => ({
    value: client.id,
    label: client.name,
    company: client.industry,
  }));

export const getTeamMemberOptions = () =>
  mockUsers.map((user) => ({
    value: user.id,
    label: user.name,
    role: user.position || user.role,
    avatar: user.avatar,
  }));

// Utility functions
export const getProjectById = (id: string) =>
  mockProjects.find((p) => p.id === id);
export const getTasksByProject = (projectId: string) =>
  mockTasks.filter((t) => t.projectId === projectId);
export const getUserById = (id: string) => mockUsers.find((u) => u.id === id);
export const getClientById = (id: string) =>
  mockClients.find((c) => c.id === id);
export const getClientByProjectId = (projectId: string) => {
  const project = getProjectById(projectId);
  return project ? getClientById(project.clientId) : null;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "done":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planning":
    case "todo":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "on_hold":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "review":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "maintenance":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "expired":
      return "bg-red-100 text-red-800 border-red-200";
    case "suspended":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "low":
      return "bg-slate-100 text-slate-800 border-slate-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const isHostingExpiringSoon = (
  expiryDate: string,
  days: number = 30,
) => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays > 0;
};

export const getProjectStats = () => {
  const stats = {
    total: mockProjects.length,
    inProgress: mockProjects.filter((p) => p.status === "in_progress").length,
    completed: mockProjects.filter((p) => p.status === "completed").length,
    maintenance: mockProjects.filter((p) => p.status === "maintenance").length,
    planning: mockProjects.filter((p) => p.status === "planning").length,
    onHold: mockProjects.filter((p) => p.status === "on_hold").length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    totalActualCost: mockProjects.reduce((sum, p) => sum + p.actualCost, 0),
    expiringHosting: mockProjects.filter(
      (p) => p.hosting && isHostingExpiringSoon(p.hosting.expiryDate),
    ).length,
  };
  return stats;
};

export const getTeamWorkload = () => {
  const workload: {
    [key: string]: { user: User; projectCount: number; projects: string[] };
  } = {};

  mockProjects.forEach((project) => {
    const allMembers = [
      project.manager,
      ...project.team.frontend,
      ...project.team.backend,
      ...project.team.qc,
      ...project.team.devops,
    ];

    allMembers.forEach((member) => {
      if (!workload[member.id]) {
        workload[member.id] = {
          user: member,
          projectCount: 0,
          projects: [],
        };
      }
      if (!workload[member.id].projects.includes(project.id)) {
        workload[member.id].projectCount++;
        workload[member.id].projects.push(project.id);
      }
    });
  });

  return Object.values(workload);
};

// Mock Document Files
export const mockDocumentFiles: DocumentFile[] = [
  // Files for "Tài liệu báo giá" (folder id: "1")
  {
    id: "file-1-1",
    name: "Báo giá website ABC Shop.pdf",
    type: "application/pdf",
    size: 2548720,
    uploadDate: "2024-08-18",
    uploadedBy: "Nguyễn Văn An",
    url: "/documents/bao-gia-abc-shop.pdf",
  },
  {
    id: "file-1-2",
    name: "Báo giá phát triển mobile app.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1876543,
    uploadDate: "2024-08-17",
    uploadedBy: "Trần Thị Bình",
    url: "/documents/bao-gia-mobile-app.docx",
  },
  {
    id: "file-1-3",
    name: "Biểu phí hosting năm 2024.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 567890,
    uploadDate: "2024-08-16",
    uploadedBy: "Lê Văn Cường",
  },

  // Files for "Tài liệu hợp đồng" (folder id: "2")
  {
    id: "file-2-1",
    name: "Hợp đồng phát triển website ABC.pdf",
    type: "application/pdf",
    size: 3421876,
    uploadDate: "2024-08-13",
    uploadedBy: "Nguyễn Văn An",
    url: "/documents/hop-dong-abc.pdf",
  },
  {
    id: "file-2-2",
    name: "Phụ lục hợp đồng - Yêu cầu kỹ thuật.pdf",
    type: "application/pdf",
    size: 1987654,
    uploadDate: "2024-08-13",
    uploadedBy: "Nguyễn Văn An",
  },
  {
    id: "file-2-3",
    name: "Hợp đồng bảo trì hệ thống.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1234567,
    uploadDate: "2024-08-10",
    uploadedBy: "Phạm Thị Dung",
  },

  // Files for "Tài liệu kỹ thuật" (folder id: "5")
  {
    id: "file-5-1",
    name: "Database Schema Design.pdf",
    type: "application/pdf",
    size: 4567890,
    uploadDate: "2024-08-19",
    uploadedBy: "Lê Văn Cường",
  },
  {
    id: "file-5-2",
    name: "API Documentation v1.2.pdf",
    type: "application/pdf",
    size: 6789123,
    uploadDate: "2024-08-18",
    uploadedBy: "Hoàng Văn Em",
  },
  {
    id: "file-5-3",
    name: "System Architecture Diagram.png",
    type: "image/png",
    size: 987654,
    uploadDate: "2024-08-17",
    uploadedBy: "Phan Văn Ích",
  },
  {
    id: "file-5-4",
    name: "Frontend Component Structure.md",
    type: "text/markdown",
    size: 234567,
    uploadDate: "2024-08-16",
    uploadedBy: "Trần Thị Bình",
  },
];

// Mock Document Folders
export const mockDocumentFolders: DocumentFolder[] = [
  {
    id: "1",
    name: "Tài liệu báo giá",
    fileCount: 3,
    color: "bg-blue-100 text-blue-600",
    lastModified: "2 ngày trước",
    files: mockDocumentFiles.filter((file) =>
      ["file-1-1", "file-1-2", "file-1-3"].includes(file.id),
    ),
  },
  {
    id: "2",
    name: "Tài liệu hợp đồng",
    fileCount: 3,
    color: "bg-green-100 text-green-600",
    lastModified: "5 ngày trước",
    files: mockDocumentFiles.filter((file) =>
      ["file-2-1", "file-2-2", "file-2-3"].includes(file.id),
    ),
  },
  {
    id: "3",
    name: "Tài liệu hóa đơn",
    fileCount: 0,
    color: "bg-yellow-100 text-yellow-600",
    lastModified: "1 tuần trước",
    files: [],
  },
  {
    id: "4",
    name: "Tài liệu đặc tả",
    fileCount: 0,
    color: "bg-purple-100 text-purple-600",
    lastModified: "3 ngày trước",
    files: [],
  },
  {
    id: "5",
    name: "Tài liệu kỹ thuật",
    fileCount: 4,
    color: "bg-red-100 text-red-600",
    lastModified: "1 ngày trước",
    files: mockDocumentFiles.filter((file) =>
      ["file-5-1", "file-5-2", "file-5-3", "file-5-4"].includes(file.id),
    ),
  },
  {
    id: "6",
    name: "Tài liệu pháp lý",
    fileCount: 0,
    color: "bg-indigo-100 text-indigo-600",
    lastModified: "2 tuần trước",
    files: [],
  },
  {
    id: "7",
    name: "Tài liệu tài chính",
    fileCount: 0,
    color: "bg-orange-100 text-orange-600",
    lastModified: "4 ngày trước",
    files: [],
  },
  {
    id: "8",
    name: "Báo cáo dự án",
    fileCount: 0,
    color: "bg-teal-100 text-teal-600",
    lastModified: "6 ngày trước",
    files: [],
  },
];
