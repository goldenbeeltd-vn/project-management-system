import { Layout } from "@/components/layout/layout";
import { Providers } from "../providers";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </>
  );
};

export default DashboardLayout;
