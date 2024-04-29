import { defineConfig } from "@umijs/max";
import { resolve } from "path";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  dva: {},
  layout: {
    title: "coder station"
  },
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      name: "首页",
      path: "/home",
      component: "./Home",
      icon: "HomeOutlined"
    },
    {
      name: "管理员",
      path: "/admin",
      icon: "UserOutlined",
      routes: [
        {
          name: "管理员列表",
          path: "list",
          component: "./Admin/adminList"
        },
        {
          name: "添加管理员",
          path: "add",
          component: "./Admin/addAdmin"
        }
      ]
    },
    {
      name: "用户",
      path: "/user",
      icon: "TeamOutlined",
      routes: [
        {
          name: "用户列表",
          path: "list",
          component: "./User/userList"
        },
        {
          name: "添加用户",
          path: "add",
          component: "./User/addUser"
        },
        {
          name: "编辑用户",
          path: "edit/:id",
          component: "./User/editUser",
          hideInMenu: true
        }
      ]
    },
    {
      name: "书籍",
      path: "/books",
      component: "./Books",
      icon: "ReadOutlined",
      routes: [
        {
          name: "书籍列表",
          path: "list",
          component: "./Books/bookList"
        },
        {
          name: "添加书籍",
          path: "add",
          component: "./Books/addBook"
        }
      ]
    },
    {
      name: "面试题",
      path: "/interview",
      component: "./Interview",
      icon: "SignatureOutlined"
    },
    {
      name: "问答",
      path: "/issue",
      component: "./Issue",
      icon: "GlobalOutlined"
    },
    {
      name: "评论",
      path: "/comment",
      component: "./Comment",
      icon: "CommentOutlined"
    },
    {
      name: "类型",
      path: "/type",
      component: "./Type",
      icon: "ProductOutlined"
    }
  ],
  alias: {
    utils: resolve(__dirname, "./src/utils"),
    components: resolve(__dirname, "./src/components"),
    assets: resolve(__dirname, "./src/assets"),
    services: resolve(__dirname, "./src/services")
  },

  npmClient: "pnpm"
});
