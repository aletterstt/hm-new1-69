<template>
  <div>
    <hm-header>注册</hm-header>
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
      v-model="nicheng"
      required
      label="昵称"
      placeholder="请输入昵称"
      clearable
      :error-message="nichengErrMsg"
      @input="checkNicheng"
      @clear="clearNicheng"
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
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '111105',
      password: '123',
      nicheng: '哈哈哈',
      usernameErrMsg: '',
      nichengErrMsg: '',
      passwordErrMsg: '',
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
    checkNicheng() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/
      if (reg.test(this.nicheng)) {
        this.nichengErrMsg = ''
      } else {
        this.nichengErrMsg = '用户名格式不正确'
      }
    },
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '用户名格式不正确'
      }
    },
    clearUsername() {
      this.usernameErrMsg = ''
    },
    clearNicheng() {
      this.nichengErrMsg = ''
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
   async startRegister() {
      // console.log('注册')

      if (
        this.username !== '' &&
        this.nicheng !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.nichengErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        // this.$toast.success('成功')

      let res=await this.$axios
          .post('/register', {
            username: this.username,
            nicheng: this.nicheng,
            password: this.password,
          })
          console.log(res)
            const {statusCode ,message} = res.data
            if (statusCode === 200) {
              this.$toast.success(message)
              this.$router.push({
                //方法1
               /*  path: '/login',
                query: {
                  username: this.username,
                  password: this.password,
                }, */

                name:'/login',
                params:{
                  username: this.username,
                  password: this.password,
                }

              })
            } else {
              this.$toast.success(message)
            }
      } else {
        this.$toast.fail('失败')
      }
    },
  },
}
</script>

<style></style>
