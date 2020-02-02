import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login"
import Home from "@/components/Home"
import welcome from "@/components/welcome"
import users from "@/components/users/users"
import rights from "@/components/power/rights"
import role from "@/components/power/role"
import category from "@/components/goods/category"
import params from "@/components/goods/params"
import List from "@/components/goods/List"
import add from "@/components/goods/add"
import orders from "@/components/orders/orders"
import report from "@/components/report/report"

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
Vue.use(Router);
var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: "/home", name: "home",
      component: Home,
      redirect: "/welcome",
      children: [
        {
          path: "/welcome",
          component: welcome
        },
        {
          path: "/users",
          component: users
        },
        {
          path: "/rights",
          component: role
        },
        // ,
        // {
        //   path: "/role",
        //   component: role
        // }
        // {
        //   path: "/goods",
        //   component: category
        // },
        {
          path: "/goods",
          component: params
        },
        // {
        //   path: "/goods",
        //   component: List
        // },
        {
          path: "/goods/add",
          component: add
        }, {
          path: "/orders",
          component: orders
        }, {
          path: "/reports",
          component: report
        }
      ]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach(function (to, from, next) {
  //to  要访问的路径
  //  from   来自的路径
  //  next()  放行函数
  if (to.path == "/login") return next();
  var consult = window.sessionStorage.getItem("token");
  if (!consult) return next("/login");
  nProgress.start()
  next();
})
router.afterEach(function () {
  nProgress.done()
})
export default router;