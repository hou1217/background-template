<template>
  <div class="information-card-component">
    <!-- 文本 -->
    <section v-if="card.text && card.text.content"
             class="text-box">
      <div class="text"
           ref="textBox"
           v-html="card.text.content">
      </div>
  
      <!-- todo 6行以下不显示全文 -->
      <div class="more" :class="{noShow:noShow}"
           ref="moreBox">全文
      </div>
      <!--
           v-if="!card.momentBody.body.text.showAll"-->
    </section>
    
    <!-- 图片 -->
    <section v-if="card.images && card.images.length > 0"
             class="media-box">
      <div v-if="card.images.length > 1"
           class="img-box more">
        <div v-for="(img, imgIndex) in card.images"
             :key="imgIndex"
             class="img">
          <img :src="img.imageUrl + '?imageView2/2/w/396'"
               :onerror="defaultSrc"/>
        </div>
      </div>
      <div v-else
           class="img-box one"
           :style="'width:'+computedWidth(card.images[0])+';height:'+computedHeight(card.images[0])">
        <img :src="card.images[0].imageUrl + '?imageView2/2/w/396'"
             :onerror="defaultSrc"/>
      </div>
    </section>
    
    <!-- 视频 -->
    <section v-if="card.video"
             class="media-box">
      <div class="video-box"
           :style="'width:'+computedWidth(card.video)+';height:'+computedHeight(card.video)">
        <!--:class="card.video.width / card.video.height >= 1 ?
                  'video-box' : 'video-box vertical'"-->
        <div class="video-img">
          <img :src="card.video.cover ?
                     card.video.cover + '?imageView2/2/w/396' :
                     card.video.videoUrl + '?vframe/jpg/offset/1/imageView2/2/w/396'"
               :onerror="defaultSrc"/>
        </div>
        <div class="play-tip">
          <img src="@/assets/images/video_play@2x.png"/>
        </div>
        <div class="silence-btn">
          <img src="@/assets/images/voice_on_w@2x.png"/>
        </div>
        <div class="duration">
          {{$options.filters.durationToString(card.video.duration)}}
        </div>
      </div>
    </section>
    
    <!-- 链接 -->
    <section v-if="card.link"
             class="link-box">
      <div class="portrait">
        <img :src="card.link.imageUrl"
             class="img-show"
             :onerror="defaultSrc"/>
      </div>
      <div class="desc">
        <div>{{card.link.title}}</div>
      </div>
    </section>
  </div>
</template>

