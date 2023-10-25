
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyB2_ecNZCs3P-qG2ezBzu4TX8UJPfQJTIs",
authDomain: "projeto-firebe-a72f9.firebaseapp.com",
projectId: "projeto-firebe-a72f9",
storageBucket: "projeto-firebe-a72f9.appspot.com",
messagingSenderId: "579799090423",
appId: "1:579799090423:web:f9f759fe4739923e8cfff2"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);