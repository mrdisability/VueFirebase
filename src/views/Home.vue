<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo.id">
        <div>

          <button v-if="!todo.completed" type="button" 
            style="float: right" class="btn btn-primary">Complete</button>

          <h4 style="display: inline">
            {{ todo.todo }}
          </h4>

          <div class="icon" v-if="todo.completed" style="color: green; display: inline;">
            <span class="material-icons">done</span>
          </div>
          <div class="icon" v-if="!todo.completed" style="color: red; display: inline;">
            <span class="material-icons">pending</span>
          </div>
        </div>
      </li>
    </ul>
    <CreateTodoForm />
  </div>
</template>

<script>
//import { ref } from 'vue'
import CreateTodoForm from '../components/CreateTodoForm.vue'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { CreateTodoForm },
  setup() {
    const { documents: todos } = getCollection('todos')

    //console.log(todos)

    return { todos }
  }
}
</script>

// import {db} from '../firebase/config'
// import {collection, getDocs} from 'firebase/firestore'

const todos = ref([])

    const colRef = collection(db, 'todos')

    getDocs(colRef)
      .then(snapshot => {
        let docs = []
        snapshot.docs.forEach(doc => {
          docs.push({...doc.data(), id: doc.id})
        })
        todos.value = docs
    })

// const todos = ref([
//       { todo: 'First Todo', completed: true, id: '1' },
//       { todo: 'Second Todo', completed: false, id: '2' }
//     ])