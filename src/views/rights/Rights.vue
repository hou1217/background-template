<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <!-- 表格 -->
      <el-table ref="accountTable"
        :row-key="getRowKey"
        :data="rightsList"
        border
        v-loading="dataLoading"
      >
        <!-- <el-table-column 
          type="selection"
          :reserve-selection="true">
        </el-table-column> -->
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="路径数量">
          <template slot-scope="scope">
            <span>
              {{scope.row.pathIdList?scope.row.pathIdList.length:'0'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="vue路径数量">
          <template slot-scope="scope">
            <span>
              {{scope.row.vuePathIdList?scope.row.vuePathIdList.length:'0'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="pathEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="text" @click="deletePath(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部按钮及分页 -->
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="handle-box2">
              <el-button type="primary" @click.stop="createPop">创建权限</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
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
import {rightsApi} from '@/service/rights'
export default {
  name:'rights',
  data() {
    return {
      rightsList:[],
      pageSize: 10,
      currentPage: 1,
      count: 0,
      dataLoading:true
    }
  },
  created(){
    this.currentPage = this.$route.query.page ? Number(this.$route.query.page):1;
    this.pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize):10;
    this.getRightsList()
  },
  methods:{
    // 跳转编辑
    pathEdit(row){
      console.log(row);
      this.$router.push({
        path: 'rightsEdit',
        query:{
          id:row.id
        }
      })
    },
    deletePath(id){
      this.$confirm('是否要删除该路径?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.goOnDeletePath(id)
      }).catch(() => {
        this.$message({
          duration:500,
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 继续删除
    goOnDeletePath(id){
      rightsApi.deleteRights({
        id: id,
      }).then((res) => {
        console.debug('删除成功');
        console.debug(res);
        this.getRightsList()
        this.$message({
          duration:500,
          type: 'success',
          message: '删除成功!'
        });
      }).catch((err) => {
        console.error('删除出错');
        console.error(err);
      });
    },
    // 创建
    createPop(){
      this.$router.push({
        path: 'rightsCreateNew'
      })
    },
    handleSizeChange(val) {
      console.debug('分页大小变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          pageSize: val
        }
      });
      this.getRightsList();
    },
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: val,
          pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 10
        }
      });
      this.getRightsList();
    },
    // 获取权限列表
    getRightsList(){
      rightsApi.getRightsList({
        page: this.$route.query.page ? this.$route.query.page : this.currentPage,
        pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : this.pageSize
      }).then((res) => {
        console.debug('获取列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.rightsList = response.data;
          this.count = response.total
        }
      }).catch((err) => {
        console.error('获取列表出错');
        console.error(err);
      });
    },
    getRowKey(row){
      return row.id
    }
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/common/common.styl"></style>


