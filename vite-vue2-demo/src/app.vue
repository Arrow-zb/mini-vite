<template>
  <div class="container">
    <h1>container</h1>
    <hello-world />
    <class-component />
    <vue-property-decorator />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ClassComponent from "./components/ClassComponent.vue";
import VuePropertyDecorator from "./components/VuePropertyDecorator.vue";
import logger from "UTIL/logger.js";

export default {
  components: {
    HelloWorld,
    ClassComponent,
    VuePropertyDecorator
  },
  created() {
    logger('this is logger');
  }
};
</script>

<style lang="scss" scoped>
.container {
  color: red;
}
</style>