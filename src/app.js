import { getAdminInfoApi, logoutApi } from "services/admin";
import { message } from "antd";

export async function getInitialState() {
  const token = localStorage.getItem("token");
  // 登录鉴权
  if (location.pathname === "/login") {
    if (!token) return;
    const { data } = await getAdminInfoApi();
    if (data) {
      await message.warning("请先退出登录", 0.3);
      history.go(-1);
      return { name: data.nickName, avatar: data.avatar, adminInfo: data };
    }
  } else {
    if (!token) {
      await message.warning("请先登录", 0.5);
      location.href = "/login";
      return;
    }

    const { data, errMsg } = await getAdminInfoApi();
    if (!data) {
      localStorage.removeItem("token");
      await message.warning(errMsg, 0.5);
      location.href = "/login";
    }

    return { name: data.nickName, avatar: data.avatar, adminInfo: data }; // 组件中可以使用umi提供的useModel方法获取
  }
}

export function layout() {
  return {
    menu: { locale: false },
    async logout() {
      // 获取登录的用户信息
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      await logoutApi({ id: adminInfo.id });
      // 删除本地token
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");
      // 跳转登录页面
      message.success("退出登录成功", 1, () => {
        location.replace("/login");
      });
    }
  };
}

export const request = {
  timeout: 3000,
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem("token");
      if (token) {
        options.headers["Authorization"] = token;
      }

      return { url, options };
    }
  ]
};
