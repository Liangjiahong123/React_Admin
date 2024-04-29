import { useState, useEffect } from "react";
import { useDispatch, useNavigate } from "@umijs/max";
import { App } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import AdminForm from "./components/adminForm";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [adminInfo, setAdminInfo] = useState({
    account: "",
    password: "",
    username: "",
    nickName: "",
    avatar: "",
    gender: 0,
    role: 3
  });

  useEffect(() => {
    dispatch({ type: "admin/fetchAdminList", payload: { page: 1, size: 10 } });
  }, []);

  // 点击表单确认
  async function handleSubmit() {
    const { errorCode, errMsg } = await dispatch({
      type: "admin/fetchAddAdmin",
      payload: adminInfo
    });
    if (errorCode !== 0) return message.error(errMsg);
    message.success("添加成功");
    navigate("/admin/list");
  }

  return (
    <PageContainer>
      <div style={{ maxWidth: "800px" }}>
        <AdminForm
          type="add"
          adminInfo={adminInfo}
          setAdminInfo={setAdminInfo}
          handleSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
};

export default AddAdmin;
