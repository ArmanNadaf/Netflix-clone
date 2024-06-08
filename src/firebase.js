
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCz_sEZzt5Nk3E9LxAihTjXyoaTMo6L2AE",
  authDomain: "netflix-clone-8f147.firebaseapp.com",
  projectId: "netflix-clone-8f147",
  storageBucket: "netflix-clone-8f147.appspot.com",
  messagingSenderId: "75427667762",
  appId: "1:75427667762:web:28fc94ac9579b8025e812b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
try{
const res = await createUserWithEmailAndPassword(auth, email, password);
const user = res.user;
await addDoc(collection(db,"user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
});
}catch (error){
    console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));

}
}

const login = async (email, password)=>{
    try{
await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}

export {auth,db, login, signup, logout};