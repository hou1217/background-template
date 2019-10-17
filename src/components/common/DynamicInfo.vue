<template>
  <div class="dynamic-info-component">
    <div class="component__title">动态信息</div>
    <el-form ref="dynamicInfoForm"
             class="dynamic-info-form"
             label-width="100px"
             label-position="right">
      <el-form-item v-if="moment.type==='MOMENT' || !moment.type">
        <div class="form__label" slot="label">正文</div>
        <div class="dynamic-box" v-if="moment.body">
          <!-- 文本 -->
          <div class="dynamic-box__item dynamic-box__item_text"
               v-if="moment.body.text">
            {{moment.body.text.content}}
          </div>
          <!-- 图片 -->
          <div class="dynamic-box__item dynamic-box__item_img"
               v-if="moment.body.images && moment.body.images.length > 1">
            <div class="img-box"
                 v-for="(image,index) in moment.body.images"
                 :key="index">
              <img :src="image.imageUrl"/>
            </div>
          </div>
          <div class="dynamic-box__item dynamic-box__item_img"
               v-if="moment.body.images && moment.body.images.length === 1">
            <div class="img-box_one"
                 :class="{vertical: moment.body.images[0].width < moment.body.images[0].height}">
              <img :src="moment.body.images[0].imageUrl"/>
            </div>
          </div>
          <!-- 视频 -->
          <div class="dynamic-box__item dynamic-box__item_video"
               v-if="moment.body.video">
            <!--<div class="video-box">-->
              <!--
                 :class="{vertical: moment.body.video.width / moment.body.video.height < 1}"-->
              <!--<div class="play-tip">-->
                <!--<img src="@/assets/images/video_play@2x.png"/>-->
              <!--</div>-->
              <!--<div class="silence-btn">-->
                <!--<img src="@/assets/images/voice_on_w@2x.png"/>-->
              <!--</div>-->
              <!--<div class="duration">-->
                <!--{{$options.filters.durationToString(moment.body.video.duration)}}-->
              <!--</div>-->
              <div class="video-img"
                   :style="'width:'+computedWidth(moment.body.video)+';height:'+computedHeight(moment.body.video)">
  
                <div class="play-tip">
                  <img src="@/assets/images/video_play@2x.png"/>
                </div>
                <div class="silence-btn">
                  <img src="@/assets/images/voice_on_w@2x.png"/>
                </div>
                <div class="duration">
                  {{$options.filters.durationToString(moment.body.video.duration)}}
                </div>
                
                <img :src="moment.body.video.cover ?
                           moment.body.video.cover + '?imageView2/2/w/396' :
                           moment.body.video.videoUrl + '?vframe/jpg/offset/1/imageView2/2/w/396'"/>
              </div>
            <!--</div>-->
          </div>
          <!-- 链接 -->
          <div class="dynamic-box__item dynamic-box__item_link"
               v-if="moment.body.link">
            <div class="portrait">
              <img :src="moment.body.link.imageUrl">
            </div>
            <div class="desc">
              <div>
                {{moment.body.link.title}}
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <!-- todo 当文本类型为新闻资讯是显示特殊展示样式 -->
      <el-form-item v-if="moment.type==='NEWS'">
        <div class="form__label" slot="label">正文</div>
        <div class="dynamic-box" v-if="moment.body">
          <div class="dynamic-box__item dynamic-box__item_news">
            <div class="news-box">
              <div class="news-box__image">
                <img :src="moment.body.images?moment.body.images[0].imageUrl:defaultSrc" :onerror="defaultSrc" />
              </div>
              <div class="news-box__desc">
                <div class="text">{{moment.body.title}}</div>
              </div>
            </div>
            <div class="check-tip" @click.stop="checkUrl(moment.url)">查看链接</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="form__label" slot="label">提交时间</div>
        <label>{{$options.filters.timeStampToDate(moment.date)}}</label>
      </el-form-item>
      <el-form-item v-show="showClickNum">
        <div class="form__label" slot="label">浏览量</div>
        <label>{{moment.clicks}}</label>
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
    </el-form>
  </div>
</template>

<script>
  import {timeStampToDate, durationToString} from "@/assets/js/filters";
  
  export default {
    name: "DynamicInfo",
    filters: {
      timeStampToDate: timeStampToDate,
      durationToString: durationToString
    },
    props: {
      moment: {
        type: Object,
        default() {
          return {
            body: {
              text: '',
              images: [],
              video: {},
              link: {}
            },
            date: '',
            clicks: 0,
            type: 'MOMENT'
          }
        }
      },
      showClickNum: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        clicksTable:[
          {
            nakebao: '0',
            tpulse: '0',
          }
        ],
        defaultSrc: require('@/assets/images/bitmap.png')
      }
    },
    computed: {
      styleObj() {
        return {
          'background-image': `url(${this.moment.body.video.cover ?this.moment.body.video.cover + '?imageView2/2/w/396' : this.moment.body.video.videoUrl + '?vframe/jpg/offset/1/imageView2/2/w/396'})`
        };
      }
    },
    created() {
    },
    mounted() {
      console.debug('dynamicInfo mounted');
      console.debug(this.moment);
    },
    methods: {
      // 计算单图的尺寸
      computedWidth(image) {
        let width = Number(image.width);
        let height = Number(image.height);
        let per = width / height;  // 长宽比
        if (per >= 1) {  // 横图
          if (width >= 303) {
            return '303px'
          } else {
            return width + 'px'
          }
        } else {  // 竖图
          if (height >= 303) {
            return (303 * per) + 'px'
          } else {
            return width + 'px'
          }
        }
      },
      computedHeight(image) {
        let width = Number(image.width);
        let height = Number(image.height);
        let per = width / height;  // 长宽比
        if (width / height <= 1) {
          if (height >= 303) {
            return '303px'
          } else {
            return height + 'px'
          }
        } else {
          if (width >= 303) {
            return (303 / per) + 'px'
          } else {
            return height + 'px'
          }
        }
      },

      // 打开链接
      checkUrl(url) {
        if (!url) {
          this.$message.warning('无链接地址');
          return;
        }
        window.open(url);
      }
    }
  }
