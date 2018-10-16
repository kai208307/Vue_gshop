<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isLogin}" @click="isLogin=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isLogin}" @click="isLogin=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isLogin}" >
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="computedTime>0 || !phone" class="get_verification" :class="{right_phone_number: isRightNumber}" @click.prevent="sendCode">{{computedTime>0 ? `已发送(${computedTime}s)` : '获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isLogin}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="{right:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="updateCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:;" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
</template>
<script>
  import {Toast,MessageBox} from 'mint-ui'
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api/index'
  export default {
    data(){
      return {
        isLogin: true, //有这个标识的话，就添加on
        phone: '', //初始化的手机号
        code: '',//验证码
        name: '',//用户名
        pwd: '',//密码
        captcha: '',//图形验证码
        computedTime: 0, //初始化倒计时时间为0
        isShowPwd: false,  //初始化不显示密码
      }
    },
    computed:{
      isRightNumber(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async sendCode(){
        this.computedTime = 5
        const intervalId = setInterval(()=>{
          this.computedTime--
          if (this.computedTime === 0){
            //清除定时器
            clearInterval(intervalId)
          }
        },1000)
        //发送请求:发送短信验证码
        const {phone} = this
        const result = await reqSendCode(phone)
        if (result.code === 0){
          //成功
          // alert('验证码发送成功')
          Toast('验证码发送成功')
        } else{
          //失败
          // alert('短信验证码发送失败')
          this.computedTime = 0 //清除定时器
          MessageBox.alert(result.msg).then(action => {
            console.log('验证码发送失败');
          });
        }
      },
      //更新验证码，不通过发送ajax请求更新，直接每次重新指定src更新
      updateCaptcha(event) {
        //获取到src，两种方法，一种是event.target，另一种是ref属性
        // event.target.src = 'http://localhost:4000/captcha?time' + Date.now()  //event.target中欧src属性，重新赋值，但需要添加一个时间戳，告诉浏览器需要发生改变了
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time' + Date.now()  //refs属性方法，同样需要时间戳，告诉浏览器需要更新了
      },
      //请求登录
      async login(){
        let result
        if (this.isLogin){  //短信登录
          const {phone,code} = this
          //前台表单验证
          if (!this.isRightNumber){
            return MessageBox.alert('请输入正确的手机号')
          } else if(!/^\d{6}$/.test(code)){
            return MessageBox.alert('请输入正确的短信验证码')
          }
          //发送请求
          result = await reqSmsLogin(phone,code)
        } else{ //密码登录
          const {name,pwd,captcha} = this
          //前台表单验证
            if (!name){
            return MessageBox.alert('请输入正确的用户名')
          } else if(!pwd) {
              return MessageBox.alert('请输入正确的密码')
          }else if(!/^.{4}$/.test(captcha)){
              return MessageBox.alert('请输入正确的验证码')
          }
            //发送密码登录请求
          result = await reqPwdLogin({name,pwd,captcha})
        }
        //发送请求之后，清除定时器
        this.computedTime = 0
        //发送请求之后，更新图形验证码
        this.updateCaptcha()
        //图形验证码清空
        this.captcha = ''
        //根据请求结果进行相应的处理
        if(result.code === 0){
          //请求成功,将user信息保存到state中
          const user = result.data
          console.log(user);
          this.$store.dispatch('saveUser',user)
          //跳转到个人中心页面
          this.$router.replace('/profile')
        }else{
          //请求失败
           MessageBox.alert(result.msg)
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  /*transform translateX(27px)*/
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
