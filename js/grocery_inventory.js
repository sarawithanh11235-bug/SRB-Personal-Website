/*
BMG Coding Assessment
Grocery Inventory JavaScript File
Author: Sarah Rose Blette
Date:   01/08/2021
Filename: grocery_inventory.js
*/ 
var add_button = document.getElementById('add-button');
var del_buttons = document.getElementsByClassName('delete'); 
var inventory_container = document.querySelector('.inventory-container');
var inventory_input = document.getElementById('new-inventory')
var soldAll = document.getElementById('check-all-button');
var clearSold = document.getElementById('clearSold');
var showAll = document.getElementById('showAll');
var showSold = document.getElementById('showSold');
var showRemoved = document.getElementById('showRemoved');
var showExpired = document.getElementById('showExpired');
var showState = 'showAll';
showAll.style.color="Black";
var inventory_item_string = "<div class=\"status-icon\"></div><p class=\"inventory-text\"><p class=\"inventory-status color-red\">Expired</p><ion-icon class=\"delete fs-large mg-10\" name=\"close-circle-outline\"></ion-icon>"
var inventory_count = 5;
updateInventoryCount();
eventSetter();

function updateInventoryCount(){
    document.getElementById('inventory-left-count').innerHTML = inventory_count;
}
function eventSetter(){
    var del_buttons = document.getElementsByClassName('delete'); 
    for(del of del_buttons){
        del.addEventListener('click', removeItem);
    }
    var removed_buttons = document.getElementsByClassName('status-icon');
    for(p of removed_buttons){
        p.addEventListener('click', changeRemoved);
    }
    var items = document.getElementsByClassName('inventory-item');
    console.log(items);
    for(let i = 0; i < items.length; i++){
        console.log(items[i]);
        items[i].addEventListener('mouseover', function(){
            console.log(items[i]);
            items[i].children[3].style.visibility="initial";
        })
        items[i].addEventListener('mouseleave', function(){
            console.log(items[i].children[3].style.visibility);
            items[i].children[3].style.visibility="hidden";
        })
    } 
}
function reassignIDs(){
    var items = document.getElementsByClassName('inventory-item');
    var count=1;
    for(item of items){
        item.setAttribute("id", "t" + (count++));
        item.eve
    }
}
function resetColor(){
    var allButtons = document.getElementsByClassName('filter-button');
    for(button of allButtons)
        button.style.color = "black";
}
add_button.addEventListener('click', function(){
    var inventory_item = document.createElement('div');
    inventory_item.innerHTML= inventory_item_string
    inventory_item.setAttribute("class", "inventory-item Expired");
    inventory_item.setAttribute("id", "t" + (++inventory_count));
    inventory_container.appendChild(inventory_item);
    let item_text = document.querySelector('#t' + inventory_count + " p");
    item_text.innerHTML = inventory_input.value;
    inventory_input.value = "";
   updateInventoryCount();
   eventSetter();
})
document.addEventListener("keydown", function (event){
    var keyValue = event.key;
    if(keyValue=="Enter"){
    var inventory_item = document.createElement('div');
    inventory_item.innerHTML= inventory_item_string
    inventory_item.setAttribute("class", "inventory-item Expired");
    inventory_item.setAttribute("id", "t" + (++inventory_count));
    inventory_container.appendChild(inventory_item);
    let item_text = document.querySelector('#t' + inventory_count + " p");
    item_text.innerHTML = inventory_input.value;
    inventory_input.value = "";
   updateInventoryCount();
   eventSetter();
    }
  });
function removeItem(){
    var parent = this.parentElement;
    parent.classList.add('delete-item');
    setTimeout(function(){
        parent.parentNode.removeChild(parent);
        updateInventoryCount();
        reassignIDs(); 
        eventSetter();
    }, 1000)
    inventory_count --;
    
}
function changeRemoved(){
    var parentItem = this.parentElement;
    var status = parentItem.classList[1];
    parentItem.classList.remove(status);
    var statusElem = parentItem.children[2];
    if(status == 'expired'){
        parentItem.classList.add('Removed');
        statusElem.innerHTML="Removed";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-blue');
    }
    else if(status =='Sold'){
        parentItem.classList.add('Removed');
        statusElem.innerHTML="Removed";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-blue');
    }
    else{
        parentItem.classList.add('Sold');
        statusElem.innerHTML="Sold";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-green');
    }
}
soldAll.addEventListener('click', function(){
    var removed_buttons = document.getElementsByClassName('status-icon');
    for(p of removed_buttons){
        var parentItem = p.parentElement;
        var status = parentItem.classList[1];
        parentItem.classList.remove(status);
        var statusElem = parentItem.children[2];
        parentItem.classList.remove(status);
        parentItem.classList.add("Sold");
        statusElem.innerHTML="Sold";
        statusElem.classList.remove(statusElem.classList[1]);
        statusElem.classList.add('color-green');
    }
});
clearSold.addEventListener('click', function(){
    let items = document.getElementsByClassName('Sold');
    let parent = items[0].parentElement;
    let length =items.length;
    let count=length-1;
    intervalID = setInterval(function(){
        items[count].classList.add('delete-item');
        inventory_count--;
        setTimeout(function(){
            this.parentNode.removeChild(this); 
            updateInventoryCount();
      }.bind(items[count]),500 )
        count--;
        if(count < 0){
            clearInterval(intervalID);
        }
    }, 1000);  
});
showAll.addEventListener('click',function(){
    
    if(showState !='showAll'){
        resetColor();
        this.style.color="black";
        var allItems = document.getElementsByClassName('inventory-item');
        for(item of allItems){
            item.style.display = "flex";
        }
        showState ='showAll';
    }
});
showSold.addEventListener('click',function(){
    if(showState !='showSold'){
        resetColor();
        this.style.color="black";
        var allItems = document.getElementsByClassName('inventory-item');
        for(item of allItems){
            if(item.classList[1]!='Sold')
                item.style.display = "none";
            else
            item.style.display = "flex";
        }
        showState = 'showSold';
    }
});
showRemoved.addEventListener('click',function(){
    if(showState !='showRemoved'){
        resetColor();
        this.style.color="black";
        var allItems = document.getElementsByClassName('inventory-item');
        for(item of allItems){
            if(item.classList[1]!='Removed')
                item.style.display = "none";
            else
                item.style.display = "flex";
        }
        showState = 'showRemoved';
    }
});
showExpired.addEventListener('click',function(){
    if(showState !='showExpired'){
        resetColor();
        this.style.color="black";
        var allItems = document.getElementsByClassName('inventory-item');
        for(item of allItems){
            if(item.classList[1]!='expired')
                item.style.display = "none";
            else
                item.style.display = "flex";
        }
        showState = 'showExpired';
    }
});