</script>

<style scoped lang="stylus">
  >>> img {
    width 100%
    height 100%
    object-fit cover
  }
  
  .dynamic-info-component {
    width 100%
  }
  
  .dynamic-info-form {
    border-bottom 1px solid #e3e3e3
  }
  
  .component__title {
    font-weight bold
    margin-bottom 20px
  }
  
  .form__label {
    width 100%
    /*text-align center*/
    padding-right 20px
    box-sizing border-box
  }
  
  .dynamic-box {
    width 100%
    
    /*min-height 500px*/
    /*background aliceblue*/
    
    .dynamic-box__item {
      width 100%
      
      &.dynamic-box__item_text {
        line-height 1.5
      }
      &.dynamic-box__item_img {
        display flex
        flex-wrap wrap
        
        .img-box {
          width: calc((100% / 9) - 4px)
          height 0
          padding-bottom 11%
          margin-right 4px
          position relative
          
          img {
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            object-fit cover
          }
        }
        .img-box_one {
          width 210px;
          height auto
          
          img {
            width 100%
            object-fit cover
          }
          
          &.vertical {
            height auto
            width 210px
            img {
              height 100%
              object-fit cover
            }
          }
          
        }
      }
      &.dynamic-box__item_video {
        position relative
        width 100%
        /*max-width 303px*/
        /*max-height 303px*/
        
        /*.video-box {*/
          /*position relative*/
          /*max-width 303px*/
          /*max-height 303px*/
          /*width 100%*/
          /*height 0*/
          /*padding-bottom 56.25%*/
          
        .play-tip {
          width 50px
          height 50px
          position absolute
          top 50%
          left 50%
          -webkit-transform: translate(-50%, -50%)
          -moz-transform: translate(-50%, -50%)
          -ms-transform: translate(-50%, -50%)
          -o-transform: translate(-50%, -50%)
          transform: translate(-50%, -50%)
          z-index 1
        }
        .silence-btn {
          position absolute
          top 4px
          right 4px
          width 22.3px
          height 22.3px
          z-index 1
          img {
            width 100%
            height 100%
            object-fit cover
          }
        }
        .duration {
            position absolute
            right 6px
            bottom 6px
            height 15px
            line-height 15px
            font-size 12px
            color #ffffff
            font-family: SFUIDisplay-Regular;
            z-index 1
          }
          
        
        .video-img {
          display flex
          max-width 303px
          max-height 303px
          line-height normal
          font-size 0
          position relative
          background-size contain
          background-repeat no-repeat
          
          &>img {
            /*max-width 303px*/
            /*max-height 303px*/
            width 100%
            height 100%
            object-fit scale-down
          }
        }
        
          //&.vertical {
            //width 0
            //padding-right 62.9%;
            //padding-bottom 100%
          //}
          
          //>>> .video-img {
            /*position absolute*/
            /*top 0*/
            /*left 0*/
            /*height 100%*/
            /*background-size: 100%;*/
            /*background-position: 50%;*/
            /*max-width 303px*/
            /*max-height 303px*/
            //border-radius: 2.5px;
            //overflow: hidden;
            //line-height normal
            //font-size 0
  
            /*width: 100%;*/
            //background: #ECEEF3;
  
            //img {
              /*width 100%*/
              /*height 100%*/
              //max-height 303px
              //max-width 303px
              //object-fit contain
            //}
          //}
        //}
      }
      &.dynamic-box__item_link {
        margin-top 10px
        display flex
        width 303px
        height 60.67px
        border-radius 3px
        background #F6F6F6
        
        .portrait {
          width 60.67px
          height 60.67px
          border-radius 3px 0 0 3px
          img {
            width 100%
            height 100%
            object-fit cover
            border-radius 3px 0 0 3px
          }
        }
        .desc {
          display flex
          align-items center
          flex 1
          padding 10px 10px
          height 100%
          line-height 20px
          max-height 100%
          overflow: hidden
          text-align left
          font-size 0
          border-radius 0 6px 6px 0
          box-sizing border-box
          
          & > div {
            width 100%
            overflow: hidden
            line-height 20px
            -webkit-line-clamp: 2
            font-family PingFangSC-Regular
            font-size 16px
            color: #000
            text-overflow ellipsis
            word-break: break-all 
            display: -webkit-box
            -webkit-box-orient vertical
          }
        }
      }
      &.dynamic-box__item_news {
        display flex
        align-items flex-end

        .news-box {
          width 300px
          height 92px
          // border 1px solid black
          margin-right 10px
          box-sizing border-box
          display flex

          .news-box__image {
            width 92px
            height 100%

            background aliceblue
          }
          .news-box__desc {
            flex 1
            border-top 1px solid black
            border-right 1px solid black
            border-bottom 1px solid black
            box-sizing border-box
            display flex
            align-items center
            padding 0 30px
            overflow hidden

            .text {
              line-height 16px
              max-height 32px

              display -webkit-box
              flex 1
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              overflow hidden
              text-overflow ellipsis
              flex-wrap wrap
              word-wrap break-word
              white-space pre-line
            }
          }
        }

        .check-tip {
          text-decoration underline
          color #199ED8
          cursor pointer
          line-height normal
        }
      }
    }
  }
</style>
