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
    title: "React+umi"
  },
  routes: [
    {
      path: "/",
      redirect: "/home",
      access: "normalAdmin"
    },
    {
      name: "首页",
      path: "/home",
      component: "./Home",
      icon: "HomeOutlined",
      access: "normalAdmin"
    },
    {
      name: "管理员",
      path: "/admin",
      icon: "UserOutlined",
      access: "superAdmin",
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
      access: "normalAdmin",
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
      icon: "ReadOutlined",
      access: "normalAdmin",
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
        },
        {
          name: "编辑书籍",
          path: "edit/:id",
          component: "./Books/editBook",
          hideInMenu: true
        }
      ]
    },
    {
      name: "面试题",
      path: "/interview",
      component: "./Interview",
      icon: "SignatureOutlined",
      access: "normalAdmin"
    },
    {
      name: "问答",
      path: "/issue",
      component: "./Issue",
      icon: "GlobalOutlined",
      access: "normalAdmin"
    },
    {
      name: "评论",
      path: "/comment",
      component: "./Comment",
      icon: "CommentOutlined",
      access: "normalAdmin"
    },
    {
      name: "类型",
      path: "/type",
      component: "./Type",
      icon: "ProductOutlined",
      access: "normalAdmin"
    },
    {
      path: "/login",
      component: "./Login",
      layout: false
    }
  ],
  alias: {
    utils: resolve(__dirname, "./src/utils"),
    components: resolve(__dirname, "./src/components"),
    assets: resolve(__dirname, "./src/assets"),
    services: resolve(__dirname, "./src/services"),
    constants: resolve(__dirname, "./src/constants")
  },

  npmClient: "pnpm"
});
