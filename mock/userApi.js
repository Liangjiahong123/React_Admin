import Mock from "mockjs";
import { omit } from "../src/utils/property";

const userList = Mock.mock({
  "list|100": [
    {
      "id|+1": 1,
      account: "@email",
      password: "123123",
      nickName: "@last",
      avatar: "https://placebear.com/@integer(100, 150)/@integer(100, 150)",
      qq: /\d{6,10}/,
      wechat: /([a-z]|[A-Z]|[0-9]){6,16}/,
      self: "@cparagraph",
      "gender|0-1": 0,
      "enable|0-1": 0
    }
  ]
});

export default {
  "GET /api/user": (req, res) => {
    const { page = 1, size = 10, ...rest } = req.query || {};
    let responseList = [...userList.list];
    Object.keys(rest).forEach((key) => {
      if (rest[key]) {
        if (["gender", "enable"].includes(key)) {
          responseList = responseList.filter((user) => user[key] === +rest[key]);
        } else {
          responseList = responseList.filter((user) => user[key].indexOf(rest[key]) > -1);
        }
      }
    });

    const list = responseList
      .slice((page - 1) * size, page * size)
      .map((user) => omit(user, "password"));

    res.json({
      success: true,
      data: { list, total: responseList.length },
      errorCode: 0
    });
  },
  "DELETE /api/user/:id": (req, res) => {
    const { id } = req.params;
    const delIndex = userList.list.findIndex((user) => user.id === +id);
    userList.list.splice(delIndex, 1);
    res.json({
      success: true,
      errorCode: 0
    });
  },
  "PATCH /api/user/:id": (req, res) => {
    const { id: userId } = req.params;
    const newUserInfo = req.body;

    for (let i = 0; i < userList.list.length; i++) {
      const target = userList.list[i];
      if (target.id === +userId) {
        for (let key in newUserInfo) {
          if (newUserInfo.hasOwnProperty(key)) {
            userList.list[i][key] = newUserInfo[key];
          }
        }
        break;
      }
    }

    res.json({
      success: true,
      errorCode: 0
    });
  },
  "POST /api/user": (req, res) => {
    const newUserInfo = req.body;
    const isExist = userList.list.some((user) => user.account === newUserInfo.account);
    if (isExist) return res.json({ success: false, errorCode: -1, errMsg: "用户已存在" });

    const newId = userList.list[userList.list.length - 1].id + 1;
    userList.list.push({
      ...newUserInfo,
      id: newId,
      enable: true,
      password: newUserInfo.password || "123123",
      avatar: Mock.Random.image("80x80", Mock.Random.color(), "#757575", "png", "User"),
      nickName: newUserInfo.nickName || Mock.Random.last()
    });
    res.json({
      success: true,
      errorCode: 0,
      data: newUserInfo
    });
  }
};
