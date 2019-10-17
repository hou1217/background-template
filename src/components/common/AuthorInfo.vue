<template>
  <div class="author-info-component">
    <div class="component__title" v-if="hasTitle">发布者信息</div>
    <el-form ref="authorInfoForm"
      class="author-info-form"
      label-width="110px"
      label-position="right">
      <el-form-item v-if="isOrigin">
        <div class="form__label" slot="label">来源</div>
        <label>{{info.name}}</label>
      </el-form-item>
      <el-form-item v-else>
        <div class="form__label" slot="label">订阅号名称</div>
        <label>{{info.name}}</label>
      </el-form-item>
      <el-form-item v-if="hasHeadIcon">
        <div class="form__label" slot="label">头像</div>
        <div class="portrait">
          <img :src="info.headId"/>
        </div>
      </el-form-item>
      <el-form-item v-if="hasBg">
        <div class="form__label" slot="label">背景</div>
        <div class="portrait">
          <img :src="info.bgId"/>
        </div>
      </el-form-item>
      <el-form-item v-if="hasIntro">
        <div class="form__label" slot="label">简介</div>
        <label>{{info.desc}}</label>
      </el-form-item>
      <el-form-item>
        <div class="form__label" slot="label">分类</div>
        <label>{{info.category}}</label>
      </el-form-item>
      <el-form-item>
        <div class="form__label" slot="label">标签</div>
        <label>{{info.tag}}</label>
      </el-form-item>
      <el-form-item v-if="hasFans">
        <div class="form__label" slot="label">订阅粉丝数</div>
        <label>{{info.fans}}</label>
        <el-table
          :data="clicksTable"
          border
          style="width: 200px">
          <el-table-column
            prop="nakebao"
            label="纳客宝">
          </el-table-column>
          <el-table-column
            prop="tpulse"
            label="tpulse">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="hasPos">
        <div class="form__label" slot="label">地域范围</div>
        <label>{{info.geoPosition}}</label>
      </el-form-item>
      <el-form-item v-if="hasUrl">
        <div class="form__label" slot="label">URL地址</div>
        <label>{{info.url}}</label>
      </el-form-item>
      <el-form-item v-if="hasEdit">
        <el-button type="primary">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "authorInfo",
    props: {
      hasTitle:{
        type:Boolean,
        default:true
      },
      hasHeadIcon:{
        type:Boolean,
        default:true
      },
      hasBg:{
        type:Boolean,
        default:false
      },
      hasIntro:{
        type:Boolean,
        default:true
      },
      hasFans:{
        type:Boolean,
        default:false
      },
      hasPos:{
        type:Boolean,
        default:false
      },
      hasUrl:{
        type:Boolean,
        default:false
      },
      hasEdit:{
        type:Boolean,
        default:true
      },
      isOrigin:{ //是否显示来源
        type:Boolean,
        default:false
      },
      info: {
        type: Object,
        default() {
          return {
            name: '',
            portrait: require('@/assets/images/user@3x.png'),
            category: '',
            desc: '',
            geoPosition: '',
          };
        }
      }
    },
    data(){
      return{
        clicksTable:[
          {
            nakebao: '0',
            tpulse: '0',
          }
        ]
      }
    },
  }
</script>

<style scoped lang="stylus">
  >>> img {
    width 100%
    height 100%
    object-fit cover
  }
  .author-info-component {
    width 100%
  }
  .component__title {
    font-weight bold
    margin-bottom 20px
  }
  // .author-info-form {
  //   border-bottom 1px solid #e3e3e3
  // }
  .form__label {
    width 100%
    /*text-align center*/
    padding-right 20px
    box-sizing border-box
  }
  .portrait {
    display: inline-block
    width 54px
    height 54px
  }
  .background {
    display inline-block 
    max-width 162px
    max-height 81px
  }
</style>
