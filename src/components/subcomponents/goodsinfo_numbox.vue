<template>
<!-- 父组件的数据渲染为异步，max值可能会为undefined -->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  

</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"


export default {
  mounted(){
    mui('.mui-numbox').numbox();
  },
  methods:{
    countChanged(){
      this.$emit('getcount',parseInt(this.$refs.numbox.value))
    }
  },
  props:['max'],
  watch:{
    'max':function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption('max',newVal)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
