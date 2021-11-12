const taskContainer= document.querySelector(".task__container");
let globalTaskData =[];
const generateHTML = (taskData)=> {return `<div id=${taskData.id} class="col-md-6 col-lg-4" >
    <div class="card" >
    <div class="card-header d-flex justify-content-end gap-3">
      <button class="btn btn-outline-info" name=${taskData.id} onclick="editCard.apply(this,arguments)"><i class="fal fa-pencil"name=${taskData.id}></i></button>
      <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="far fa-trash" name=${taskData.id}></i></button>
    </div>
    <div class="card-body">
      <img src= ${taskData.image}  alt="image" class="card-img">
      <h5 class="card-title mt-3">${taskData.title}</h5>
      <p class="card-text"> ${taskData.description}</p>
      <h6><span class="badge bg-primary"> ${taskData.type}</span></h6>

    </div>
    <div class="card-footer">
      <div class="card-footer" >
        <button class="btn btn-outline-primary" name=${taskData.id}>Open Task</button>
      </div>
    </div>
</div>`;
};

const insertTODOM =(content)=>taskContainer.insertAdjacentHTML("beforeend", content);

const saveToLocalStorage =()=>{
  localStorage.setItem("taskyCA", JSON.stringify({cards: globalTaskData}));
};



    


const addNewCard = () =>{
    //get task data
    const taskData={
        id:`${Date.now()}`,
        title:document.getElementById("taskTitle").value,
        image:document.getElementById("imageURL").value,
        type:document.getElementById("taskType").value,
        description:document.getElementById("taskDescription").value,
    };

    

    //push into local storage
    globalTaskData.push(taskData);

    //update the local storage
    saveToLocalStorage();
    
    //generate html code
   const newCard = generateHTML(taskData);

    //inject to DOM 
    insertTODOM(newCard);

//clear the form
title:document.getElementById("taskTitle").value="";
image: document.getElementById("imageURL").value="";
type:document.getElementById("taskType").value="";
description:document.getElementById("taskDescription").value="";
return;
};


const loadExistingCards = ()=>{
  //check local storage
  const getData = localStorage.getItem("taskyCA");

  //parse JSON data if exists 
  if(!getData)return;
  const taskCards=JSON.parse(getData);
  globalTaskData=taskCards.cards;

  //generate html code for the data 

  globalTaskData.map((taskData)=>{
    const newCard = generateHTML(taskData);
    //inject to DOM
    insertTODOM(newCard);

  });
return;
  
};

const deleteCard=(event)=>{
  const targetID= event.target.getAttribute("name");
  const elementType = event.target.tagName;

  const removeTask = globalTaskData.filter((taskData)=>{
    (taskData.id !== targetID);
  });
  globalTaskData=removeTask;
  //update local storage
  saveToLocalStorage();

  //access DOM to remove card 
  if(elementType==="BUTTON"){
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  };

};

const editCard=(event)=>{
 
  const elementType=event.target.tagName;
  let taskTitle;
  let taskType;
  let taskDescription;
  let parentElement;
  let submitButton;
  if(elementType==="BUTTON"){
    parentElement=event.target.parentNode.parentNode;
  }else{
    parentElement=event.target.parentNode.parentNode.parentNode;
  };
  taskTitle= parentElement.childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[3].childNodes[5];
  taskType= parentElement.childNodes[3].childNodes[7];
  submitButton=parentElement.childNodes[5].childNodes[1];
  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.setAttribute("onlick","saveEdit.apply(this , arguments)");
  submitButton.innerHTML="Save Changes";

};
const saveEdit = (event)=>{
  const targetID= event.target.getAttribute("name");
  const elementType = event.target.tagName;

  let parentElement;
  let submitButton;
  if(elementType=="BUTTON"){
    parentElement=event.target.parentNode.parentNode;
  }else{
    parentElement=event.target.parentNode.parentNode.parentNode;
  };
  taskTitle= parentElement.childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[3].childNodes[5];
  taskType= parentElement.childNodes[3].childNodes[7];
  submitButton=parentElement.childNodes[5].childNodes[1];
  console.log(taskTitle,taskDescription,taskType);
  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.setAttribute("onclick","saveEdit.apply(this , arguments)");
  submitButton.innerHTML="Save Changes";

  const updatedData={
    title: taskTitle.innerHTML,
    type:taskType.innerHTML,
    description:taskDescription.innerHTML,
  };
  globalTaskData.forEach((task)=>{
    if(task.id===targetID){
      return{...task,...updatedData};

    };
    return task;
  });
saveToLocalStorage();
taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  submitButton.setAttribute("onclick","saveEdit.apply(this , arguments)");
  submitButton.innerHTML="Open Task";

};
