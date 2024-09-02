import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

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

console.log(database)

let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

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

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads) )
  render(myLeads)
})

tabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })
})
