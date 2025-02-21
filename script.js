titles = [];
notes = [];
doneNotes = [];
archivatedNotes = [];
deletedNotes = [];

function hopToNextInput() {
    document.getElementById('input_note').focus();
}

function saveNote() {
    let givenNoteRef = document.getElementById('input_note');
    let givenTitleRef = document.getElementById('input_title')
    let givenNote = givenNoteRef.value;
    let givenTitle = givenTitleRef.value;
    givenTitle = givenTitle.toUpperCase();
    if (givenNote.length < 3) {
        alert('Ohne Eintrag geht das nicht')
    } else {
        notes.push(givenNote);
        titles.push(givenTitle);
    }
    renderNoteList()
    givenNoteRef.value = "";
    givenTitleRef.value = "";
}
function renderNoteList() {
    let titleList = document.getElementById('to_do_notes_title')
    let noteList = document.getElementById('to_do_notes');
    titleList.innerHTML = ""
    noteList.innerHTML = "";

    for (let iOfNotes = 0; iOfNotes < notes.length; iOfNotes++) {
        const note = notes[iOfNotes];
        const title = titles[iOfNotes];
        noteList.innerHTML += noteListTemplate(title, note, iOfNotes);
    }
}

function moveNoteToDone(iOfNotes) {

    let toMoveNote = notes.splice(iOfNotes, 1);
    doneNotes.push(toMoveNote);
    renderNoteList();
    renderDoneNotes();
}

function renderDoneNotes() {
    let doneList = document.getElementById('done_notes');
    doneList.innerHTML = "";

    for (let indexDone = 0; indexDone < doneNotes.length; indexDone++) {
        const doneNote = doneNotes[indexDone];
        doneList.innerHTML += doneNoteListTemplate(doneNote, indexDone);
    }
}

function archivateNote(indexDone) {
    let toArchivateNote = doneNotes.splice(indexDone, 1)[0];
    archivatedNotes.push(toArchivateNote);

    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));

    archivatedNotes = JSON.parse(localStorage.getItem("archivatedNotes"));
    renderDoneNotes();
    renderArchivatedNotes();
}

function renderArchivatedNotes() {
    let archivList = document.getElementById('archivated_list');
    archivList.innerHTML = "";

    for (let indexArchivated = 0; indexArchivated < archivatedNotes.length; indexArchivated++) {
        const archivatedNote = archivatedNotes[indexArchivated];
        archivList.innerHTML += archivatedNoteListTemplate(archivatedNote, indexArchivated);
    }
}
function loadNotesFromStorage() {
    archivatedNotes = JSON.parse(localStorage.getItem("archivatedNotes"));
    renderArchivatedNotes();
}

function moveNoteUpToToDo(archivatedNote, indexArchivated) {
    let movedUpNote = archivatedNotes.splice(indexArchivated, 1);
    notes.push(movedUpNote);
    renderArchivatedNotes();
    renderNoteList();
}

function deleteIt(indexArchivated) {
    let deleted = archivatedNotes.splice(indexArchivated, 1);
    deletedNotes.push(deleted);
    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));
    if (deletedNotes.length > 0) {
        deletedNotes.length = 0;
        console.log('Keine gespeicherten Notizen mehr in der Liste')
    }
    console.log('Anzahl an Notizen = ' + deletedNotes.length);
    renderArchivatedNotes();
    renderNoteList();
}

function toggleOverlay() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
}

function eventProtection(event) {
    event.stopPropagation();
}