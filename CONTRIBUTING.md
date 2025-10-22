# Contributing to Quan Ly Du An

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án! Tài liệu này sẽ hướng dẫn bạn cách thiết lập và phát triển dự án.

## Cấu trúc dự án

Dự án được tổ chức theo mô hình monorepo với 2 workspace chính:

```
quan-ly-du-an/
├── frontend/          # Next.js application
├── backend/           # NestJS application
├── package.json       # Root package.json with workspace config
└── README.md
```

## Thiết lập môi trường phát triển

### Yêu cầu hệ thống

- Node.js 18.17 hoặc mới hơn
- npm 8.0 hoặc mới hơn

### Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd quan-ly-du-an
```

2. Cài đặt dependencies cho tất cả workspace:

```bash
npm install
```

3. Thiết lập environment variables:

   - Copy `backend/.env.example` thành `backend/.env`
   - Copy `frontend/.env.local.example` thành `frontend/.env.local`

4. Khởi chạy ứng dụng:

```bash
npm run dev
```

## Scripts có sẵn

### Root level

- `npm run dev` - Chạy cả frontend và backend
- `npm run build` - Build cả hai ứng dụng
- `npm run frontend` - Chỉ chạy frontend
- `npm run backend` - Chỉ chạy backend
- `npm run install:frontend` - Cài đặt dependencies cho frontend
- `npm run install:backend` - Cài đặt dependencies cho backend

### Frontend (trong thư mục frontend/)

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production build
- `npm run lint` - Chạy ESLint

### Backend (trong thư mục backend/)

- `npm run start:dev` - Chạy development mode với hot reload
- `npm run build` - Build production
- `npm run start:prod` - Chạy production build
- `npm run test` - Chạy unit tests
- `npm run test:e2e` - Chạy end-to-end tests

## Quy tắc coding

### Frontend (Next.js + TypeScript)

- Sử dụng TypeScript cho tất cả files
- Follow conventions của Next.js 15
- Sử dụng Tailwind CSS cho styling
- Sử dụng Shadcn/ui components
- File naming: kebab-case cho components, camelCase cho utils

### Backend (NestJS + TypeScript)

- Sử dụng decorators của NestJS
- Follow naming conventions: PascalCase cho classes, camelCase cho methods
- Sử dụng DTOs cho validation
- Implement proper error handling
- Write unit tests cho services

## Workflow phát triển

1. **Branch naming**:

   - Feature: `feature/description`
   - Bug fix: `fix/description`
   - Hotfix: `hotfix/description`

2. **Commit message format**:

   ```
   type(scope): description

   [optional body]

   [optional footer]
   ```

   Types: feat, fix, docs, style, refactor, test, chore

3. **Pull Request**:
   - Tạo PR với mô tả chi tiết
   - Đảm bảo tất cả tests pass
   - Request review từ maintainers

## Testing

### Frontend Testing

```bash
cd frontend
npm run test
```

### Backend Testing

```bash
cd backend
npm run test
npm run test:e2e
```

## Database

Dự án sử dụng SQLite với TypeORM. Database file sẽ được tự động tạo khi chạy backend lần đầu.

### Migration

```bash
cd backend
npm run migration:generate -- --name=MigrationName
npm run migration:run
```

## Troubleshooting

### Port conflicts

- Frontend mặc định chạy trên port 3000
- Backend mặc định chạy trên port 3001
- Có thể thay đổi trong file .env tương ứng

### Dependencies issues

```bash
# Xóa node_modules và reinstall
npm run clean
npm install
```

### Database issues

```bash
# Xóa database và tái tạo
rm backend/database.sqlite
cd backend
npm run start:dev
```

## Liên hệ

Nếu có vấn đề gì, vui lòng tạo issue trên GitHub repository.
