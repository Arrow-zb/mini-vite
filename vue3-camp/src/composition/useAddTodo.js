import { ref, reactive, computed } from "vue";

export default function useAddTodo() {
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