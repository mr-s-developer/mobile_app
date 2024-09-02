import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-680f1-default-rtdb.asia-southeast1.firebasedatabase.app/"
  // apiKey: "AIzaSyBpj07LX9a5XFrAVSKTS0ZryqnK0z13VJo",
  // authDomain: "leads-tracker-app-680f1.firebaseapp.com",
  // projectId: "leads-tracker-app-680f1",
  // storageBucket: "leads-tracker-app-680f1.appspot.com",
  // messagingSenderId: "782678910977",
  // appId: "1:782678910977:web:7f74b6e6d5cc63c5e6f800"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
  const snapshotDoesExist = snapshot.exists()
  if(snapshotDoesExist) {
    const snapshotValues = snapshot.val()
    const chores = Object.values(snapshotValues)
    render(chores)
  } 
})

deleteBtn.addEventListener("dblclick", function() {
  remove(referenceInDB)
  ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
  push(referenceInDB, inputEl.value)
  inputEl.value = ""
})
