import Vue from 'vue'
import VueRouter from 'vue-router'
//引入页面组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from "../views/User.vue"
import Edit from "../views/Edit.vue"
import MyFollow from "../views/MyFollow.vue"
import MyComment from "../views/MyComment.vue"
import MyStar from '../views/MyStar.vue'
import Home from '../views/Home.vue'
//实例化路由
//细节：项目中(模块工程中) 必须要使用Vue.use()安装一下，把路由当成插件来使用
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name:"login",
      component: Login,
    },
    {
      path: '/register',
      name:'register',
      component: Register,
    },
    {
      path:'/user',
      name:'/user',
      component:User
    },
    {
      path:'/edit',
      name:'/edit',
      component:Edit
    },
    {
      path:'/my-follow',
      name:'/my-follow',
      component:MyFollow
    },
    {
      path:'/my-comment',
      name:'/my-comment',
      component:MyComment
    },
    {
      path:'/my-star',
      name:'/my-star',
      component:MyStar
    },
    {
      path:'/home',
      name:'/home',
      component:Home
    }
  ],
})


//全局前置守卫
//1.to
//2.from
//3.next 允许进入
router.beforeEach((to,from,next) => {
const authPath=['/user','/my-follow','/my-comments','/my-star']
  if (authPath.includes(to.path)) {  // 未完待续
      
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }else {  // 放行
    next()
  }
})
//导出
export default router