<script>
  import {durationToString} from '@/assets/js/filters'
  
  export default {
    name: "InformationCard",
    filters: {
      durationToString: durationToString
    },
    props: {
      card: {
        type: Object,
        default() {
          return {}
        }
      },
      noShow:{
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        defaultSrc: require('@/assets/images/bitmap.png')
      }
    },
    methods: {
      // 计算视频的尺寸
      computedWidth(obj) {
        let width = Number(obj.width);
        let height = Number(obj.height);
        let per = width / height;  // 长宽比
        
        if (Object.keys(obj).indexOf('duration') > -1) {
          if (per >= 1) {  // 横图
            if (width >= 270) {
              return '270px'
            } else {
              return width + 'px'
            }
          } else {  // 竖图
            if (height >= 270) {
              return (270 * per) + 'px'
            } else {
              return width + 'px'
            }
          }
        } else {
          if (per >= 1) {  // 横图
            if (width >= 180) {
              return '180px'
            } else {
              return width + 'px'
            }
          } else {  // 竖图
            if (height >= 180) {
              return (180 * per) + 'px'
            } else {
              return width + 'px'
            }
          }
        }
      },
      computedHeight(obj) {
        let width = Number(obj.width);
        let height = Number(obj.height);
        let per = width / height;  // 长宽比
        
        if (Object.keys(obj).indexOf('duration') > -1) {
          if (width / height <= 1) {
            if (height >= 270) {
              return '270px'
            } else {
              return height + 'px'
            }
          } else {
            if (width >= 270) {
              return (270 / per) + 'px'
            } else {
              return height + 'px'
            }
          }
        } else {
          if (width / height <= 1) {
            if (height >= 180) {
              return '180px'
            } else {
              return height + 'px'
            }
          } else {
            if (width >= 180) {
              return (180 / per) + 'px'
            } else {
              return height + 'px'
            }
          }
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  div {
    display: block
    box-sizing border-box
  }
  
  .information-card-component {
    width 270px
    max-height 400px
    /*overflow: hidden*/
    
    .text-box {
      width 100%
      height auto
      /*margin-bottom 5px*/
      
      .text {
        width 100%
        height auto
        max-height 126px
        line-height 21px
        font-family PingFangSC-Regular
        font-size 14px
        color #000000
        text-align left
        /*margin-bottom 4px*/
  
        display: -webkit-box
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
      .more {
        width: auto;
        height: 20px;
        line-height: 20px;
        font-family: PingFangSC-Regular
        font-size: 14px
        color: #3b8ee7;
        text-align: justify;
        /*margin-bottom 2px*/
      }
    }
    .media-box {
      width 100%
      height auto
      margin-bottom 4px
      
      .img-box {
        &.one {
          width 166px
          height 166px
          border-radius 2.51px
          
          img {
            width 100%
            height 100%
            object-fit contain
            border-radius 2.51px
          }
        }
        &.more {
          width 100%
          margin-left: -2px
          display flex
          flex-wrap wrap
          
          .img {
            width calc((100% / 3) - 2px)
            height 0
            padding-top 33%
            margin 2px 0 0 2px
            border-radius 2.51px
            position relative
            
            img {
              position: absolute
              top 0
              left 0
              width 100%
              height 100%
              object-fit cover
              border-radius 2.51px
            }
          }
          
          &:first-child {
            margin 2px 0 0 0
          }
        }
      }
      .video-box {
        position relative
        width 100%
        /*height 0*/
        /*padding-bottom 56.25%*/
        
        .play-tip {
          position absolute
          top 50%
          left 50%
          width 42px
          height 42px
          -webkit-transform: translate(-50%, -50%)
          -moz-transform: translate(-50%, -50%)
          -ms-transform: translate(-50%, -50%)
          -o-transform: translate(-50%, -50%)
          transform: translate(-50%, -50%)
          img {
            width 100%
            height 100%
            object-fit cover
          }
        }
        .silence-btn {
          position absolute
          top 4px
          right 4px
          width 18px
          height 18px
          img {
            width 100%
            height 100%
            object-fit cover
          }
        }
        .duration {
          position absolute
          right 4px
          bottom 4px
          height 12px
          line-height 12px
          font-size 10px
          color #ffffff
          font-family: SFUIDisplay-Regular;
        }
        /*&.vertical {*/
          /*width: 0;*/
          /*padding-right: 62.9%;*/
          /*padding-bottom: 100%;*/
        //}
        >>> .video-img {
          /*position absolute*/
          /*top 0*/
          /*left 0*/
          line-height normal
          font-size 0
          height 100%
          background-size: 100%;
          background-position: 50%;
          border-radius: 2.5px;
          overflow: hidden;
  
          width: 100%;
          background: #ECEEF3;
          
          img {
            width 100%
            height 100%
            object-fit cover
          }
        }
      }
    }
    .link-box {
      display flex
      width 100%
      height 50px
      background #F6F6F6
      border-radius 2.5px
      
      .portrait {
        width 50px
        height 50px
        border-radius 2.5px 2.5px 0 0
        
        img {
          width 100%
          height 100%
          object-fit cover
          border-radius 2.5px 0 0 2.5px
        }
      }
      .desc {
        display flex
        align-items center
        flex 1
        padding 8.5px 6px
        height 100%
        line-height 18.3px
        max-height 100%
        overflow: hidden
        text-align left
        font-size 0
        border-radius 0 2.5px 2.5px 0
        
        &>div {
          width 100%
          overflow: hidden
          line-height 17.5px
          -webkit-line-clamp: 2;
          font-family: PingFangSC-Regular;
          font-size: 6px
          color: #000000;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .noShow
    display none
</style>
