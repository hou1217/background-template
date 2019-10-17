<template>
   <span class="words-number-tip" v-show="isShow">
     *{{text}}
    </span>
</template>
<script>
export default {
  props:{
    text:{
      type:String,
      default:'已超出最大字数限制'
    },
    isShow:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {

    }
  },
  watch:{
    'isWatch':{
      handler(val){
        if(val.length > 9){
          this.$emit("listenNumber",true) 
        }else{
          this.$emit("listenNumber",false) 
        }
      },
      immediate: true
    }
  },
}
</script>
