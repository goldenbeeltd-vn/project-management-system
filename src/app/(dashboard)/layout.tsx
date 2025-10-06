import { Layout } from "@/components/layout/layout";
import { ReduxProvider } from "@/providers/ReduxProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider>
        <Layout>{children}</Layout>
      </ReduxProvider>
    </>
  );
};

export default DashboardLayout;
