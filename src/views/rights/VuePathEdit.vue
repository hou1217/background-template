<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/vuePath' }">
          <span style="color: #3b8ee7;">vue路径管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>编辑路径</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <el-form ref="dynamicValidateForm" :model="inputAccount" label-width="100px">
        <el-form-item 
          :rules="[{ required: false, message: '请输入组', trigger: 'blur' }]" 
          prop="group" 
          label="组">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.group"></el-input>
          </el-col>
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
						<el-button type="primary" @click="saveEdit" :disabled="clickState">保存</el-button>
						<el-button @click="cacelEdit">取消</el-button>
					</el-col>
				</el-form-item>
			</el-form>
    </main>
  </div>
</template>
<script>
import {rightsApi} from '@/service/rights'
import { setTimeout } from 'timers';
export default {
  name:'vuePathEdit',
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
  created(){
    this.getPathDetail()
  },
  methods:{
    // 获取路径详情
    getPathDetail(){
      rightsApi.getVuePathDetail({
        id:this.$route.query.id
      })
      .then((res) => {
        console.debug('成功');
        console.debug(res);
        let response = res.data
        this.inputAccount.path = response.path;
        this.inputAccount.desc = response.desc;
        this.inputAccount.group = response.group;

      }).catch((err) => {
        console.error('出错');
        console.error(err);
      });
    },
    saveEdit(){
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }else{
          this.clickState = true
          rightsApi.updateVuePath({
            id:this.$route.query.id,
            path:this.inputAccount.path,
            desc:this.inputAccount.desc,
            group:this.inputAccount.group,
          })
          .then((res) => {
            console.debug('保存成功');
            console.debug(res);
            let response = res.data
            // this.inputAccount.name = response.roleName
            this.$message({
              message: '保存成功',
              type: 'success',
              duration:500,
              onClose:()=>{
                this.clickState = false
                this.$router.go(-1)
              }
            })  
          }).catch((err) => {
            console.error('保存出错');
            setTimeout(()=>{
              this.clickState = false
            },1000)
            console.error(err);
          });
        }
      })
    },
    cacelEdit(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/common/common.styl"></style>
