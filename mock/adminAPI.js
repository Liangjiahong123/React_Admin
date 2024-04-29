import Mock from "mockjs";
import { omit } from "../src/utils/property";
import { generateRandomColor, resSuccess, resError } from "../src/utils/tools";

const adminList = Mock.mock({
  "list|50": [
    {
      "id|+1": 1,
      account: "@email",
      password: "123123",
      username: "@cname",
      nickName: "@last",
      avatar: "https://placebear.com/@integer(60, 100)/@integer(60, 100)",
      "gender|0-1": 0,
      "role|1-3": 1,
      "enable|0-1": 0
    },
    {
      id: 51,
      account: "admin",
      password: "123456",
      username: "Jimmy",
      nickName: "Jimmy",
      gender: 0,
      role: 1,
      enable: 1
    }
  ]
});

let captchaText = "";

export default {
  "GET /api/admin": (req, res) => {
    const { page = 1, size = 10, ...rest } = req.query || {};
    let responseList = [...adminList.list];
    Object.keys(rest).forEach((key) => {
      if (rest[key]) {
        if (["gender", "role", "enable"].includes(key)) {
          responseList = responseList.filter((admin) => admin[key] === +rest[key]);
        } else {
          responseList = responseList.filter((admin) => admin[key].indexOf(rest[key]) > -1);
        }
      }
    });

    const list = responseList
      .slice((page - 1) * size, page * size)
      .map((admin) => omit(admin, "password"));

    resSuccess(res, { list, total: responseList.length });
  },
  "DELETE /api/admin/:id": (req, res) => {
    const { id } = req.params;
    const delIndex = adminList.list.findIndex((admin) => admin.id === +id);
    adminList.list.splice(delIndex, 1);
    resSuccess(res, null);
  },
  "PATCH /api/admin/:id": (req, res) => {
    const { id: adminId } = req.params;
    const newAdminInfo = req.body;

    for (let i = 0; i < adminList.list.length; i++) {
      const target = adminList.list[i];
      if (target.id === +adminId) {
        for (let key in newAdminInfo) {
          if (newAdminInfo.hasOwnProperty(key)) {
            adminList.list[i][key] = newAdminInfo[key];
          }
        }
        break;
      }
    }

    resSuccess(res, null);
  },
  "POST /api/admin": (req, res) => {
    const newAdminInfo = req.body;
    const isExist = adminList.list.some((admin) => admin.account === newAdminInfo.account);
    if (isExist) return resError(res, "管理员已存在");

    const newId = adminList.list[adminList.list.length - 1].id + 1;
    adminList.list.push({
      ...newAdminInfo,
      id: newId,
      enable: true,
      password: newAdminInfo.password || "123123",
      avatar: Mock.Random.image("80x80", Mock.Random.color(), "#757575", "png", "Admin"),
      username: newAdminInfo.username || Mock.Random.cname(),
      nickName: newAdminInfo.nickName || Mock.Random.last()
    });
    resSuccess(res, newAdminInfo);
  },
  "GET /api/captcha": (req, res) => {
    captchaText = Mock.mock({ regexp: /\w{4}/ }).regexp;
    const cptchaImg = Mock.mock({
      img: Mock.Random.image("100x32", generateRandomColor(), "#fff", captchaText),
      text: captchaText
    });
    resSuccess(res, cptchaImg);
  },
  "POST /api/login": (req, res) => {
    const { account, password, captcha } = req.body;
    const targetAdmin = adminList.list.find((admin) => admin.account === account);
    if (!targetAdmin) return resError(res, "账号不存在");
    if (targetAdmin.password !== password) return resError(res, "密码错误");
    if (captcha !== captchaText) return resError(res, "验证码错误");
    if (!targetAdmin.enable) return resError(res, "账号已被禁用");

    resSuccess(res, {
      token: Mock.Random.guid()
    });
  }
};
