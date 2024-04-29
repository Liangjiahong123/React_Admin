import { useState } from "react";
import { App } from "antd";
import { useNavigate } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";
import UserForm from "./components/userForm";
import { addUserApi } from "services/user";

const AddUser = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    account: "",
    password: "",
    nickName: "",
    avatar: "",
    qq: "",
    wechat: "",
    self: "",
    gender: 0,
    enable: 1
  });

  async function handleSubmit() {
    const { errorCode } = await addUserApi(userInfo);
    if (errorCode !== 0) return;
    message.success("新增成功");
    navigate("/user/list");
  }
  return (
    <PageContainer>
      <div style={{ maxWidth: "800px" }}>
        <UserForm
          type="add"
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
};

export default AddUser;
