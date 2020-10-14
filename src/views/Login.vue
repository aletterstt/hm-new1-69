<template>
  <div>
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>

    <!-- 输入框 -->

    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      clearable
      :error-message="usernameErrMsg"
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      clearable
      :error-message="passwordErrMsg"
      @input="checkPassword"
      @clear="clearPassword"
    />

    <hm-button @click.native="startLogin">登录</hm-button>

    <!-- 如果没有账号 -->
    <div class="link">
      如果没有账号，请点击 <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '10086',
      password: '123',

      usernameErrMsg: '',
      passwordErrMsg: '',
    }
  },
  create() {
    console.log(this.$router, this.$route)
    //方法一
    // const { username, password } = this.$route.query
    const { username, password } = this.$route.params

    if (username && password) {
      this.username = username
      this.password = password
    }
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式不正确'
      }
    },
    //清除用户名
    clearUsername() {
      this.usernameErrMsg = ''
    },
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '用户名格式不正确'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
   async startLogin(){
     try{
        await this.$dialog.confirm({
       title:"提示",
       message:"登录吗？",

     })
     let res=await this.$axios.post('/login',{
         username:this.username,
         password:this.password,
       })
       const { statusCode, message, data } = res.data
          if (statusCode === 200) {
              // console.log(data.token)
              this.$toast.success('登录成功')
              //保存token到本地
              localStorage.setItem('token', data.token)
              //将用户id保存到本地
              localStorage.setItem('user_id',data.user.id)
              this.$toast.success(message)
              this.$router.push('/user')
            } else {
              this.$toast.success('登录失败')
            }
     }
    catch(error){
         console.log('取消');
     }
    },
   async startLogin1() {
    /*  this.$dialog.confirm({
       title:"提示",
       message:"登录吗？",

     }).then(r=>{
       this.$axios.post('/login',{
         username:this.username,
         password:this.password
       })
     }).catch(err=>{
       console.log('登录结果', res)
            const { statusCode, message, data } = res.data
            if (statusCode === 200) {
              // console.log(data.token)
              this.$toast.success('登录成功')
              //保存token到本地
              localStorage.setItem('token', data.token)
              //将用户id保存到本地
              localStorage.setItem('user_id',data.user.id)
              this.$toast.success(message)
              this.$router.push('/user')
            } else {
              this.$toast.success('登录失败')
            }
     }) */

      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
      let res=await this.$axios
          .post('/login', {
            username: this.username,
            password: this.password,
          })
           console.log('登录结果', res)
            const { statusCode, message, data } = res.data
            if (statusCode === 200) {
              // console.log(data.token)
              this.$toast.success('登录成功')
              //保存token到本地
              localStorage.setItem('token', data.token)
              //将用户id保存到本地
              localStorage.setItem('user_id',data.user.id)
              this.$toast.success(message)
              this.$router.push('/user')
            } else {
              this.$toast.success('登录失败')
            }
      } else {
        this.$toast.fail('登录失败')
      }
    },
  },
}
</script>

<style></style>
