allNotes = {
    'notesTitle' : [],
    'notes' : [],
    'doneNotesTitle' : [],
    'doneNotes' : [],
    'archivatedNotesTitle' : [],
    'archivatedNotes' : [],
    'deletedNotesTitle' : [],
    'deletedNotes' : []
}

let titleRef = document.getElementById('input_title');
let noteRef = document.getElementById('input_note');
let title = document.getElementById('input_title').value.trim();
title = title.toUpperCase();
let note = document.getElementById('input_note').value.trim();


function saveNote() {
    let title = document.getElementById('input_title').value.trim();
    title = title.toUpperCase();
    let note = document.getElementById('input_note').value.trim();

    if(title.length < 3){
        alert('Titel muss mind 3 Zeichen haben!');
        titleRef.value = "";
        titleRef.focus();
        return;
    }if (note.length < 3) {
        alert('Notiz muss mind 3 Zeichen haben!');
        noteRef.value = "";
        noteRef.focus();
        return;
    }else
        allNotes.notesTitle.push(title)
        allNotes.notes.push(note)
        titleRef.value = "";
        noteRef.value = "";
        titleRef.focus()

    localStorage.setItem("allNotes.notesTitle", JSON.stringify(allNotes.notesTitle));
    localStorage.setItem("allNotes.notes", JSON.stringify(allNotes.notes));

    renderNotes()

    console.log('Notizen in den Listen: ' + 
        '\nTo Do: ' + allNotes.notes.length + 
        '\nDone: ' + allNotes.doneNotesTitle.length + 
        '\nArchiv: ' + allNotes.archivatedNotesTitle.length + 
        '\nGelöschte Notizen: ' + allNotes.deletedNotesTitle.length +
        '\n(Gelöschte Notizen werden ab 20 Stück automatisch aus dem Speicher entfernt)');
}

function moveNote(indexNote, startKey, destinationKey){
    let note = allNotes[startKey].splice(indexNote,1);
    allNotes[destinationKey].push(note[0]);

    let titles = allNotes[startKey + 'Title'].splice(indexNote,1);
    allNotes[destinationKey + 'Title'].push(titles[0]);

    localStorage.setItem("allNotes." + startKey, JSON.stringify(allNotes[startKey]));
    localStorage.setItem("allNotes." + startKey + "Title", JSON.stringify(allNotes[startKey + "Title"]));
    localStorage.setItem("allNotes." + destinationKey, JSON.stringify(allNotes[destinationKey]));
    localStorage.setItem("allNotes." + destinationKey + "Title", JSON.stringify(allNotes[destinationKey + "Title"]));

    console.log('Notizen in den Listen: ' + 
        '\nTo Do: ' + allNotes.notes.length + 
        '\nDone: ' + allNotes.doneNotesTitle.length + 
        '\nArchiv: ' + allNotes.archivatedNotesTitle.length + 
        '\nGelöschte Notizen: ' + allNotes.deletedNotesTitle.length +
        '\n(Gelöschte Notizen werden ab 20 Stück automatisch aus dem Speicher entfernt)');

    renderNotes();
    renderDoneNotes();
    renderArchivatedNotes();
}

function deleteIt(indexArchivated) {
    let deletedTitle = allNotes.archivatedNotesTitle.splice(indexArchivated, 1)[0];
    let deletedNote = allNotes.archivatedNotes.splice(indexArchivated, 1)[0];

    allNotes.deletedNotesTitle.push(deletedTitle);
    allNotes.deletedNotes.push(deletedNote);

    localStorage.setItem("allNotes.archivatedNotesTitle", JSON.stringify(allNotes.archivatedNotesTitle));
    localStorage.setItem("allNotes.archivatedNotes", JSON.stringify(allNotes.archivatedNotes));
    localStorage.setItem("allNotes.deletedNotesTitle", JSON.stringify(allNotes.deletedNotesTitle));
    localStorage.setItem("allNotes.deletedNotes", JSON.stringify(allNotes.deletedNotes));

    renderNotes();
    renderArchivatedNotes();

    console.log('Notizen in den Listen: ' + 
        '\nTo Do: ' + allNotes.notes.length + 
        '\nDone: ' + allNotes.doneNotesTitle.length + 
        '\nArchiv: ' + allNotes.archivatedNotesTitle.length + 
        '\nGelöschte Notizen: ' + allNotes.deletedNotesTitle.length +
        '\n(Gelöschte Notizen werden ab 20 Stück automatisch aus dem Speicher entfernt)');

    if (allNotes.deletedNotes.length >= 20) {
        checkAndClearLocalStorage();
    }
}


