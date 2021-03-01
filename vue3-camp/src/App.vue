<template>
  <div>
    <h1>哈喽 x: {{x}} y:{{ y }}</h1>
    <input type="text" v-model="val" @keydown.enter="add"/>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.content }}</li>
      <div>total: {{total}}</div>
    </ul>
  </div>
</template>

<script>
import useAddTodo from "./composition/useAddTodo";
import useMouse from "./composition/useMouse";

export default {
  // option api
  // composition api

  setup() {
    // 相比较 mixin 好处，数据来源清晰， mixin 不清晰的，而且还会存在命名冲突
    // 这里的逻辑将会很清晰，告别大几百行
    const {val, add, todos, total}  = useAddTodo();
    const { x, y } = useMouse(); 
    return {val, add, todos, total, x, y};
  }
};


</script>
