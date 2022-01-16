import {ref, watchEffect} from 'vue'

import { db } from '../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

//Real time so collection updates after creating new todo
//Sets up a real time listener

const getCollection = (c) => {
    const documents = ref(null)

    //Collection reference
    const colRef = collection(db, c)

    const unsub = onSnapshot(colRef, snapshot => {
        let results = []

        snapshot.docs.forEach(doc => {
          results.push({...doc.data(), id: doc.id})
        })
        
        //Update values
        //Wasnt outputting right because I had documents.values
        documents.value = results
    })

    //Watches when component unmounts unsubscribing from changes
    //Removes listener
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents }
}

export default getCollection