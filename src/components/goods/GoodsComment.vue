<template>
  <div>
    <combox :id="$route.params.id"></combox>
  </div>
</template>

<script>
import combox from "../subcomponents/comment.vue";

export default {
  components:{
    combox
  }
}
</script>

<style lang="scss" scoped>

</style>
