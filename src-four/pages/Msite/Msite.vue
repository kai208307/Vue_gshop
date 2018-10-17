<template>
  <section class="msite">
    <!--首页头部-->
    <TopHeader :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>

          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <ShopList/>
    </div>
  </section>
</template>
<script>
  //轮播部分，引入swiper库
  import Swiper from 'swiper'
  //从state中获取属性
  import {mapState} from 'vuex'

  import ShopList from '../../components/ShopList/ShopList'


  export default {
    data(){
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      ShopList
    },
    computed:{
      ...mapState(['address','categorys']),
      //轮播部分，产生一个二维数组，小数组中的元素长度最大为8
      categorysArr(){
        const bigArr = [] //大数组
        let smallArr = [] //小数组
        const {categorys} = this
        categorys.forEach(c=>{
          // console.log(categorys);
          //然后将小数组中放到大数组中，但是要进行判断，若小数组为空数组，放到大数组中，若不判断的话，大数组中放入的都是重复的数组
          if (smallArr.length === 0){
            bigArr.push(smallArr)
          }
          //首先遍历所有的categorys，放到小数组中
          smallArr.push(c)
          //最后判断小数组的长度是否达到最大值8，若达到了最大值，就要重新创建一个空数组，继续放入元素
          if (smallArr.length === 8) {
            smallArr = []
          }
        })
        return bigArr
      }
    },

    mounted() {
      //从后台获取商品分类列表
      this.$store.dispatch('getCategory')
    },
    //将轮播图的显示放在vue.nextTick中，当
    watch:{
      categorys(){  //指明监视的对象是谁，必须的
        this.$nextTick(()=>{
          new Swiper ('.swiper-container', {
            loop: true, // 循环模式
            // 如果需要分页器,即小圆点
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
