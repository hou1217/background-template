<template>
  <!-- toast弹框 -->
  <!-- <transition name="fade"> -->
    <div class="toast" v-if="toastVisible">
      <div class="icon" v-if="toastData.icon">
        <img :src="toastData.icon">
      </div>
      <div class="text">{{toastData.msg}}</div>
    </div>
  <!-- </transition> -->
</template>
<script>
import { setTimeout } from 'timers';
export default {
  props:{
    toastVisible:{
      type: Boolean,
      default:false
    },
    toastData: {
      type: Object,
      
      default: () =>({
        icon: null,
        msg: ''
      })
    },
  },
  data(){
    return{
      
    }
  },
  watch:{
    'toastVisible':{
      handler(val){
        if(val){
          setTimeout(()=>{
            this.$parent.toastVisible = false;
          },2000)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.toast {
  display flex
  position fixed
  padding 6px 15px
  align-items center
  top 50%
  left 50%
  background rgba(0,0,0,0.8)
  border-radius 4px
  z-index 1000
  -webkit-transform: translate(-50%, -50%)
  -moz-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  -o-transform: translate(-50%, -50%)
  transform: translate(-50%, -50%)
  
  .icon {
    width 31px
    height 31px
    margin-right 3px
    
    img {
      width 100%
      height 100%
      object-fit cover
    }
  }
  
  .text {
    font-family PingFangSC-Regular
    font-size 16px
    color #FFFFFF
  }
}
</style>

