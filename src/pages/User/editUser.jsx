import { useState } from "react";
import { App } from "antd";
import { useNavigate, useParams, useLocation } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
import UserForm from "./components/userForm";
import { editUserApi } from "services/user";

const EditUser = () => {
  const params = useParams();
  const location = useLocation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ ...location.state });

  async function handleSubmit() {
    const { errorCode } = await editUserApi(params.id, userInfo);
    if (errorCode !== 0) return;
    message.success("新增成功");
    navigate("/user/list");
  }
  return (
    <PageContainer>
      <div style={{ maxWidth: "800px" }}>
        <UserForm
          type="edit"
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
};

export default EditUser;
