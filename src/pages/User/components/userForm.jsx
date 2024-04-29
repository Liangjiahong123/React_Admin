import { Radio, Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const UserForm = ({ type, userInfo, setUserInfo, handleSubmit }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(userInfo);
  }, [form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function handleUpdateInfo(newVal, key) {
    const newuserInfo = { ...userInfo };
    newuserInfo[key] = newVal;
    setUserInfo(newuserInfo);
  }

  function handleResetForm() {
    const newUserInfo = { ...userInfo };
    for (const key in newUserInfo) {
      if (newUserInfo.hasOwnProperty(key)) {
        if (["account", "password", "nickName", "avatar"].includes(key)) {
          newUserInfo[key] = "";
        }
      }
    }
    form.setFieldsValue(newuserInfo);
  }

  return (
    <Form
      name="basic"
      form={form}
      initialValues={userInfo}
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
          value={userInfo?.account}
          onChange={(e) => handleUpdateInfo(e.target.value, "account")}
          disabled={type === "edit"}
        />
      </Form.Item>

      {/* 密码 */}
      <Form.Item label="密码" name="password" rules={[{ min: 6, message: "密码长度至少6位" }]}>
        <Input.Password
          placeholder={type === "edit" ? "新密码，可选" : "可选，默认是123123"}
          value={userInfo?.password}
          maxLength={16}
          autoComplete="off"
          onChange={(e) => handleUpdateInfo(e.target.value, "password")}
        />
      </Form.Item>

      {/* 昵称 */}
      <Form.Item label="昵称" name="nickName">
        <Input
          placeholder={type === "edit" ? "" : "可选，默认是普通用户"}
          value={userInfo?.nickName}
          onChange={(e) => handleUpdateInfo(e.target.value, "nickName")}
        />
      </Form.Item>

      {/* 性别 */}
      <Form.Item label="性别" name="gender">
        <Radio.Group
          value={userInfo?.gender}
          onChange={(e) => handleUpdateInfo(e.target.value, "gender")}
        >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
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
      {/* QQ号码 */}
      <Form.Item
        label="QQ号码"
        name="qq"
        rules={[{ pattern: /\d{6,10}/, message: "QQ号码格式不正确" }]}
      >
        <Input
          placeholder="选填"
          value={userInfo?.qq}
          maxLength={10}
          onChange={(e) => handleUpdateInfo(e.target.value, "qq")}
        />
      </Form.Item>
      {/* 微信号 */}
      <Form.Item
        label="微信号"
        name="wechat"
        rules={[{ pattern: /([a-z]|[A-Z]|[0-9]){6,16}/, message: "微信格式不正确" }]}
      >
        <Input
          placeholder="选填"
          value={userInfo?.wechat}
          maxLength={10}
          onChange={(e) => handleUpdateInfo(e.target.value, "qq")}
        />
      </Form.Item>
      {/* 自我介绍 */}

      {/* 提交 */}
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          确认新增
        </Button>
        <Button className="reset-btn" htmlType="button" onClick={handleResetForm}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
