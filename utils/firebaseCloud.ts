// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXXUvzhYlStvHEc2zQXCQgq8BZf_wfOTA",
    authDomain: "chat-storage-81c57.firebaseapp.com",
    projectId: "chat-storage-81c57",
    storageBucket: "chat-storage-81c57.appspot.com",
    messagingSenderId: "984776746762",
    appId: "1:984776746762:web:aafd4073210f8ec7707cf3",
    measurementId: "G-D83TBK68DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
