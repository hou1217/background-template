<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/vuePath' }">
          <span style="color: #3b8ee7;">vue路径管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>创建路径</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <el-form ref="dynamicValidateForm" :model="inputAccount" label-width="100px">
        <el-form-item 
          :rules="[{ required: false, message: '请输入组', trigger: 'blur' }]" 
          prop="desc" 
          label="组">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.group"></el-input>
          </el-col>
          <span class="words-number-tip" v-show="wordsNumberTip">*已超出最大字数限制</span>
        </el-form-item>
				<el-form-item 
          :rules="[{ required: true, message: '请输入路径', trigger: 'blur' }]" 
          prop="path" 
          label="路径">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.path"></el-input>
          </el-col>
          <span class="words-number-tip" v-show="wordsNumberTip">*已超出最大字数限制</span>
        </el-form-item>
        <el-form-item 
          :rules="[{ required: true, message: '请输入描述', trigger: 'blur' }]" 
          prop="desc" 
          label="描述">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.desc"></el-input>
          </el-col>
          <span class="words-number-tip" v-show="wordsNumberTip">*已超出最大字数限制</span>
        </el-form-item>
				<el-form-item>
					<el-col :span="16">
						<el-button type="primary" @click="startCreate()" :disabled="clickState">创建</el-button>
						<el-button @click="cacelCreate">取消</el-button>
					</el-col>
				</el-form-item>
			</el-form>
    </main>
  </div>
</template>
<script>
import {rightsApi} from '@/service/rights'
export default {
  name:'vuePathCreateNew',
  data() {
    return {
      inputAccount:{
        path:'',
        desc:'',
        group:''
      },
      wordsNumberTip:false,//字数提示
      clickState:false
    }
  },
  watch:{
    'inputAccount.desc':{
      handler(val){
        if(val.length > 19){
          this.wordsNumberTip = true;
        }else{
          this.wordsNumberTip = false;
        }
      },
      immediate: true
    }
  },
  methods:{
    startCreate(){
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }else{
          this.clickState = true
          rightsApi.createVuePath(this.inputAccount)
          .then((res) => {
            console.debug('创建成功');
            console.debug(res);
            let response = res.data
            if (response) {
              this.$message({
                message: '创建成功',
                type: 'success',
                duration:500,
                onClose:()=>{
                  this.clickState = false
                  this.$router.go(-1)
                }
              })
            }
          }).catch((err) => {
            console.error('创建出错');
            setTimeout(()=>{
              this.clickState = false
            },1000)
            console.error(err);
          });
        }
      });
    },
    cacelCreate(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/common/common.styl"></style>
