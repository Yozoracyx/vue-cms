<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="说点什么把..." maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content === 'undefined' ? '此用户很懒，什么都没说...' : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      msg: "",
      comments: [],
      pageindex: 1 //页码，默认第1页
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      //获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(result => {
          console.log(result.body.message);
          if (result.body.status === 0) {
            // 老数据拼接新数据
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    getMore() {
      //加载更多
      this.pageindex++;
      this.getComments();
    },
    postcomment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空!");
      }
      //发表评论
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(result => {
          if (result.body.status === 0) {
            // 老数据拼接新数据
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            console.log(cmt);
            this.comments.unshift(cmt);
            this.msg = "";
          } else {
            Toast("获取评论失败");
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
