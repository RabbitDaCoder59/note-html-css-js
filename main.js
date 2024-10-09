const toggleButton = document.getElementById("toggleButton");
const notepadContainer = document.getElementById("notepadContainer");
const form = document.querySelector("form")



// Toggle the visibility of the notepad and notes list when the button is clicked
toggleButton.addEventListener("click", function() {
  if (notepadContainer.style.display === "none") {
    notepadContainer.style.display = "block";
    toggleButton.innerHTML = "&times;";
  } else {
    notepadContainer.style.display = "none";
    toggleButton.innerHTML = `&plus;`;
  }
});



const cardContainer = document.querySelector(".card-container");
let DB = [];

const addItemsToDOM = () => {
    // Clear all the items in the container
    cardContainer.innerHTML = ""

    // Loop through all the DB item
    DB.forEach(taskItem => {
        cardContainer.innerHTML += `
         <div id="${taskItem.id}" class="task-card">
        <div class="task-row  edit" >
            <input value="${taskItem.task}"  type="text" class="edit-input">
            <div class="options">
                <buttton class="option-btn green" onclick="handleSave(${taskItem.id})">Save</buttton>
                <buttton class="option-btn red" onclick="handleCancelEditing(${taskItem.id})">Cancel</buttton>
            </div>
        </div>
       
        <div class="task-row  preview">
            <p class="text">${taskItem.task}</p>
            <div class="options">
                <buttton class="option-btn blue" onclick="handleToggleEditing(${taskItem.id})">Edit</buttton>
                <buttton class="option-btn red" onclick="handleDeleteTask(${taskItem.id})">Delete</buttton>
            </div>
        </div>
    </div>`
    })
}

const handleSave = (id) => {
    const taskItemContainer = document.getElementById(id)
    const notepad = taskItemContainer.querySelector(".edit-input").value 
    
    // Update the new value in the DB array.
    const index = DB.findIndex(task => task.id == id)
    // Using index position to update the value
    // DB[index] = {
    //     id,
    //     task: input
    // }
    
    // Using splice method to update the value
    const updatevalue = {
        id,
        task:notepad
    }
    DB.splice(index,1,updatevalue)
    // Update the DOM
    addItemsToDOM()

    
        // Update storage
        saveToStorage()
}


const handleCancelEditing = (id) => {
    const taskItemContainer = document.getElementById(id)
    if(taskItemContainer.classList.contains(`editing`)){
        // if it have editing already; remove it
        taskItemContainer.classList.remove("editing")
    }
}

const handleToggleEditing = (id) => {
    const taskCards = document.querySelectorAll(".task-card")
    taskCards.forEach(item => {
        if(item.classList.contains("editing"))item.classList.remove("editing")
    })
    const taskItemContainer = document.getElementById(id)
    // Check if the <task-card> element have a class of 'editing' 

        // if does not have editing; add it
        taskItemContainer.classList.add("editing")
    
}
 // delete Task
 const  handleDeleteTask = (id) => {
        
        //  Remove the task with the id from the DB array
            // Using filter
    //   const FilterItem =  DB.filter((taskItem) => {
    //         return taskItem.id != id
    //     })
    //     DB = FilterItem
        
        // Using splice
        const index = DB.findIndex(taskItem => taskItem.id == id)
        // console.log(index)
        DB.splice(index, 1)

        // Remove the article element containing the task item
        // Method 1
        // addItemsToDOM()

        // Method 2
        document.getElementById(id).remove()

        // Update storage
        saveToStorage()
 }

const handleAddNewTask = () => {
    // Get the input value 
    const notepad = document.getElementById("notepad");
    const inputValue = notepad.value.trim()

    // Check if there is a value in the inputValue variable
    if(!inputValue) {
        alert("Please add a Task")
        return
    }
   
 
// Create a new task card
const newTaskItem = {
    task: inputValue,
    id: Date.now()
}
DB.push(newTaskItem)

// Add to storage
saveToStorage()

// Clear the input value
notepad.value = ""

// Append it to the task container
     addItemsToDOM()
}

const saveToStorage = () =>{
    const value = JSON.stringify(DB)
    localStorage.setItem("TODO_DB",value)
}

window.addEventListener("load", () => {
    // Get the Stored TODO_DB item
    let StoredDB = localStorage.getItem("TODO_DB")
    if(!StoredDB)return
    DB = JSON.parse(StoredDB)

    addItemsToDOM()
})
form.addEventListener("submit", (event) =>{
  event.preventDefault();  // It will cancel the page from refresh (i.e try to submit to the server)
  handleAddNewTask()
})


// - Local Storage
// - Session Storage

// - Indexed DB