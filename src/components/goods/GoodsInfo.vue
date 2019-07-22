<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价 :
            <del>￥{{goodsinfo.market_price}}</del> &nbsp;&nbsp;销售价 :
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量 :
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false,
      selectCount: 1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        } else {
          Toast("获取缩略图失败");
        }
      });
    },
    getGoodsInfo() {
      //获取商品信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        } else {
          Toast("获取缩略图失败");
        }
      });
    },
    goDesc(id) {
      //使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      // 要加入到购物车中的数据
      var goodsinfo = {
        id: this.id,
        count: this.selectCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };

      //调用 store 中的 mutations 将商品加入购物车
      this.$store.commit("addToCar",goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //先得到 标徽 的横纵坐标，再得到 小球 的横纵坐标 ，求差值，为动画位移距离
      // domObject.getBoundingClientRect() 获得坐标

      //获取 小球 位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取 徽标 位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = "translate(" + xDist + "px," + yDist + "px)";
      el.style.transition = "all 0.7s cubic-bezier(.4,-0.31,1,.72) ";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 子组件传递 数量值 给父组件
      this.selectCount = count;
      console.log(this.selectCount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 361px;
    left: 146px;
  }
}
</style>
