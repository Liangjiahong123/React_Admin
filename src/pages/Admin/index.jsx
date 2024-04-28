import { useOutlet } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";

const Admin = () => {
  const outlet = useOutlet();
  return <PageContainer>{outlet}</PageContainer>;
};

export default Admin;
