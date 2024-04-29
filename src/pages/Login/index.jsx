import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col, App } from "antd";
import { useDispatch, useNavigate } from "@umijs/max";
import { UserOutlined, LockOutlined, BarcodeOutlined } from "@ant-design/icons";
import ReactCanvasNest from "react-canvas-nest";
import { getCaptchaApi } from "services/admin";
import styles from "./css/login.less";

const Login = () => {
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    account: "",
    password: "",
    captcha: "",
    remember: ""
  });
  const [captcha, setCaptcha] = useState(null);
  useEffect(() => {
    handleClickCaptcha();
  }, []);

  // 登录信息变化
  function handleUserInfoChange(val, key) {
    const newUserInfo = { ...userInfo };
    newUserInfo[key] = val;
    setUserInfo(newUserInfo);
  }

  // 点击验证码更换
  async function handleClickCaptcha() {
    const { data } = await getCaptchaApi();
    setCaptcha(data.img);
  }

  // 提交表单
  async function handleSubmitForm() {
    const { errorCode, errMsg } = await dispatch({ type: "admin/fetchLogin", payload: userInfo });
    if (errorCode !== 0) return message.error(errMsg);
    message.success("登录成功", 1, () => {
      navigate("/home", { replace: true });
    });
  }
  return (
    <>
      <ReactCanvasNest config={{ pointColor: "255,100,50", count: 60, follow: true }} />
      <div className={styles["login-container"]}>
        <div className={styles["form-box"]}>
          <h1 className={styles["title"]}>coderStation 后台管理系统</h1>
          <Form
            name="login"
            className="login-form"
            initialValues={userInfo}
            onFinish={handleSubmitForm}
          >
            {/* 登录账号 */}
            <Form.Item name="account" rules={[{ required: true, message: "请输入登录账号" }]}>
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入登录账号"
                value={userInfo.account}
                onChange={(e) => handleUserInfoChange(e.target.value, "account")}
              />
            </Form.Item>
            {/* 登录密码 */}
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                value={userInfo.password}
                onChange={(e) => handleUserInfoChange(e.target.value, "password")}
              />
            </Form.Item>
            {/* 验证码 */}
            <Form.Item name="captcha" rules={[{ required: true, message: "请输入验证码" }]}>
              <Row>
                <Col span={16}>
                  <Input
                    prefix={<BarcodeOutlined />}
                    placeholder="请输入验证码"
                    value={userInfo.captcha}
                    onChange={(e) => handleUserInfoChange(e.target.value, "captcha")}
                  />
                </Col>
                <Col span={8}>
                  <img
                    className={styles["captcha-img"]}
                    src={captcha}
                    onClick={handleClickCaptcha}
                  />
                </Col>
              </Row>
            </Form.Item>
            {/* 7天免登录 */}
            <Form.Item name="captcha" valuePropName="checked">
              <Checkbox
                className={styles["login-checkbox"]}
                value={userInfo.remember}
                onChange={(e) => handleUserInfoChange(e.target.value, "remember")}
              >
                7天免登录
              </Checkbox>
            </Form.Item>
            {/* 登录按钮 */}
            <Form.Item name="captcha">
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default () => {
  return (
    <App>
      <Login />
    </App>
  );
};
