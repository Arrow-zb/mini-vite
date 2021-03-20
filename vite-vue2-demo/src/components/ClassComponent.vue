<template>
  <div @click="increment">
    this is ClassComponent {{ count }}
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
import Vue from "vue";
import Component from "vue-class-component";
import logger from "UTIL/logger.js";

@Component
export default class ClassComponent extends Vue {
  count = 0

  increment() {
    this.count++
  }

  created() {
    logger("this is ClassComponent")
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">

</style>