<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}} 次</span>
    </p>

    <hr />

    <vue-preview :slides="list" @close="handleClose"></vue-preview>

    <div class="content" v-html="photoinfo.content"></div>

    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

//1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhoroInfo();
    this.getThumbs();
  },
  methods: {
    getPhoroInfo() {
      //获取图片详情
      this.$http.get("api/getimageinfo/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            //补全图片的宽和高
            item.w = 600;
            item.h = 400;
          });
          this.list = result.body.message;
        } else {
          Toast("获取缩略图失败");
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    //用来注册子组件
    "comment-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
