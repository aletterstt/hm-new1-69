import Vue from 'vue'
// 根组件
import App from './App.vue'
// 路由
import router from './router'

Vue.config.productionTip = false

// 引入全局样式文件
import './styles/base.less'
import './styles/iconfont.css'

// 引入 lib-flexible
import 'lib-flexible'


// 注册公共组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'
import HmFloor from './components/HmFloor.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post',HmPost)
Vue.component('hm-comment',HmComment)
Vue.component('hm-floor',HmFloor)

// 方式三 : 全部 引入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// 方式一 : 按需加载
import { Field, Toast,Cell, CellGroup,Dialog ,Radio,RadioGroup,Uploader,List,Tab,Tabs,PullRefresh,Sticky,Icon} from 'vant'

Vue.use(Uploader);

Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);   // install
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast)
Vue.use(Field)
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Sticky);
Vue.use(Icon);
// 注册一个全局过滤器
import moment from 'moment'
Vue.filter('date',function (val,format='YYYY-MM-DD') {
  return  moment(val).format(format)
})


// 处理 axios 
import axios from 'axios'
import { refresh } from 'less'
axios.defaults.baseURL = 'http://localhost:3000'
// 把 axios 挂在到 Vue 原型上, 那么每一个vue实例(vue组件) 里面就可以直接使用了
Vue.prototype.$axios = axios


// 请求拦截器
// 拦截所有的axios的请求 
// axios.get(url,config)
axios.interceptors.request.use((config)=>{
  let token=localStorage.getItem('token')
  if(token){
    config.headers.Authorization = token
  }
  return config
})

//创建一个bus
const bus=new Vue()
//挂在到原型上
Vue.prototype.$bus=bus










//响应拦截器
/* axios.interceptors.response.use((res)=>{
  const {statusCode,message} =res.data
  if(statusCode ===401 && message === "用户信息验证失败"){
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})
 */
new Vue({
  router,   //this.$router
  render: h => h(App),
}).$mount('#app')
