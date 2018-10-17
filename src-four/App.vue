<template>
 <div>
   <router-view/>
   <FooterGuide v-if="$route.meta.showFooter"/>
 </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
// import {reqAddress} from './api'
export default {
  /*测试使用
  async mounted(){
    const result = await reqAddress('40.10038,116.36867')
    console.log(result);
  },*/
  mounted(){
    //获取adress，保存到state中
    this.$store.dispatch('getAdress')
    //获取user，保存到state中
    this.$store.dispatch('getUser')
  },
  components:{
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style>
