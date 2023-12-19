// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, enableIndexedDbPersistence, onSnapshot, deleteDoc, doc , addDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xW2FqIeP3XcjpyuxjTNftLM5N68Lvmo",
  authDomain: "watch-store-c44ee.firebaseapp.com",
  projectId: "watch-store-c44ee",
  storageBucket: "watch-store-c44ee.appspot.com",
  messagingSenderId: "948859253723",
  appId: "1:948859253723:web:832f32c10a5b4ead79adfe",
  measurementId: "G-9EEGKBKS04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const locationsCol = collection(db,'desc');

enableIndexedDbPersistence(db)
.catch((err) => {
    console.log(err);
    if (err.code == 'failed-precondition') {
      console.log("Multiple tabs open,use only one tab");
    } else if (err.code == 'unimplemented') {
        console.log("IndexedDB not supported");
    }
});

const ss = onSnapshot(locationsCol,snapshot =>{
  snapshot.docChanges().forEach(change =>{
      console.log(change);
      console.log(change.doc.data(),change.doc.id);
      if(change.type === 'added'){
          renderLocation(change.doc.data(),change.doc.id);
      }
      if(change.type === 'removed'){
          removeLocation(change.doc.id);
      }
  })
})

const locationContainer = document.querySelector('.locations,.add-location');
const editform = document.querySelector('.edit-location form');
const editLocationModal = document.querySelector('#edit_location_modal');
let updateId = null;
locationContainer.addEventListener('click',evt=> {
if(evt.target.textContent ==='delete_outline'){
  const id = evt.target.getAttribute('data-id');
  const docref = doc(db,"desc",id);
  deleteDoc(docref).then(()=>{
    alert("Document " + id + "deleted successfully");
    console.log("document successfully deleted");
  }).catch(err=>{
    alert("Error deleting doc",err);
  })
}
if(evt.target.textContent === 'edit'){
  updateId = evt.target.parentElement.getAttribute('data-id');
  const location = document.querySelector(`.location[data-id=${updateId}]`);
  const watchname = location.querySelector('.watchname').innerHTML;
  const watchclass = location.querySelector('.watchclass').innerHTML;
  const watchprice = location.querySelector('.watchprice').innerHTML;
  const watchqty = location.querySelector('.watchqty').innerHTML;
  editform.watchname.value=watchname;
  editform.watchclass.value=watchclass;
  editform.watchprice.value=watchprice;
  editform.watchqty.value=watchqty;
}
})

const form = document.querySelector('form');
form.addEventListener('submit',evt=>{
evt.preventDefault();
const location = {
  watchname: form.watchname.value,
  watchclass: form.watchclass.value,
  watchprice: form.watchprice.value,
  watchqty: form.watchqty.value
};
addDoc(locationsCol,location).then(data=>{
  console.log(data);
  alert("New location '"+location.watchname + "'added with id:"+data.id);
})
form.watchname.value='';
form.watchclass.value='';
form.watchprice.value='';
form.watchqty.value='';

});


editform.addEventListener('submit', evt => {
// evt.preventDefault();
const docref = doc(db,"desc",updateId);
const location = {
      watchname: editform.watchname.value,
      watchclass: editform.watchclass.value,
      watchprice: editform.watchprice.value,
      watchqty: editform.watchqty.value
    };
    updateDoc(docref,location).then(docref => {
      console.log("data");
      alert("Updated");
      editform.reset();
      var instance = M.Modal.getInstance(editLocationModal);
      instance.close();
    })
})

// const editform = document.querySelector('modal');
// editform.addEventListener('submit',evt=>{
//   evt.preventDefault();
//   const location = {
//     watchname: form.watchname.value,
//     watchclass: form.watchclass.value,
//     watchprice: form.watchprice.value,
//     watchqty: form.watchqty.value
//   };
//   addDoc(locationsCol,location).then(data=>{
//     console.log(data);
//     alert("New location '"+location.watchname + "'added with id:"+data.id);
//   })
//   form.watchname.value='';
//   form.watchclass.value='';
//   form.watchprice.value='';
//   form.watchqty.value='';

// });
