<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/shopgoods" replace>点餐</router-link><!--replace的作用是，点击跳转的时候，可以直接跳转到MSite界面-->
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopinfo" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>  <!--为了解决路由缓存的问题-->
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>

  import ShopHeader from '../../components/ShopHeader/ShopHeader'
  export default {
    components:{
      ShopHeader
    },
    mounted() {
      this.$store.dispatch('getInfo')
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        &.router-link-active
          color #02a774
</style>
