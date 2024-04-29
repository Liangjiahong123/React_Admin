import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import UserForm from "./components/userForm";

const AddUser = () => {
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

  function handleSubmit() {}
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
