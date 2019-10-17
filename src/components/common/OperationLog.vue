<template>
  <div class="operation-log-component">
    <div class="component__title">操作日志</div>
    <el-form ref="operationLogForm"
             class="operation-log-form"
             label-width="110px"
             label-position="right">
      <!-- todo 是否会有多条操作日志 -->
      <el-form-item v-for="logItem in logs" :key="logItem.id">
          <div class="form__label" slot="label">{{logItem.opt}}</div>
          <div class="log-box">
            <div class="text">{{logItem.msg}}</div>
            <div class="detail">
              <div class="author">{{logItem.operator}}</div>
              <div class="date">{{logItem.optTime}}</div>
              <!-- <div class="date">{{logItem.createdAt}}</div> -->
            </div>
          </div>
      </el-form-item>
      
      <!-- 输入操作日志 -->
      <el-form-item>
        <div class="form__label" slot="label">操作意见</div>
        <div class="form__main">
          <el-input type="textarea"
                    :rows="3"
                    v-model="log"
                    maxlength="300"></el-input>
        </div>
      </el-form-item>
      
      <el-form-item>
          <el-button type="primary"
                     @click.stop="onLeftClick">
            <slot name="left"></slot>
          </el-button>
          <el-button v-show="rightBtnShow"
                     @click.stop="onRightClick">
            <slot name="right"></slot>
          </el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "OperationLog",
    props: {
      logs: {
        type: Array,
        default() {
          return [];
        }
      },
      rightBtnShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        log: ''
      }
    },
    computed: {
      ...mapState(['logData'])
    },
    created() {
      console.debug('OperationLog created');
      console.debug(this.logData);
      if (this.logData.momentId === this.$route.query.momentId) {
        this.log = this.logData.log;
      }
    },
    methods: {
      ...mapMutations(['SET_LOGDATA']),
      onLeftClick() {
        this.$emit('onLeftClick', this.log);
      },
      onRightClick() {
        console.debug('onRightClick');
        this.$emit('onRightClick', this.log);
      },
    }
  }
</script>

<style scoped lang="stylus">
  .operation-log-component {
    width 100%
  }
  .component__title {
    font-weight bold
    margin-bottom 20px
  }
  .form__label {
    width 100%
    /*text-align center*/
    padding-right 20px
    box-sizing border-box
  }
  .log-box {
    width 100%
    border-bottom 1px solid #e3e3e3
    
    .text {
      margin-bottom 20px
    }
    .detail {
      display: flex
      .author {
        flex 1
      }
      .date {
        flex 1
        text-align right
      }
    }
  }
</style>
