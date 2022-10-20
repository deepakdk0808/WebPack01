import { initializeApp } from "firebase/app";
import  {getFirestore,collection,getDocs,addDoc,deleteDoc,doc}   from 'firebase/firestore';

type News= {
	title: string,
	description: string,
	duration: string,
	enableDescription: string,
}
const firebaseConfig={
  apiKey: "AIzaSyBleHvlgqGeye8g5GdG_ARqoQwJnxmpWQc",
  authDomain: "ndtvbackend.firebaseapp.com",
  projectId: "ndtvbackend",
  storageBucket: "ndtvbackend.appspot.com",
  messagingSenderId: "948091322290",
  appId: "1:948091322290:web:46784153398cc316dceeab",
  measurementId: "G-XTGR7PPGCP"
}

const main =initializeApp(firebaseConfig);
const db=getFirestore(main)

//collection reference
const collRef=collection(db,"news")

//getting documents
getDocs(collRef)
.then((snapshot)=>{
    // console.log(snapshot.docs)
    let news:any[]=[]
    snapshot.docs.map((doc)=>{
        news.push({...doc.data(),id:doc.id})
    })
    console.log(news)
})
.catch(err=>{
    console.log(err.message)
})

//posting a news
const addNews=document.querySelector(".add")as HTMLFormElement | null;

const titleEl=document.querySelector("#title") as HTMLInputElement
const descriptionEl=document.querySelector("#description") as HTMLInputElement
const enableDescriptionEl=document.querySelector("#enableDescription") as HTMLInputElement
const durationEl=document.querySelector("#duration") as HTMLInputElement
addNews?.addEventListener("submit",(e:Event)=>{
    e.preventDefault()
    const news:News={
        title:titleEl.value,
        description:descriptionEl.value,
        enableDescription:enableDescriptionEl.value,
        duration:durationEl.value
    }

    addDoc(collRef,news)
    .then(()=>{
        addNews.reset()
    })
    .catch(err=>{
        console.log(err.message)
    })

})

//Deleting a doc
const deleteNews=document.querySelector(".delete") as HTMLFormElement | null

const idEl=document.querySelector("#id") as HTMLInputElement
 
deleteNews?.addEventListener("submit" ,(e:Event)=>{
e.preventDefault()

const newsRef=doc(db,"news",idEl.value)
deleteDoc(newsRef)
.then(()=>{
    deleteNews.reset()
})
.catch(err=>{
    console.log(err.message)
})
})


 




