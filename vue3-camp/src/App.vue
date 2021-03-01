<template>
  <div>
    <h1>哈喽</h1>
    <input type="text" v-model="val" @keydown.enter="add"/>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.content }}</li>
      <div>total: {{total}}</div>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, computed, toRefs } from "vue";

export default {
  // option api
  // composition api

  setup() {
    // let val = ref("");
    // let todos = reactive([]);
    // function add() {
    //   todos.push({
    //     id: Date.now(),
    //     content: val.value 
    //   })
    //   val.value = ""
    // }
    // const total = computed(() => todos.length)
    const {val, add, todos, total}  = useAddTodo() 
    return {
      val,
      add,
      todos,
      total
    }
  }
};

function   useAddTodo() {
    let val = ref("");
    let todos = reactive([]);
    function add() {
      todos.push({
        id: Date.now(),
        content: val.value 
      })
      val.value = ""
    }
    const total = computed(() => todos.length)
    return {val, add, todos, total}
  }
</script>
