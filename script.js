let addbtn = document.querySelector(".add-btn");
let removebtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolBoxColors = document.querySelectorAll(".color");


let colors = ["lightpink", "lightblue", "lightgreen", "black"]
let modalPriorityColor = colors[colors.length-1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketArr = [];

for(let i=0; i < toolBoxColors.length; i++) {
    toolBoxColors[i].addEventListener("click", (e) => {
        let currentToolBoxColor = toolBoxColors[i].classList[0];
        //filter the tickets -> loop will return an array of object with filtered tickets
        let filteredTickets = ticketArr.filter((ticketObj, idx) => {
            return currentToolBoxColor === ticketObj.ticketColor;

        })

        // remove previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i=0; i< allTicketsCont.length; i++){
            allTicketsCont[i].remove();
        }

        //Display new filtered tickets
        filteredTickets.forEach((ticketObj ,idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);

        })

    })

    toolBoxColors[i].addEventListener("dblclick", (e) => {
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i=0; i< allTicketsCont.length; i++){
            allTicketsCont[i].remove();
        }

        ticketArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID)
        })
    })
}

//Listener for modal priority coloring

allPriorityColors.forEach((colorElem,idx) => {
    colorElem.addEventListener("click", (e) => {
        allPriorityColors.forEach((priorityColorsElem, idx) => {
            priorityColorsElem.classList.remove("border");
        })
        colorElem.classList.add("border");

        modalPriorityColor = colorElem.classList[0];

    })
})

addbtn.addEventListener("click", (e) => {
    //display modal
    //generate ticket

    //addFlag, false ->  modal none
    //addFlag, true ->  modal display
    addFlag = !addFlag;
    
    if(addFlag) {
        modalCont.style.display = "flex";
    }else{
        modalCont.style.display = "none";
    }

})

removebtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})

modalCont.addEventListener("keydown", (e) => {
    let key = e.key;
    if(key == "Shift"){
        createTicket(modalPriorityColor, textareaCont.value);
        addFlag = false;
        setModalToDefault();
    }
})

function createTicket(ticketColor, ticketTask, ticketID) {
    let id = ticketID || shortid();
    let ticketCont = document.createElement("div");
    console.log(ticketColor);
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fas fa-lock"></i>
        </div>
    `;
    mainCont.appendChild(ticketCont);

    // Create object of ticket and add to array
    if(!ticketID) ticketArr.push( {ticketColor, ticketTask, ticketID: id} );

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}


function handleRemoval(ticket) {
    //remove

    if(removeFlag) {
        ticket.remove();
    }
    
}

function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click", (e) => {
        if(ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        }else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
    })
}


function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {

        let currentTicketColor = ticketColor.classList[1];
        //get ticket color idx

        let currentTicketColorIdx = colors.findIndex((color) => {
            return currentTicketColor === color;

        })

        currentTicketColorIdx++;
        let newTicketColorIdx = currentTicketColorIdx % colors.length;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove((currentTicketColor));
        ticketColor.classList.add(newTicketColor);

    })

}

function setModalToDefault() {
    modalCont.style.display = "none";
    textareaCont.value = "";
    modalPriorityColor = colors[colors.length - 1];
    allPriorityColors.forEach((priorityColorsElem, idx) => {
        priorityColorsElem.classList.remove("border");
    })
    allPriorityColors[allPriorityColors.length - 1].classList.add("border");

}






