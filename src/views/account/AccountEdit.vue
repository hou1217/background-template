<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/account' }">
          <span style="color: #3b8ee7;">账户管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>绑定角色</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <el-form 
        ref="dynamicValidateForm" 
        :model="inputAccount" 
        label-width="100px">
				<el-form-item prop="appUid" label="账户名称">
					<el-col :span="6">
						<el-input 
              :disabled="true"
              v-model="inputAccount.appUid"></el-input>
					</el-col>
				</el-form-item>
        <el-form-item label="角色">
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
                label="是否管理员"
                
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.root">是</span>
                  <span v-else>否</span>
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
                      layout="total, sizes, prev, pager, next" 
                      background
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
import {accountApi} from '@/service/account'
import {rightsApi} from '@/service/rights'
import { setTimeout } from 'timers'
export default {
  name:'accountEdit',
  data() {
    return {
      inputAccount:{
        accId:'',
        appUid:'',
        roleIdList:[],
      },
      dataLoading:true,
      count:0,
      pageSize:10,
      currentPage:1,
      roleList:[],//角色列表
      clickState:false,
    }
  },

  created(){
    this.getAccountDetail()
    setTimeout(()=>{
      this.getRoleList();
    },300)
  },
  methods:{
    getRowKey(row){
      return row.id
    },
    handleSelectionChange(val){
      console.log(val);
      this.inputAccount.roleIdList = val.map(item => item.id)
      console.log(this.inputAccount.roleIdList);
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
    // 获取角色列表
    getRoleList(){
      rightsApi.getRoleList({
        page: this.currentPage,
        pageSize: this.pageSize
      }).then((res) => {
        console.debug('获取列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.roleList = response.data;
          this.count = response.total;
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
        console.error('获取列表出错');
        console.error(err);
      });
    },
    //获取用户详情
    getAccountDetail(){
      accountApi.getAccountDetail({
        accId:this.$route.query.accId
      })
      .then((res) => {
        console.debug('成功');
        console.debug(res);
        let response = res.data
        this.inputAccount.accId = response.accId    
        this.inputAccount.appUid = response.appUid    
        this.hasSelectList = response.roleList
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
          accountApi.updateAccount(this.inputAccount)
          .then((res) => {
            console.debug('更新成功');
            console.debug(res);
            let response = res
            if (response) {
              this.$message({
                duration:500,
                message: '更新成功',
                type: 'success',
                onClose:()=>{
                  this.clickState = false
                  this.$router.go(-1)
                }
              })
            }
          }).catch((err) => {
            console.error('更新出错');
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
