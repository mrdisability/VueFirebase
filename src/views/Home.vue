<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item" style="cursor: pointer" v-for="todo in todos" :key="todo.id">
        <div>

          <button v-if="!todo.completed" type="button" 
            style="float: right" class="btn btn-primary">Complete</button>

          <h4 style="display: inline" @click="handleDelete(todo)">
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
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { CreateTodoForm },
  setup() {
    const { documents: todos } = getCollection('todos')

    //console.log(todos)

    // delete docs
    const handleDelete = (todo) => {
      console.log(todo)
      if (window.confirm('Delete this todo?')) {
        const docRef = doc(db, 'todos', todo.id)
        deleteDoc(docRef)
      }
    }

    return { todos, handleDelete }
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