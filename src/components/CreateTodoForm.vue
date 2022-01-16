<template>
  <form style="margin-top: 20px" @submit.prevent="handleSubmit">
    <!-- <h3>Add a New Todo</h3> -->

    <div class="mb-3">
      <label for="todo" class="form-label">Todo</label>
      <input type="text" class="form-control" v-model="todo" id="todo" placeholder="Todo" required>
  </div>

    <button class="btn btn-primary">Add Todo</button>
  </form>
</template>

<script>
import { ref } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default {
  setup() {
    const todo = ref('')

    const handleSubmit = async () => {
      //console.log(todo.value, false)
      const colRef = collection(db, 'todos')

      //Start of completed as false as they have to complete todo
      await addDoc(colRef, { 
        todo: todo.value, 
        completed: false,
        created: serverTimestamp()
      })

      // reset the form
      todo.value = ''
    }

    return { handleSubmit, todo }
  }
}
</script>