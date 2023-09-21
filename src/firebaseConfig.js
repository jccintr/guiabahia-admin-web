import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    
    
    apiKey: "AIzaSyDaOsYLS8gZ9SXt-KLljauNgj4lZOhkasc",
    authDomain: "guiabahia-db337.firebaseapp.com",
    projectId: "guiabahia-db337",
    storageBucket: "guiabahia-db337.appspot.com",
    messagingSenderId: "406789909537",
    appId: "1:406789909537:web:6ea76be0ab071e15df4760"

    
  
    //anderson config
    // apiKey: "AIzaSyBdreLHAaxyc71snWDEvIH3lyTgDWHZZGE",
    // authDomain: "guia-bahia-extremo-sul-423b0.firebaseapp.com",
    // projectId: "guia-bahia-extremo-sul-423b0",
    // storageBucket: "guia-bahia-extremo-sul-423b0.appspot.com",
    // messagingSenderId: "444128634222",
    // appId: "1:444128634222:web:376460d95076a35b150d7f"

   };

initializeApp(firebaseConfig);
export const database = getFirestore();
