import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-8xl">404</h1>
      <h2 className="mb-5">Không tìm thấy trang</h2>
      <Link href="/" className="flex items-center gap-2 hover:text-primary">
        <ArrowLeft size={16} />
        Trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
