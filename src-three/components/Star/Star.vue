<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>

  </div>
</template>
<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    props: {
      //star需要哪些属性,一方面是根据评分，星星显示不同，一方面是星星大小不同,props指明属性的类型
      score: Number,
      size: Number
    },
    computed: {
      //根据评分，计算生成星星，例如3.5分
      starClasses(){
        const scs = []
        const {score} = this //根据评分计算得出，首先要获取到评分
        //添加n个类名on，根据评分的整数部分计算得出
        const scsInteger = Math.floor(score)  //得到整数部分
        for (var i = 0; i <scsInteger; i++) {
          scs.push(CLASS_ON)
        }

        //添加n个类名half，根据评分的小数部分计算得出，小数部分>=0.5就是half
        if (score*10 - scsInteger*10 >= 5){ //小数计算会有定义误差，所以将小数全部转换成整数计算
          scs.push(CLASS_HALF)
        }

        //添加n个类名off，根据scs.length是否为5，若为5则没有off，若不为5，则剩下的就是off
        while (scs.length < 5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
