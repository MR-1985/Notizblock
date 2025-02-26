
titles = [];
notes = [];
doneTitles = [];
doneNotes = [];
archivatedTitles = [];
archivatedNotes = [];
deletedTitles = [];
deletedNotes = [];

let titleRef = document.getElementById('input_title');
let noteRef = document.getElementById('input_note');
let title = document.getElementById('input_title').value.trim();
    title = title.toUpperCase();
let note = document.getElementById('input_note').value.trim();


function hopToNextInput() {

    let title = document.getElementById('input_title').value.trim();
    title = title.toUpperCase();

    if(title.length < 3){
        titleRef.focus();
        alert('Titel muss mind 3 Zeichen haben!');
        return;
    }else noteRef.focus();

}

function hopToFirstInput() {

let note = document.getElementById('input_note').value.trim();

    if(note.length < 3){
        noteRef.focus();
        alert('Notiz muss mind 3 Zeichen haben!');
        return;
    }else 
        titleRef.focus();
        saveNote();
}

function saveNote() {

    let title = document.getElementById('input_title').value.trim();
    title = title.toUpperCase();
    let note = document.getElementById('input_note').value.trim();

    if (note.length < 3) {
        return;
    }else
        titles.push(title)
        notes.push(note)
        titleRef.value = "";
        noteRef.value = "";
        titleRef.focus()
    

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes()

    console.log('Anzahl an Titeln und Notizen im To Do = ' + titles.length + ', im Done sind ' + doneTitles.length + ' und im Archiv ' + archivatedTitles.length + '. Im gelöschte Daten-Speicher, befinden sich momentan ' + deletedNotes.length + ' gelöschte Notizen. Sie werden ab 100 Stück unwiederbringlich gelöscht!');
   
}

function renderNotes() {
    let titleListRef = document.getElementById('to_do_notes_title')
    let noteListRef = document.getElementById('to_do_notes');
    titleListRef.innerHTML = "";
    noteListRef.innerHTML = "";

    for (let iOfNotes = 0; iOfNotes < notes.length; iOfNotes++) {
        const note = notes[iOfNotes];
        const title = titles[iOfNotes];

        noteListRef.innerHTML += noteListTemplate(title, note, iOfNotes);
    }
}

function moveNoteToDone(iOfNotes) {

    let toMoveNote = notes.splice(iOfNotes, 1)[0];
    let toMoveTitle = titles.splice(iOfNotes, 1)[0];
    doneNotes.push(toMoveNote);
    doneTitles.push(toMoveTitle);

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("doneTitles", JSON.stringify(doneTitles));
    localStorage.setItem("doneNotes", JSON.stringify(doneNotes));


    console.log('Anzahl an Titeln und Notizen im To Do = ' + notes.length + ' und ' + doneTitles.length + ' im Done, während sich ' + archivatedTitles.length + ' Titel und Notizen im Archiv befinden. Im gelöschte Daten-Speicher, befinden sich momentan ' + deletedTitles.length + ' gelöschte Titel und Notizen. Sie werden ab 100 Stück unwiederbringlich gelöscht!');
    
    renderNotes();
    renderDoneNotes();
}

function renderDoneNotes() {
    let doneTitle = document.getElementById('done_titles')
    let doneList = document.getElementById('done_notes');
    doneTitle.innerHTML = "";
    doneList.innerHTML = "";

    for (let iOfDone = 0; iOfDone < doneNotes.length; iOfDone++) {
        const doneTitle = doneTitles[iOfDone];
        const doneNote = doneNotes[iOfDone];
        doneList.innerHTML += doneNoteListTemplate(doneTitle, doneNote, iOfDone);
    }
}

function archivateNote(iOfDone) {
    let toArchivateTitle = doneTitles.splice(iOfDone, 1)[0];
    let toArchivateNote = doneNotes.splice(iOfDone, 1)[0];
    archivatedTitles.push(toArchivateTitle);
    archivatedNotes.push(toArchivateNote);

    localStorage.setItem("doneTitles", JSON.stringify(doneTitles));
    localStorage.setItem("doneNotes", JSON.stringify(doneNotes));
    localStorage.setItem("archivatedTitles", JSON.stringify(archivatedTitles));
    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));

    console.log('Anzahl an Titeln und Notizen im Archiv = ' + archivatedTitles.length + ', im Done sind es ' + doneTitles.length + ' Titel und Notizen ' + 'und ' + titles.length + ' Titel und Notizen im To Do. Im gelöschte Daten-Speicher, befinden sich momentan ' + deletedTitles.length + ' gelöschte Titel und Notizen. Sie werden ab 100 Stück unwiederbringlich gelöscht!');

    renderDoneNotes();
    renderArchivatedNotes();
}

