export const loginRule = {
  username: [
    { required: true, message: "用户名不能为空" },
    { max: 16, message: "用户名不能超过16位" },
    { min: 4, message: "用户名不能少于4位" }
  ],
  password: [
    { required: true, message: "密码不能为空" },
    { max: 16, message: "用户名不能超过16位" },
    { min: 6, message: "用户名不能少于6位" }
  ],
  mobile: [
    {
      validator: (_, val) => {
        const mobileReg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (!Boolean(val)) return Promise.reject("手机号码不能为空");
        if (!mobileReg.test(val)) return Promise.reject("手机号码格式不正确");
        return Promise.resolve();
      }
    }
  ],
  code: [{ required: true, message: "验证码不能为空" }]
};
