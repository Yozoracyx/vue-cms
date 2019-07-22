<template>
  <div class="goods-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <!-- 创建一个对象{ id : count,id : count} -->
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 ￥
              <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodsSelected}}</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbax.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取购物车商品列表
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      //删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, value) {
      //开关状态改变后，更新到 store 中
      this.$store.commit("updateGoodsSelected", { id, selected: value });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="less" scoped>
.goods-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    img {
      width: 60px;
      height: 60px;
      padding-left: 7px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 7px;
      .price {
        color: red;
        font-weight: bold;
      }
    }
    .mui-card-content-inner {
      display: flex;
      align-content: center;
    }
  }
}

.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
