<template>
  <div>
    <p>{{ nickname }}</p>
    <el-button type="primary" size="small" @click="add('测试用户名')">点击</el-button>
  </div>
</template>

<script>
  
  import { createNamespacedHelpers } from 'vuex'
  // const { mapState, mapActions } = createNamespacedHelpers('user')
  const { mapState, mapActions, mapMutations } = createNamespacedHelpers('user')
  
  
  export default {
    name: 'user',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      ...mapState({
        'nickname': 'nickname',
        'id': 'id'
      })
    },
    methods: {
      // changeNickname() {
      //   console.debug(this.$store);
      //   this.$store.commit('user/changeNickname', '测试用户名');
      //   console.debug('end');
      // }
      ...mapMutations({
        add: 'changeNickname'
      })
    }
    
    
    
    //   {
    //   changeNickname() {
    //     this.$store.commit('user/changeNickname', '测试用户名');
    //   }
    // }
    
  }
</script>
