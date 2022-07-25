function compare(a, b) 
{
    if (a.id > b.id) return 1;
    if (b.id > a.id) return -1;
    return 0;
}
function getNoteFromLocalStroge() 
{
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;    
    while ( i-- ) 
    {
        values.push(JSON.parse( localStorage.getItem(keys[i])) );
        console.log(localStorage.getItem(keys[i]));
    }
    values.sort(compare);  
    return values; 
}
function showNoteInHtmlPage()
{
    let array=getNoteFromLocalStroge();
    var html=" ";
    for (let index = 0; index < array.length; index++) 
    {
        html+=
        `<div class="note" id="${array[index].id}">
            <span class="glyphicon glyphicon-remove" onclick="deleteFromLocalStorage(${array[index].id})">
            </span>
            <div class="mainNote">${array[index].text}</div>
            <p>${array[index].date} 
              <br> ${array[index].time}
            </p>
      </div>`;          
    }
    document.getElementById("noteSection").innerHTML=html;
}
function deleteFromLocalStorage(id)
{
    localStorage.removeItem(id);
    showNoteInHtmlPage();
}
function clearTaskBoard()
{
    document.getElementById("textarea").value="";
    document.getElementById("date").value="";
    document.getElementById("time").value="";
}
function saveNewTask() 
{
    var text=document.getElementById("textarea").value;
    var date=document.getElementById("date").value;
    var time=document.getElementById("time").value;
    if(text=="")
    {
        alert("please write something on the text area");
        return;
    }
    if(!Date.parse(date))
    {
        alert("please enter a valid date");
        return;
    }
    var checkLastValue = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    console.log(keys.length);
    while ( i-- ) 
    {
        checkLastValue.push(JSON.parse( localStorage.getItem(keys[i])) );
    }
    checkLastValue.sort(compare); 
    let newID;
    if(keys.length>0)
    {
        newID=checkLastValue[ keys.length-1].id+1;
    }
    else
    {
        newID=1;
    }
    var note ={
        'text':text,
        'date':date,
        'time':time,
        'id':newID
    };
    localStorage.setItem(""+(newID),  JSON.stringify(note));
    showNoteInHtmlPage();
    clearTaskBoard();
}
showNoteInHtmlPage();