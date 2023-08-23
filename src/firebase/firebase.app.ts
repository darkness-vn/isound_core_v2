import firebase from 'firebase-admin'
import firebaseConfigs from './firebase.config.json'

export const app = firebase.initializeApp({
    // @ts-ignore
    credential: firebase.credential.cert(firebaseConfigs)
})

export const store = app.firestore()

export async function example () {
    const res = await store.collection("users").add({
        email: "tungdz@gmail.com",
        username: "nhucc"
    })
}
