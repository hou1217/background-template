<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>vue路径管理</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- main -->
    <main class="container container_check-pending">
      <!-- 搜索栏 -->
      <el-row>
        <el-col :span="24">
          <div class="handle-box">
            <!-- 搜索 -->
            <el-col :span="4" class="input-box">
              <el-input v-model="select_group" clearable placeholder="组"></el-input>
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
        :data="vuePathList"
        border
        v-loading="dataLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column 
          type="selection"
          :reserve-selection="true">
        </el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="text-align:center">
              {{scope.row.order}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="组">
          <template slot-scope="scope">
            <span>
              {{scope.row.group}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <span>
              {{scope.row.desc}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="路径">
          <template slot-scope="scope">
            <span>
              {{scope.row.path}}
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
              <el-button type="primary" @click.stop="createPop">创建vue路径</el-button>
              <el-button type="primary" @click.stop="deletePath()">批量删除</el-button>
              <el-button type="primary" @click.stop="orderPath()">批量排序</el-button>
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
                  layout="total, sizes, prev, pager, next" background
                  :total="count">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </main>
    <!-- 编辑 -->
    <el-dialog
      :visible.sync="editOpened" 
      width="600px" 
      title="编辑"
      @close="closeDialog">
      <el-form label-width="100px">
        <el-form-item label="排序">
					<el-col :span="16">
            <el-input 
              maxlength="10"
              v-model.trim="order"></el-input>
					</el-col>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update(order)">确定</el-button>
        </el-form-item>
       
			</el-form>
    </el-dialog>
  </div>
</template>
<script>
import {rightsApi} from '@/service/rights'
export default {
  name:'vuePath',
  data() {
    return {
      vuePathList:[],
      pageSize: 10,
      currentPage: 1,
      count: 0,
      dataLoading:true,
      selectIdList:[],
      editOpened:false,
      order:0,
      select_group:''
    }
  },
  created(){
    this.currentPage = this.$route.query.page ? Number(this.$route.query.page) : 1;
    this.pageSize = this.$route.query.pageSize ? Number(this.$route.query.pageSize) : 10;
    this.getVuePathList()
  },
  methods:{
    search(){
      console.debug('查询');
      this.currentPage = 1;
      this.$router.replace({
        path: this.$route.path,
        query: {
          page:  1,
          pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 10,
        }
      });
      this.getVuePathList();
    },
    handleSelectionChange(val){
      console.log('已经选择的项：');
      console.log(val);
      this.selectIdList = val.map(ele=>ele.id)
    },

    // 跳转编辑
    pathEdit(row){
      console.log(row);
      this.$router.push({
        path: 'vuePathEdit',
        query:{
          id:row.id
        }
      })
    },
    orderPath(){
      this.editOpened = true
    },
    update(order){
      rightsApi.orderVuePath({
        idList: this.selectIdList,
        order:Number(order)
      }).then((res) => {
        console.debug('成功');
        this.order = 0;
        this.$refs.accountTable.clearSelection();
        console.debug(res);
        this.editOpened = false
        this.getVuePathList()
        this.$message({
          duration:500,
          type: 'success',
          message: '成功!'
        });
        
      }).catch((err) => {
        console.error('出错');
        console.error(err);
      });    
    },
    closeDialog(){

    },
    // 删除
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
      console.log(id);
      // 单个删除
      if(id){
        rightsApi.deleteVuePath({
          id: id,
        }).then((res) => {
          console.debug('删除成功');
          console.debug(res);
          this.getVuePathList()
          this.$message({
            duration:500,
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch((err) => {
          console.error('删除出错');
          console.error(err);
        });
      }
      // 批量删除
      else{
        rightsApi.deleteVuePathBatch({
          idList: this.selectIdList,
        }).then((res) => {
          console.debug('删除成功');
          console.debug(res);
          this.getVuePathList()
          this.$message({
            duration:500,
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch((err) => {
          console.error('删除出错');
          console.error(err);
        });
      }
    },
    // 创建
    createPop(){
      this.$router.push({
        path: 'vuePathCreateNew'
      })
    },
    handleSizeChange(val) {
      console.debug('分页大小变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          pageSize: val,
        }
      });
      this.getVuePathList();
    },
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.$router.replace({
        path: this.$route.path,
        query: {
          page: val,
          pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 10,
        }
      });
      this.getVuePathList();
    },
    // 获取角色列表
    getVuePathList(){
      rightsApi.getVuePathList({
        page: this.$route.query.page ?  this.$route.query.page : this.currentPage,
        pageSize:  this.$route.query.pageSize ?  this.$route.query.pageSize : this.pageSize,
        group:this.select_group
      }).then((res) => {
        console.debug('获取列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.vuePathList = response.data;
          this.count = response.total
        }
      }).catch((err) => {
        console.error('获取列表出错');
        console.error(err);
      });
    },
    getRowKey(row){
      return row.id
    },
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/common/common.styl"></style>

