<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/rights' }">
          <span style="color: #3b8ee7;">角色管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>编辑角色</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <el-form ref="dynamicValidateForm" :model="inputAccount" label-width="100px">
				<el-form-item 
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
          prop="name"
          label="名称">
          <el-col :span="6">
						<el-input 
              maxlength="20"
              v-model="inputAccount.name"></el-input>
					</el-col>
          <span class="words-number-tip" v-show="wordsNumberTip">*已超出最大字数限制</span>
				</el-form-item>
        <el-form-item label="权限">
					<el-col :span="16">
            <el-table
              :row-key="getRowKey"
              ref="rightsTable"
              :data="rightsList"
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
        <el-form-item 
          :rules="[{ required: false}]"
          label="管理员">
          <el-radio v-model="inputAccount.root" :label="true">是</el-radio>
          <el-radio v-model="inputAccount.root" :label="false">否</el-radio>
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
  name:'roleEdit',
  data() {
    return {
      inputAccount:{
        name:'',
        permissionIdList:[],
        root:false
      },
      rightsList:[],//权限列表
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
    'inputAccount.name':{
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
    this.getRoleDetail();
    setTimeout(()=>{
      this.getRightsList();
    },300)
  },
  methods:{
    getRowKey(row){
      return row.id
    },
    // 分页变化
    handleSizeChange(val) {
      console.debug('分页大小变化');
      this.getRightsList();
    },
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.getRightsList();
    },
    //获取权限列表
    getRightsList(){
      rightsApi.getRightsList({
        page:this.currentPage,
        pageSize:this.pageSize
      })
      .then((res) => {
        console.debug('获取权限列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.rightsList = response.data
          this.count = response.total
          this.$nextTick(()=>{
            console.log(this.hasSelectList);
            if(this.rightsList && this.rightsList.length > 0){
              this.rightsList.forEach(row=>{
                if(this.hasSelectList.indexOf(row.id) >= 0){
                  this.$refs.rightsTable.toggleRowSelection(row,true);
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
      this.inputAccount.permissionIdList = val.map(item => item.id)
      console.log(this.inputAccount.permissionIdList);
    },
    // 获取路径详情
    getRoleDetail(){
      rightsApi.getRoleDetail({
        id:this.$route.query.id
      })
      .then((res) => {
        console.debug('成功');
        console.debug(res);
        let response = res.data
        this.inputAccount.name = response.name;
        this.hasSelectList = response.permissionIdList?response.permissionIdList:[]
        this.inputAccount.permissionIdList = this.hasSelectList
        this.inputAccount.root = response.root;
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
          rightsApi.updateRole({
            id:this.$route.query.id,
            name:this.inputAccount.name,
            permissionIdList:this.inputAccount.permissionIdList,
            root:this.inputAccount.root
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
