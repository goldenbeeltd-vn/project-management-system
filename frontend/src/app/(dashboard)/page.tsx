export default function HomePage() {
  return (
    <>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Chào mừng đến với Hệ Thống Quản Lý Dự Án
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Quản lý dự án đang triển khai và đã triển khai một cách hiệu quả
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Dashboard</h3>
                <p className="text-gray-600">
                  Theo dõi tổng quan các dự án và tiến độ
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Dự án</h3>
                <p className="text-gray-600">Quản lý chi tiết từng dự án</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Nhóm</h3>
                <p className="text-gray-600">
                  Quản lý thành viên và phân quyền
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
