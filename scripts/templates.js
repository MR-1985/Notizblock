function noteListTemplate(title, note, iOfNotes) {
    return `<h4 class="title_color"> ${title}</h4><li class="li"> ${note}<button class="button to_done" onclick="moveNoteToDone(${title, note, iOfNotes})">✓</button></li>`
}

function doneNoteListTemplate(doneTitle, doneNote, indexDone) {
    return `<h4 class="title_color"> ${doneTitle}</h4><li class="moved_li">${doneNote}<button class="button archivate" onclick="archivateNote(${doneNote, indexDone})">A</button></li>`
}

function archivatedNoteListTemplate(archivatedTitle, archivatedNote, indexArchivated) {
    return `<h4 class="title_color"> ${archivatedTitle}</h4><li class="deleted_li">${archivatedNote}<button class="button back_to_notes" onclick="moveNoteUpToToDo(${archivatedNote, indexArchivated})">N</button><button class="button delete" onclick="deleteIt(${archivatedNote, indexArchivated})">D</button></li>`
}

