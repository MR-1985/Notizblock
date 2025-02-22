
titles = [];
notes = [];
doneTitles = [];
doneNotes = [];
archivatedTitles = [];
archivatedNotes = [];
deletedTitles = [];
deletedNotes = [];

function hopToNextInput() {
    document.getElementById('input_note').focus();
}
function hopToFirstInput() {
    document.getElementById('input_title').focus();
}

function saveNote() {
    let givenNoteRef = document.getElementById('input_note');
    let givenTitleRef = document.getElementById('input_title');
    let givenNote = givenNoteRef.value.trim();
    let givenTitle = givenTitleRef.value.trim();
    givenTitle = givenTitle.toUpperCase();
    if (givenNote.length < 3) {
        alert('Ohne Eintrag geht das nicht');
        return;
    }
    if (givenTitle.length < 3) {
        alert('Ohne Eintrag geht das nicht');
        return;
    }

    notes.push(givenNote);
    titles.push(givenTitle);

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

    let toMoveNote = notes.splice(iOfNotes, 1)[0];
    let toMoveTitle = titles.splice(iOfNotes, 1)[0];
    doneNotes.push(toMoveNote);
    doneTitles.push(toMoveTitle);
    console.log('Anzahl an Titeln im To Do = ' + notes.length + ' und ' + doneTitles.length + ' im Done, während sich ' + archivatedTitles.length + ' Titel im Archiv befinden.');
    console.log('Anzahl an Notizen im To Do = ' + titles.length + ' und ' + doneNotes.length + ' im Done, während sich ' + archivatedNotes.length + ' Notizen im Archiv befinden.');
    renderNoteList();
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

    localStorage.setItem("archivatedTitles", JSON.stringify(archivatedTitles));
    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));

    console.log('Anzahl an Titel im Archiv = ' + archivatedTitles.length + ', im Done sind es ' + doneTitles.length + ' Titel ' + 'und ' + titles.length + ' Titel im To Do.');
    console.log('Anzahl an Notizen im Archiv = ' + archivatedNotes.length + ', im Done sind es ' + doneNotes.length + ' Notizen ' + 'und ' + notes.length + ' Notizen im To Do.');
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
    archivatedTitles = JSON.parse(localStorage.getItem("archivatedTitles")) || [];
    archivatedNotes = JSON.parse(localStorage.getItem("archivatedNotes"));
    renderArchivatedNotes() || [];
}

function moveNoteUpToToDo(indexArchivated) {
    let movedUpTitle = archivatedTitles.splice(indexArchivated, 1);
    titles.push(movedUpTitle);
    let movedUpNote = archivatedNotes.splice(indexArchivated, 1);
    notes.push(movedUpNote);
    console.log('Anzahl an Titeln im To Do = ' + titles.length + ', im Done sind ' + doneTitles.length + ' und im Archiv ' + archivatedTitles.length + '.');
    console.log('Anzahl an Notizen im To Do = ' + titles.length + ', im Done sind ' + doneNotes.length + ' und im Archiv ' + archivatedNotes.length + '.');
    renderArchivatedNotes();
    renderNoteList();
}

function deleteIt(indexArchivated) {
    let deletedTitle = archivatedTitles.splice(indexArchivated, 1)[0];
    deletedTitles.push(deletedTitle);
    localStorage.setItem("archivatedTitles", JSON.stringify(archivatedTitles));
    if (deletedTitles.length > 0) {
        deletedTitles.length = 0;
    }

    let deletedNote = archivatedNotes.splice(indexArchivated, 1);
    deletedNotes.push(deletedNote);
    localStorage.setItem("archivatedNotes", JSON.stringify(archivatedNotes));
    if (deletedNotes.length > 0) {
        deletedNotes.length = 0;
    }
    console.log('Anzahl an Titeln im Archiv = ' + archivatedNotes.length + ' im Done sind es ' + doneTitles.length + ' Titel ' + 'und ' + titles.length + ' Titel im To Do.');
    console.log('Anzahl an Notizen im Archiv = ' + archivatedNotes.length + ', im Done sind es ' + doneNotes.length + ' Notizen ' + 'und ' + notes.length + ' Notizen im To Do.');
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