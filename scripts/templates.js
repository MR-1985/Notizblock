function noteListTemplate(title, note, iOfNotes) {
    return `<h4 class="title_color"> ${title}</h4><ul><li class="li"> ${note}<button class="button to_done" onclick="moveNoteToDone(${iOfNotes})">✓</button></li></ul>`
}

function doneNoteListTemplate(doneTitle, doneNote, indexDone) {
    return `<h4 class="title_color"> ${doneTitle}</h4><ul><li class="moved_li">${doneNote}<button class="button archivate" onclick="archivateNote(${doneNote, indexDone})">A</button></li></ul>`
}

function archivatedNoteListTemplate(archivatedTitle, archivatedNote, indexArchivated) {
    return `<h4 class="title_color"> ${archivatedTitle}</h4><ul><li class="deleted_li">${archivatedNote}<button class="button back_to_notes" onclick="moveNoteUpToToDo(${indexArchivated})">N</button><button class="button delete" onclick="deleteIt(${indexArchivated})">D</button></li></ul>`
}

