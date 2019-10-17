<template>
  <div class="spread-setting-component">
    <div class="component-title"></div>
    <el-form ref="spreadSettingForm"
             class="spread-setting-form"
             label-width="110px"
             label-position="right"
             :model="spreadData">
      <el-form-item class="form__label">
        <div class="form__label" slot="label">注水浏览数</div>
        <div>
          每小时新增
          <el-input-number
            controls-position="right"
            size="small"
            :step="1"
            :step-strictly="true"
            :min="0"
            v-model="spreadData.clickConfig.speed"></el-input-number>
          次，直至满
          <el-input-number
            controls-position="right"
            size="small"
            :step="1"
            :step-strictly="true"
            :min="0"
            v-model="spreadData.clickConfig.goal"></el-input-number>
          <!-- <el-input class="handle-box"
                    v-model="spreadData.clickConfig.goal"></el-input> -->
          次结束执行
        </div>
      </el-form-item>
      <!--<el-form-item class="form__label">-->
        <!--<div class="form__label" slot="label">注水点赞数</div>-->
        <!--<label>-->
          <!--每小时新增-->
          <!--<el-input-number-->
            <!--controls-position="right"-->
            <!--size="small"-->
            <!--:step="1"-->
            <!--:step-strictly="true"-->
            <!--:min="0"-->
            <!--v-model="spreadData.thumbUpConfig.speed"></el-input-number>-->
          <!--&lt;!&ndash; <el-input class="handle-box"-->
                    <!--v-model="spreadData.thumbUpConfig.speed"></el-input> &ndash;&gt;-->
          <!--个，直至满-->
          <!--<el-input-number-->
            <!--controls-position="right"-->
            <!--size="small"-->
            <!--:step="1"-->
            <!--:step-strictly="true"-->
            <!--:min="0"-->
            <!--v-model="spreadData.thumbUpConfig.goal"></el-input-number>-->
          <!--&lt;!&ndash; <el-input class="handle-box"-->
                    <!--v-model="spreadData.thumbUpConfig.goal"></el-input> &ndash;&gt;-->
          <!--个结束执行-->
        <!--</label>-->
      <!--</el-form-item>-->
      <el-form-item class="form__label">
        <div class="form__label" slot="label">状态</div>
        <el-select placeholder="请选择状态"
                   v-model="spreadData.state">
          <el-option v-for="statusItem in statusList"
                   :label="statusItem.label"
                   :key="statusItem.value"
                   :value="statusItem.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SpreadSetting",
    props: {
      spreadData: {
        type: Object,
        default() {
          return {
            clickConfig: {
              timeUnit: 'HOUR',
              speed: 0,
              goal: 0
            },
            // thumbUpConfig: {
            //   timeUnit: 'HOUR',
            //   speed: 0,
            //   goal: 0
            // },
            state: 'END'
          }
        }
      }
    },
    data() {
      return {
        statusList: [
          {
            label: '启用',
            value: 'START'
          },
          {
            label: '停止',
            value: 'END'
          }
        ],
      }
    },
  }
</script>

<style scoped lang="stylus">
  .spread-setting-component {
    width 100%
  }
  
  .component__title {
    font-weight bold
    margin-bottom 20px
  }
  
  .spread-setting-form {
    border-bottom 1px solid #e3e3e3
  }
  
  .form__label {
    width 100%
    /*text-align center*/
    padding-right 20px
    box-sizing border-box
  }
  
  .handle-box {
    width 100px
  }
</style>
