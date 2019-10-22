<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <!-- 搜索栏 -->
      <el-row>
        <el-col :span="24">
          <div class="handle-box">
            <!-- 搜索用户名称 -->
            <el-col :span="4" class="input-box">
              <el-input v-model="select_account" clearable placeholder="账户名称"></el-input>
            </el-col>
            <el-col :span="4" class="input-box">
              <el-input v-model="select_phone" clearable placeholder="手机号"></el-input>
            </el-col>
            <el-button type="primary" icon="el-icon-search" @click.stop="search">
              查询
            </el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table ref="accountTable"
        :row-key="getRowKey"
        :data="accountList"
        border
        v-loading="dataLoading"        
      >
        <!-- <el-table-column type="selection" :reserve-selection="true"></el-table-column> -->
        <el-table-column label="appId" prop="appId"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="账户名称" prop="appUid"></el-table-column>
        <el-table-column label="序列号" prop="serialNo"></el-table-column>
        <el-table-column label="角色数量" prop="roleList.length"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="accountEdit(scope.row)">
              绑定角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部按钮及分页 -->
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <div class="handle-box2">
            </div>
          </div>
        </el-col>
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
    </main>
  </div>
</template>
<script>
import {accountApi} from '@/service/account'
export default {
  name:'account',
  data() {
    return {
      select_account: '',
      select_phone:'',
      rolesList:[],// 角色列表
      loading: false,
      accountList:[],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      dataLoading:true
    }
  },
  created(){
    this.select_account = this.$route.query.account?this.$route.query.account:'';
    this.select_phone =  this.$route.query.phone?this.$route.query.phone:'';
    this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1;
    this.pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 10;
    this.getAccountList()
  },
  methods:{
    //编辑用户
    accountEdit(row){
      console.log(row);
      this.$router.push({
        path: 'accountEdit',
        query:{
          accId:row.accId
        }
      })
    },
    //删除用户
    deleteAccount(row){
      this.$confirm('是否要删除该用户账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.goOnDeleteAccount(row)
      }).catch(() => {
        this.$message({
          duration:500,
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 继续删除
    goOnDeleteAccount(row){
      accountApi.deleteAccounts([row.id])
      .then((res) => {
        console.debug('删除用户成功');
        console.debug(res);
        this.getAccountList()
        this.$message({
          duration:500,
          type: 'success',
          message: '删除成功!'
        });
      }).catch((err) => {
        console.error('删除用户出错');
        console.error(err);
      });
    },
    /**
     * 分页操作
     */
    handleSizeChange(val) {
      console.debug('每页大小变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          pageSize: val,
          account: this.$route.query.account ? this.$route.query.account : '',
          phone: this.$route.query.phone ? this.$route.query.phone : '',
        }
      });
      this.getAccountList();
    },
    // 页码变化
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: val,
          pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 10,
          account: this.$route.query.account ? this.$route.query.account : '',
          phone: this.$route.query.phone ? this.$route.query.phone : '',

        }
      });
      this.getAccountList();
    },
    // 创建弹窗
    createPop(){
      this.$router.push({
        path: 'createNewAccount'
      });
    },
    // 获取用户列表
    getAccountList(){
      accountApi.getAccountList({
        phone: this.$route.query.phone ? this.$route.query.phone : '',
        appUid:this.$route.query.account ? this.$route.query.account : '',
        page: this.$route.query.page ? this.$route.query.page : this.currentPage,
        pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : this.pageSize,
      }).then((res) => {
        console.debug('获取列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.accountList = response.data;
          this.count = response.total;
        }
      }).catch((err) => {
        console.error('获取列表出错');
        console.error(err);
      });
    },
    // 根据条件查询
    search() {
      console.debug('查询');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 10,
          account: this.select_account,
          phone: this.select_phone
        }
      });
      this.getAccountList();
    },
    getRowKey(row){
      return row.id
    },
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/common/common.styl"></style>