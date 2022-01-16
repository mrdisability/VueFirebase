<template>
  <div class="container">
    <ul class="list-group">
      <li class="list-group-item" style="cursor: pointer" v-for="todo in todos" :key="todo.id">
        <div>

          <button type="button" @click="handleDelete(todo)"
              style="float: right; margin-left: 10px;" class="btn btn-danger">
              <span class="material-icons">
                delete
              </span>
            </button>

            <button type="button" @click="handleUpdate(todo)"
            style="float: right" :class="`${todo.completed ? 'btn btn-danger' : 'btn btn-primary'}`">
              <span class="material-icons" v-if="!todo.completed">
                done
              </span>
              <span class="material-icons" v-if="todo.completed">
                close
              </span>
            </button>

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
import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { CreateTodoForm },
  methods:{
    getButtonClass() {
        return {
            'btn btn-primary': !todo.completed,  
            'btn btn-danger': todo.completed
        }
    }
  },
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

    // update doc
    const handleUpdate = (todo) => {
      const docRef = doc(db, 'todos', todo.id)
      updateDoc(docRef, { 
        completed: !todo.completed
      })
    }

    return { todos, handleDelete, handleUpdate }
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