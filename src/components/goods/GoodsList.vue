<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/' + item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->

    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDeatil(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表的方法
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          // console.log(result.body);
          if (result.body.status === 0) {
            // this.goodslist = result.body.message;
            this.goodslist = this.goodslist.concat(result.body.message);
          } else {
            Toast("获取商品列表失败");
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDeatil(id) {
      //使用js的方式进行路由导航

      //this.$route  是路由参数对象（params,query）
      //this.$router  是路由导航对象,用js实现url跳转
      //1. 最简单的，字符串
      this.$router.push('/home/goodsinfo/' + id);

      //2. 对象
      // this.$router.push({ path: "'/home/goodsinfo/' + id" });

      //3.  命名路由
      // this.$router.push({ name: "goodsinfo", params: id });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
