<template>
  <div class="box box-solid">
    <el-row>
      <el-col :span="24">
        <!-- 通过循环增加input框增加可搜索的字段 -->
        <!--<el-input placeholder="输入关键字" class="handle-input mr10"></el-input>-->
        <el-input v-for="item in canSearch" class="handle-input" v-if="item.type==='input'" :key="item.key" :name="item.key" :placeholder="'搜索' + item.value" v-model="item.param" clearable></el-input>
        <el-select v-else-if="item.type==='select'" class="handle-input" v-model="item.param" clearable="">
          <el-option v-for="i in item.options" :key="i.type" :label="i.name" :value="i.type"></el-option>
        </el-select>
        <el-button type="primary" @click="searchTest">搜索</el-button>
      </el-col>
    </el-row>
    <div class="box-body">
      <el-table border :data="tableData">
        <el-table-column type="selection"></el-table-column>
        <!-- 表格显示 -->
        <!--<el-table-column v-for="item in Object.keys(tableData[0])" :label="item" :key="item">-->
          <!--<template slot-scope="scope">-->
            <!--{{tableData[scope.$index][item]}}-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!-- 测试 -->
        <!-- :prop="item" -->
        <el-table-column v-for="item in Object.keys(headers)" :prop="item" :label="headers[item]" :key="item">
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row + `.item`}}</span>-->
            <!--<span>`${scope.row}.item`</span>-->
            <!--<span>`scope.row.${item}`</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部按钮及分页 -->
      <el-row>
        <!-- 按钮 -->
        <el-col></el-col>
        <!-- 分页 -->
        <el-col>
          <div class="grid-content bg-purple-light">
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                :current-page.sync="currentPage"
                layout="total, sizes, prev, pager, next" background
                :total="count"></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  export default {
    name: "BaseTable",
    props: {
      // tableData: {
      //   type: Array,
      //   default: []
      // },
      // count: {
      //   type: Number,
      //   default: 0
      // },
      // page: {
      //   type: Number,
      //   default: 1
      // }

      // 测试
      headers: {
        type: Object,
        default: {}
      },
      tableData: {
        type: Array,
        default: []
      },
      count: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 1
      },
      canSearch: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        showOverlay: false,
        items: [],
        show: [],

        // count: 0,
        currentPage: 1,
        cur_page: 1,
        page_size: 10,
      }
    },
    computed: {
      //
    },
    created() {
      this.test();
    },
    methods: {
      // 测试
      test() {
        console.debug('basetable, test');
        console.debug(this.canSearch);
      },
      searchTest() {
        let searchParams = {};
        for (let i = 0; i < this.canSearch.length; i++) {
          searchParams[this.canSearch[i].key] = this.canSearch[i].param;
        }
        console.debug(searchParams);
        this.$emit('componentSearch', searchParams);
      },
      // 分页导航
      handleSizeChange(val) {
        // this.data.pageSize = val;
        // console.log(`每页 ${val} 条`);
        // this.getData();
        this.$emit('sizeChange', val);
      },
      handleCurrentChange(val) {
        // this.data.page = val;
        // console.log("当前页数：" + this.cur_page);
        // this.getData();
        this.$emit('pageChange',val);
      },
    }
  }
</script>

<style scoped>
  .table {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #e3e3e3;
    border-spacing: 0;
    border-collapse: separate;
    text-align: center;
  }

  .box-body {
    margin-top: 20px;
  }

  .handle-input {
    width: 200px;
    margin-left: 10px;
  }
  .mr10 {
    width: 100px;
  }
</style>
