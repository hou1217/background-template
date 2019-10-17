<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/rights' }">
          <span style="color: #3b8ee7;">App管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>编辑App</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <el-form ref="dynamicValidateForm" :model="inputAccount" label-width="100px">
				<el-form-item 
          prop="appId"
          label="appId">
          <el-col :span="6">
						<el-input 
              :disabled="true"
              v-model="inputAccount.appId"></el-input>
					</el-col>
          <span class="words-number-tip" v-show="wordsNumberTip">*已超出最大字数限制</span>
				</el-form-item>
        <el-form-item 
          :rules="[{ required: true, message: '请输入appName', trigger: 'blur' }]" 
          prop="appName" 
          label="appName">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.appName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item 
          :rules="[{ required: true, message: '请输入secret', trigger: 'blur' }]" 
          prop="secret" 
          label="secret">
          <el-col :span="6">
            <el-input 
              maxlength="20"
              v-model="inputAccount.secret"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item 
          label="角色"
          :rules="[{ required: false}]" >
					<el-col :span="16">
            <el-table
              :row-key="getRowKey"
              ref="roleTable"
              :data="roleList"
              border
              v-loading="dataLoading"   
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                :reserve-selection="true"
              >
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                label="管理员"
              >
                <template slot-scope="scope">
                  <span>
                    {{scope.row.root?'是':'否'}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 底部按钮及分页 -->
            <el-row>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[10, 20, 50, 100]"
                      :page-size.sync="pageSize"
                      :current-page.sync="currentPage"
                      layout="total, sizes, prev, pager, next" background
                      :total="count">
                    </el-pagination>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
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
import {appApi} from '@/service/app'
import { setTimeout } from 'timers';
export default {
  name:'appEdit',
  data() {
    return {
      inputAccount:{
        appId:'',
        appName:'',
        secret:'',
        roleIdList:[],
      },
      roleList:[],//权限列表
      wordsNumberTip:false,//字数提示
      currentPage:1,
      pageSize:10,
      count:0,
      hasSelectList:[],
      dataLoading:true,
      clickState:false
    }
  },
  watch:{
    'inputAccount.appName':{
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
    this.getAppDetail()
    setTimeout(()=>{
      this.getRoleList();
    },300)
  },
  methods:{
    getRowKey(row){
      return row.id
    },
    // 分页变化
    handleSizeChange(val) {
      console.debug('分页大小变化');
      this.getRoleList();
    },
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.getRoleList();
    },
    //获取权限列表
    getRoleList(){
      rightsApi.getRoleList({
        page:this.currentPage,
        pageSize:this.pageSize
      })
      .then((res) => {
        console.debug('获取权限列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.roleList = response.data
          this.count = response.total
          this.$nextTick(()=>{
            console.log(this.hasSelectList);
            if(this.roleList && this.roleList.length > 0){
              this.roleList.forEach(row=>{
                if(this.hasSelectList.indexOf(row.id) >= 0){
                  this.$refs.roleTable.toggleRowSelection(row,true);
                }
              })
            }
          })
        }
      }).catch((err) => {
        console.error('获取权限列表出错');
        console.error(err);
      });
    },
    handleSelectionChange(val){
      console.log(val);
      this.inputAccount.roleIdList = val.map(item => item.id)
      console.log(this.inputAccount.roleIdList);
    },
    // 获取路径详情
    getAppDetail(){
      appApi.getAppDetail({
        id:this.$route.query.id
      })
      .then((res) => {
        console.debug('成功');
        console.debug(res);
        let response = res.data
        this.inputAccount.appId = response.appId;
        this.inputAccount.appName = response.appName;
        this.inputAccount.secret = response.secret;
        this.hasSelectList = response.roleIdList?response.roleIdList:[]
        this.inputAccount.roleIdList = this.hasSelectList
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
          appApi.updateApp({
            id:this.$route.query.id,
            appId:this.inputAccount.appId,
            appName:this.inputAccount.appName,
            secret:this.inputAccount.secret,
            roleIdList:this.inputAccount.roleIdList
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
