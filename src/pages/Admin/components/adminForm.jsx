import { Radio, Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const AdminForm = ({ type, adminInfo, setAdminInfo, handleSubmit }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(adminInfo);
  }, [adminInfo]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function handleUpdateInfo(newVal, key) {
    const newAdminInfo = { ...adminInfo };
    newAdminInfo[key] = newVal;
    setAdminInfo(newAdminInfo);
  }

  function handleResetForm() {
    const newAdminInfo = { ...adminInfo };
    for (const key in newAdminInfo) {
      if (newAdminInfo.hasOwnProperty(key)) {
        if (["account", "password", "username", "nickName", "avatar"].includes(key)) {
          newAdminInfo[key] = "";
        }
      }
    }
    form.setFieldsValue(newAdminInfo);
  }

  return (
    <Form
      name="basic"
      form={form}
      style={{ maxWidth: "600px" }}
      initialValues={adminInfo}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      {/* 账号 */}
      <Form.Item
        label="账号"
        name="account"
        rules={[{ required: true, message: "请输入管理员账号" }]}
      >
        <Input
          value={adminInfo?.account}
          onChange={(e) => handleUpdateInfo(e.target.value, "account")}
          disabled={type === "edit"}
        />
      </Form.Item>

      {/* 密码 */}
      <Form.Item label="密码" name="password" rules={[{ min: 6, message: "密码长度至少6位" }]}>
        <Input.Password
          placeholder={type === "edit" ? "新密码，可选" : "可选，默认是123123"}
          value={adminInfo?.password}
          maxLength={16}
          autoComplete="off"
          onChange={(e) => handleUpdateInfo(e.target.value, "password")}
        />
      </Form.Item>

      {/* 用户名 */}
      <Form.Item label="用户名" name="username">
        <Input
          placeholder={type === "edit" ? "" : "可选，默认是普通用户"}
          value={adminInfo?.username}
          onChange={(e) => handleUpdateInfo(e.target.value, "username")}
        />
      </Form.Item>

      {/* 昵称 */}
      <Form.Item label="昵称" name="nickName">
        <Input
          placeholder={type === "edit" ? "" : "可选，默认是普通用户"}
          value={adminInfo?.nickName}
          onChange={(e) => handleUpdateInfo(e.target.value, "nickName")}
        />
      </Form.Item>

      {/* 性别 */}
      <Form.Item label="性别" name="gender">
        <Radio.Group
          value={adminInfo?.gender}
          onChange={(e) => handleUpdateInfo(e.target.value, "gender")}
        >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </Form.Item>

      {/* 角色 */}
      <Form.Item label="角色" name="role" rules={[{ required: true }]}>
        <Radio.Group
          value={adminInfo?.role}
          onChange={(e) => handleUpdateInfo(e.target.value, "role")}
        >
          <Radio value={1}>超级管理员</Radio>
          <Radio value={2}>管理员</Radio>
          <Radio value={3}>普通用户</Radio>
        </Radio.Group>
      </Form.Item>

      {/* 头像 */}

      <Form.Item
        label="上传头像"
        name="avatar"
        valuePropName="filelist"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card" maxCount={1} action="/api/upload">
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>头像可选</div>
          </button>
        </Upload>
      </Form.Item>

      {/* 提交 */}
      {type !== "edit" && (
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>
          <Button className="reset-btn" htmlType="button" onClick={handleResetForm}>
            重置
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default AdminForm;
