import Mock from "mockjs";
import { omit } from "../src/utils/property";

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
    }
  ]
});

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

    res.json({
      success: true,
      data: { list, total: responseList.length },
      errorCode: 0
    });
  },
  "DELETE /api/admin/:id": (req, res) => {
    const { id } = req.params;
    const delIndex = adminList.list.findIndex((admin) => admin.id === +id);
    adminList.list.splice(delIndex, 1);
    res.json({
      success: true,
      errorCode: 0
    });
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

    res.json({
      success: true,
      errorCode: 0
    });
  },
  "POST /api/admin": (req, res) => {
    const newAdminInfo = req.body;
    const isExist = adminList.list.some((admin) => admin.account === newAdminInfo.account);
    if (isExist) return res.json({ success: false, errorCode: -1, errMsg: "管理员已存在" });

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
    res.json({
      success: true,
      errorCode: 0,
      data: newAdminInfo
    });
  }
};
