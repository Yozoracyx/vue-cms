<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            class="mui-control-item mui-active"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
          >推荐</a>
          <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">热点</a>
          <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">北京</a>
          <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">社会</a>
          <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">娱乐</a>
          <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">科技</a>
        </div>
      </div>
    </div>
    <h3>photos</h3>
  </div>
</template>

<script>
// 1. 导入 mui js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {};
  },
  mounted() {
    //当组件中的 dom 结构被渲染好并放到页面中后，执行该函数
    // 如果要操作元素，最好在 mouted 中
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
</style>
