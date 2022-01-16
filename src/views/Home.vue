<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo.id">
        <div class="details">
          <h4>{{ todo.todo }}</h4>
          <p>Completed: {{ todo.completed }}</p>
        </div>
        <div class="icon" v-if="todo.completed" style="color: green">
          <span class="material-icons">done</span>
        </div>
        <div class="icon" v-if="!todo.completed" style="color: red">
          <span class="material-icons">pending</span>
        </div>
      </li>
    </ul>
    <CreateTodoForm />
  </div>
</template>

<script>
import { ref } from 'vue'
import CreateTodoForm from '../components/CreateTodoForm.vue'
import {db} from '../firebase/config'
import {collection, getDocs} from 'firebase/firestore'

export default {
  name: 'Home',
  components: { CreateTodoForm },
  setup() {
    const todos = ref([])

    const colRef = collection(db, 'todos')

    getDocs(colRef)
      .then(snapshot => {
        let docs = []
        snapshot.docs.forEach(doc => {
          docs.push({...doc.data(), id: doc.id})
        })
        todos.value = docs

        //console.log(docs)
    })

    return { todos }
  }
}
</script>

// const todos = ref([
//       { todo: 'First Todo', completed: true, id: '1' },
//       { todo: 'Second Todo', completed: false, id: '2' }
//     ])