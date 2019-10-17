<template>
  <div class="box">
    <!-- 面包屑 -->
    <section class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/rights' }">
          <span style="color: #3b8ee7;">权限管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>创建权限</el-breadcrumb-item>
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
        <el-form-item 
          :rules="[{ required: false}]" 
          label="路径">
          <el-col :span="16">
            <el-table
              :row-key="getRowKeys"
              ref="pathTable"
              :data="pathList"
              border
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                :reserve-selection="true">
              </el-table-column>
              <el-table-column
                label="路径"
                prop="path"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                prop="desc"
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
        <el-form-item 
          :rules="[{ required: false}]" 
          label="vue路径">
          <el-col :span="16">
            <el-table
              :row-key="getRowKeys"
              ref="vuePathTable"
              :data="vuePathList"
              border
              @selection-change="handleSelectionChange2">
              <el-table-column
                type="selection"
                :reserve-selection="true">
              </el-table-column>
              <el-table-column
                label="组"
                prop="group"
              >
              </el-table-column>
              <el-table-column
                label="路径"
                prop="path"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                prop="desc"
              >
              </el-table-column>
            </el-table>
            <!-- 底部按钮及分页 -->
            <el-row>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange2"
                      @current-change="handleCurrentChange2"
                      :page-sizes="[10, 20, 50, 100]"
                      :page-size.sync="pageSize2"
                      :current-page.sync="currentPage2"
                      layout="total, sizes, prev, pager, next" 
                      background
                      :total="count2">
                    </el-pagination>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
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
  name:'rightsCreateNew',
  data() {
    return {
      inputAccount:{
        name:'',
        pathIdList:[],
        vuePathIdList:[]
      },
      wordsNumberTip:false,//字数提示
      pathList:[],//权限列表
      vuePathList:[],//权限列表
      currentPage:1,
      pageSize:10,
      count:0,
      currentPage2:1,
      pageSize2:10,
      count2:0,
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
    this.getPathList();
    this.getVuePathList();
  },
  methods:{
    getRowKeys(row){
      return row.id
    },
    // 分页变化
    handleSizeChange(val) {
      console.debug('分页大小变化');
      this.getPathList();
    },
    handleSizeChange2(val) {
      console.debug('分页大小变化');
      this.getVuePathList();
    },
    handleCurrentChange(val) {
      console.debug('分页页码变化');
      this.getPathList();
    },
    handleCurrentChange2(val) {
      console.debug('分页页码变化');
      this.getVuePathList();
    },
    //获取权限列表
    getPathList(){
      rightsApi.getPathList({
        page: this.currentPage,
        pageSize: this.pageSize
      }).then((res) => {
        console.debug('获取列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.pathList = response.data;
          this.count = response.total
        }
      }).catch((err) => {
        console.error('获取列表出错');
        console.error(err);
      });
    },
    getVuePathList(){
      rightsApi.getVuePathList({
        page: this.currentPage2,
        pageSize: this.pageSize2
      }).then((res) => {
        console.debug('获取vue列表成功');
        console.debug(res);
        this.dataLoading = false
        let response = res.data
        if (response) {
          this.vuePathList = response.data;
          this.count2 = response.total
        }
      }).catch((err) => {
        console.error('获取列表出错');
        console.error(err);
      });
    },
    handleSelectionChange(val){
      console.log(val);
      this.inputAccount.pathIdList = val.map(item => item.id)
      console.log(this.inputAccount.pathIdList);
    },
    handleSelectionChange2(val){
      console.log(val);
      this.inputAccount.vuePathIdList = val.map(item => item.id)
      console.log(this.inputAccount.vuePathIdList);
    },
    startCreate(){
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }else{
          this.clickState = true
          rightsApi.createRights(this.inputAccount)
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