function hopToNextInput() {
    let title = document.getElementById('input_title').value.trim();
    title = title.toUpperCase();

    if(title.length < 3){
        alert('Titel muss mind 3 Zeichen haben!');
        titleRef.value = "";
        titleRef.focus();
        return;
    }else noteRef.focus();
}

function hopToFirstInput() {
    let note = document.getElementById('input_note').value.trim();

    if(note.length < 3){
        noteRef.value = "";
        noteRef.focus();
        alert('Notiz muss mind 3 Zeichen haben!');
        return;
    }else 
        titleRef.focus();
        saveNote();
}


function renderNotes() {
    let titleListRef = document.getElementById('to_do_notes_title')
    let noteListRef = document.getElementById('to_do_notes');
    titleListRef.innerHTML = "";
    noteListRef.innerHTML = "";

    for (let iOfNotes = 0; iOfNotes < allNotes.notes.length; iOfNotes++) {
        const note = allNotes.notes[iOfNotes];
        const title = allNotes.notesTitle[iOfNotes];
        noteListRef.innerHTML += noteListTemplate(title, note, iOfNotes);
    }
}

function renderDoneNotes() {
    let doneTitle = document.getElementById('done_titles')
    let doneList = document.getElementById('done_notes');
    doneTitle.innerHTML = "";
    doneList.innerHTML = "";

    for (let iOfDone = 0; iOfDone < allNotes.doneNotes.length; iOfDone++) {
        const doneTitle = allNotes.doneNotesTitle[iOfDone];
        const doneNote = allNotes.doneNotes[iOfDone];
        doneList.innerHTML += doneNoteListTemplate(doneTitle, doneNote, iOfDone);
    }
}

function renderArchivatedNotes() {
    let archivTitle = document.getElementById('archivated_title')
    let archivList = document.getElementById('archivated_list');
    archivList.innerHTML = "";
    archivTitle.innerHTML = "";

    for (let indexArchivated = 0; indexArchivated < allNotes.archivatedNotes.length; indexArchivated++) {
        const archivatedTitle = allNotes.archivatedNotesTitle[indexArchivated];
        const archivatedNote = allNotes.archivatedNotes[indexArchivated];
        archivList.innerHTML += archivatedNoteListTemplate(archivatedTitle, archivatedNote, indexArchivated);
    }
}


function loadNotesFromStorage() {
    allNotes.notesTitle = JSON.parse(localStorage.getItem("allNotes.notesTitle")) || [];
    allNotes.notes = JSON.parse(localStorage.getItem("allNotes.notes")) || [];
    allNotes.doneNotesTitle = JSON.parse(localStorage.getItem("allNotes.doneNotesTitle")) || [];
    allNotes.doneNotes = JSON.parse(localStorage.getItem("allNotes.doneNotes")) || [];
    allNotes.archivatedNotesTitle = JSON.parse(localStorage.getItem("allNotes.archivatedNotesTitle")) || [];
    allNotes.archivatedNotes = JSON.parse(localStorage.getItem("allNotes.archivatedNotes")) || [];
    allNotes.deletedNotesTitle = JSON.parse(localStorage.getItem("allNotes.deletedNotesTitle")) || [];
    allNotes.deletedNotes = JSON.parse(localStorage.getItem("allNotes.deletedNotes")) || [];

    renderNotes();
    renderDoneNotes();
    renderArchivatedNotes(); 
}

function toggleOverlay() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
}

function eventProtection(event) {
    event.stopPropagation();
}

function checkAndClearLocalStorage() {
    if (allNotes.deletedNotes.length >= 20) {
        localStorage.clear();
        allNotes.deletedNotesTitle = [];
        allNotes.deletedNotes = [];
        console.log('Der Papierkorb enthielt 20 oder mehr Notizen und wurde geleert.');
    }
}
