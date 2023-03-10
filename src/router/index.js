import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard", auth: true },
      },
    ],
  },

  {
    path: "/banner",
    component: Layout,
    redirect: "/banner",
    children: [
      {
        path: "banner",
        name: "Banner",
        component: () => import("@/views/banner"),
        meta: { title: "首页标语", icon: "el-icon-s-home", auth: true },
      },
    ],
  },

  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-document", auth: true },
    children: [
      {
        path: "/blogList",
        name: "BlogList",
        component: () => import("@/views/blogList/index"),
        meta: { title: "文章列表", icon: "el-icon-s-order", auth: true },
      },
      {
        path: "/blogType",
        name: "BlogType",
        component: () => import("@/views/blogType/index"),
        meta: { title: "文章分类", icon: "el-icon-menu", auth: true },
      },
      {
        path: "/addBlog",
        name: "AddBlog",
        component: () => import("@/views/addBlog/index"),
        meta: { title: "添加文章", icon: "el-icon-circle-plus", auth: true },
      },
      {
        path: "/editBlog/:id",
        name: "editBlog",
        hidden: true,
        component: () => import("@/views/editBlog"),
        meta: { title: "编辑文章", icon: "el-icon-circle-plus", auth: true },
      },
    ],
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-suitcase", auth: true },
    children: [
      {
        path: "/projectList",
        name: "ProjectList",
        component: () => import("@/views/projectList"),
        meta: { title: "项目列表", icon: "el-icon-notebook-1", auth: true },
      },
      {
        path: "/addProject",
        name: "AddProject",
        component: () => import("@/views/addProject"),
        meta: {
          title: "添加项目",
          icon: "el-icon-link",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/commentCtrl",
    component: Layout,
    children: [
      {
        path: "commentCtrl",
        name: "CommentCtrl",
        component: () => import("@/views/commentCtrl"),
        meta: {
          title: "评论管理",
          icon: "el-icon-chat-line-round",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "message",
        name: "Message",
        component: () => import("@/views/message"),
        meta: { title: "留言板", icon: "el-icon-copy-document", auth: true },
      },
    ],
  },

  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about"),
        meta: { title: "关于我", icon: "el-icon-s-custom", auth: true },
      },
    ],
  },

  {
    path: "/upImg",
    component: Layout,
    children: [
      {
        path: "upImg",
        name: "UpImg",
        component: () => import("@/views/upImg"),
        meta: {
          title: "上传图片",
          icon: "el-icon-picture-outline",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/control",
    component: Layout,
    children: [
      {
        path: "control",
        name: "Control",
        component: () => import("@/views/control"),
        meta: { title: "设置", icon: "el-icon-setting", auth: true },
      },
    ],
  },

  {
    path: "/personalSetting",
    component: Layout,
    hidden: true,
    // meta: { children: ['/personalSetting'] },
    children: [
      {
        path: "/personalSetting",
        name: "PersonalSetting",
        component: () => import("@/views/personalSetting"),
        meta: { title: "个人中心", icon: "el-icon-document-copy", auth: true },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
