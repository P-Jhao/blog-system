import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
// import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasUserInfo = store.getters.user;

  if (to.meta.auth) {
    //需要鉴权的页面
    if (hasUserInfo) {
      //有用户信息
      next();
    } else {
      if (localStorage.getItem("adminToken")) {
        //没用户信息但有秘钥
        try {
          await store.dispatch("user/getInfo");
          //秘钥有效
          next();
        } catch (err) {
          await store.dispatch("user/resetToken");
          Message.error(err);
          next("/login");
        }
      } else {
        next("/login");
      }
    }
  } else {
    //不需要鉴权的页面
    if (to.path === "/login" && hasUserInfo) {
      next({ path: "/" });
    } else {
      next();
    }
  }
  NProgress.done();
});
//下方是vue-element-admin原鉴权流程
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
