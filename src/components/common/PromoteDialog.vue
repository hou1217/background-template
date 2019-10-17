<template>
  <!-- 注水弹窗 -->
  <el-dialog title="内容推广"
      :visible="dialogVisible"
      @close="onClose()"
      width="50%"
      :before-close="dialogClose">
    <el-form ref="spreadSettingForm"
      class="spread-setting-form"
      :model="spreadSettingData"
      label-width="100px">
      <el-form-item label="注水浏览数">
        <div>
          每小时新增
          <el-input-number 
            controls-position="right"
            size="small"
            :step="1"
            :step-strictly="true"
            :min="1" 
            v-model="spreadSettingData.clickConfig.speed"></el-input-number>次，直至满
          <el-input-number 
            controls-position="right"
            size="small"
            :step="1"
            :step-strictly="true"
            :min="1" 
            v-model="spreadSettingData.clickConfig.goal"></el-input-number>次结束执行
          <!-- <el-input 
            class="handle-input handle-input_popup"
            type="number"
            min="1"
            v-model="spreadSettingData.clickConfig.goal"></el-input> -->
        </div>
      </el-form-item>
      <el-form-item label="注水点赞数">
        <div>
          每小时新增
          <el-input-number 
            controls-position="right"
            :min="1" 
            size="small"
            :step="1"
            :step-strictly="true"
            v-model="spreadSettingData.thumbUpConfig.speed"></el-input-number>个，直至满
          <el-input-number 
            controls-position="right"
            :min="1" 
            size="small"
            :step="1"
            :step-strictly="true"
            v-model="spreadSettingData.thumbUpConfig.goal"></el-input-number>个结束执行
          <!-- <el-input 
            class="handle-input handle-input_popup"
            type="number"
            min="1"
            v-model="spreadSettingData.thumbUpConfig.speed"></el-input> -->
          <!-- <el-input 
            class="handle-input handle-input_popup"
            type="number"
            min="1"
            v-model="spreadSettingData.thumbUpConfig.goal"></el-input> -->
        </div>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="spreadConfirm">启用</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },

  },
  data(){
    return{
      spreadSettingData: {
        clickConfig: {
          timeUnit: 'HOUR',
          speed: '',
          goal: ''
        },
        thumbUpConfig: {
          timeUnit: 'HOUR',
          speed: '',
          goal: ''
        }
      },
      
    }
  },
  methods:{
    // 关闭前的回调，会暂停 Dialog 的关闭
    dialogClose(done){
      done()
    },
    onClose(){
      this.$parent.dialogVisible = false
    },
    // 确认推广
    spreadConfirm() {
      this.$emit("spreadConfirm",this.spreadSettingData)
    },
  }
}
</script>