function renderArchivatedNotes() {
    let archivTitle = document.getElementById('archivated_title')
    let archivList = document.getElementById('archivated_list');
    archivList.innerHTML = "";
    archivTitle.innerHTML = "";

    for (let indexArchivated = 0; indexArchivated < archivatedNotes.length; indexArchivated++) {
        const archivatedTitle = archivatedTitles[indexArchivated];
        const archivatedNote = archivatedNotes[indexArchivated];
        archivList.innerHTML += archivatedNoteListTemplate(archivatedTitle, archivatedNote, indexArchivated);
    }
}
function loadNotesFromStorage() {
    titles = JSON.parse(localStorage.getItem("titles")) || [];
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    doneTitles = JSON.parse(localStorage.getItem("doneTitles")) || [];
    doneNotes = JSON.parse(localStorage.getItem("doneNotes")) || [];
    archivatedTitles = JSON.parse(localStorage.getItem("archivatedTitles")) || [];
    archivatedNotes = JSON.parse(localStorage.getItem("archivatedNotes")) || [];
    deletedTitles = JSON.parse(localStorage.getItem("deletedTitles")) || [];
    deletedNotes = JSON.parse(localStorage.getItem("deletedNotes")) || [];

    renderNotes();
    renderDoneNotes();
    renderArchivatedNotes(); 
}

function moveNoteUpToToDo(indexArchivated) {
    let movedUpTitle = archivatedTitles.splice(indexArchivated, 1)[0];

    let movedUpNote = archivatedNotes.splice(indexArchivated, 1)[0];

    if (movedUpTitle && movedUpNote) {
        titles.push(movedUpTitle);
        notes.push(movedUpNote);


        localStorage.setItem("archivatedTitles", JSON.stringify(archivatedTitles));
        localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));
        localStorage.setItem("titles", JSON.stringify(titles));
        localStorage.setItem("notes", JSON.stringify(notes));

        console.log('Anzahl an Titeln und Notizen im To Do = ' + titles.length + ', im Done sind ' + doneTitles.length + ' und im Archiv ' + archivatedTitles.length + '. Im gelöschte Daten-Speicher, befinden sich momentan ' + deletedNotes.length + ' gelöschte Titel und Notizen. Sie werden ab 100 Stück unwiederbringlich gelöscht!');

        renderArchivatedNotes();
        renderNotes();
    }
}

function deleteIt(indexArchivated) {

    let deletedTitle = archivatedTitles.splice(indexArchivated, 1)[0];
    let deletedNote = archivatedNotes.splice(indexArchivated, 1)[0];

    deletedTitles.push(deletedTitle);
    deletedNotes.push(deletedNote);

    localStorage.setItem("archivatedTitles", JSON.stringify(archivatedTitles));
    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));
    localStorage.setItem("deletedTitles", JSON.stringify(deletedTitles));
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));


    renderNotes();
    renderArchivatedNotes();
    console.log('Anzahl an Titeln und Notizen im Archiv = ' + archivatedNotes.length + ' im Done sind es ' + doneTitles.length + ' Titel und Notizen ' + 'und ' + titles.length + ' Titel und Notizen im To Do.');

    if (deletedTitles.length === 100 && deletedNotes.length === 100) {
        console.log('Es befanden sich 100 Titel und Notizen im Speicher. Der Speicher wurde nun geleert.');
    } else if (deletedTitles.length === 0 && deletedNotes.length === 0) {
        console.log('Der Speicher ist aktuell leer.');
    } else {
        console.log('Es befinden sich momentan ' + deletedTitles.length + ' zu löschende Titel und Notizen im Speicher. Unwiederbringlich gelöscht wird der Speicher ab 100 Titeln und Notizen!');
    }

    checkAndClearLocalStorage();
}


function toggleOverlay() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
}

function eventProtection(event) {
    event.stopPropagation();
}

function checkAndClearLocalStorage() {
    if (titles.length === 0 && notes.length === 0 && doneTitles.length === 0 && doneNotes.length === 0 && archivatedTitles.length === 0 && archivatedNotes.length === 0 && deletedTitles.length === 100 && deletedNotes.length === 100)
    {

        localStorage.clear();
        console.log('Alle Listen sind leer. Local Storage wurde gelöscht.');
    }
}

