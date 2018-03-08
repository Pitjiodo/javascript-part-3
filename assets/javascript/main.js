function getLocal() {
    var notes = localStorage.getItem("noteList");
    if(notes != null) {
        return JSON.parse(notes);
    }
    else {
        return [];
    }
}

function setLocal(origNotes) {
    var newNotes = JSON.stringify(origNotes);
    
    localStorage.setItem("noteList", newNotes);
}

function submitNote(inputText, inputDate, inputImportant, inputIcon){
    var origNotes = getLocal();
    
    var newNote = {
        text:       inputText,
        date:       inputDate,
        important:  inputImportant,
        icon:       inputIcon
    };
    
    origNotes.push(newNote);
    
    setLocal(origNotes);
    
}

//setLocal('hey', '2018/03/08, 13:05:03', true, 'empire');

function buildList(){
    var notes = getLocal();
    
    var ulElm = document.querySelector("ul");
    ulElm.innerHTML = "";
    
    for(var i = 0; i < notes.length; i++) {
        var liElm = document.createElement("li");
        var pElm = document.createElement("p");
        
        if(notes[i].important === true){
            liElm.style.backgroundColor = "#FFB000";
            liElm.style.color = "#fff";
        }
        
        
        pElm.innerHTML = notes[i].text;
        pElm.classList.add("pinkUnicorn");
        
        liElm.appendChild(pElm);
        
        if(notes[i].date !== ""){
            var pDateElm = document.createElement('p');
            pDateElm.innerHTML = notes[i].date;
            liElm.appendChild(pDateElm);
        }
        
        ulElm.appendChild(liElm);
    }
}

window.onload = function() {
    buildList();
}

var submitBtn = document.querySelector("#addNote");

submitBtn.addEventListener("click", function(){
    var text = document.querySelector("#noteText");
    var important = document.querySelector("#noteImportant");
    var date = document.querySelector("#noteTime");
// add icons var icon = document.querySelector("#noteTime");
    
    submitNote(text.value, date.value, important.checked, "");
    buildList();
    
    text.value = "";
    date.value = "";
    important.checked = false;
});

