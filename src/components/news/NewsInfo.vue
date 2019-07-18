<template>
  <div class="newsinfo-container">

    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>{{newsinfo.add_time | dateFormat}}</span>
      <span>点击: {{newsinfo.click}}次</span>
    </p>

    <hr />

    <div class="content" v-html="newsinfo.content"></div>

    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

//1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // url 传递来的 id
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        // console.log(result.body.message)
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻详情失败");
        }
      });
    }
  },
  components: {
    //用来注册子组件
    "comment-box": comment
  }
};
</script>


<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;

  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    color: #226aff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
