<template>
  <div @click="increment">
    this is VuePropertyDecorator {{ count }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import logger from "UTIL/logger.js";

@Component
export default class VuePropertyDecorator extends Vue {
  count = 0

  increment() {
    this.count++
  }

  created() {
    logger("this is VuePropertyDecorator")
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">

</style>