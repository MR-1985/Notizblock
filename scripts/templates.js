function noteListTemplate(title, note, iOfNotes) {
    return `
            <h4> Titel: </h4>
            <h5 class="title_color">${title}</h5>
            <h4> Notiz: </h4>
            <ul>
                <li class="li">
                    ${note}
                    <button class="button to_done" onclick="moveNote(${iOfNotes}, 'notes', 'doneNotes')">
                        ✓
                    </button>
                </li>
            </ul>
            `;
}

function doneNoteListTemplate(doneTitle, doneNote, indexDone) {
    return `
            <h4> Titel: </h4>
            <h5 class="title_color"> Titel: ${doneTitle}</h5>
            <h4> Notiz: </h4>
            <ul>
                <li class="moved_li">
                    ${doneNote}
                    <button class="button archivate" onclick="moveNote(${indexDone}, 'doneNotes', 'archivatedNotes')">
                        A
                    </button>
                </li>
            </ul>
            `
}

function archivatedNoteListTemplate(archivatedTitle, archivatedNote, indexArchivated) {
    return `
            <h4> Titel: </h4>
            <h5 class="title_color">${archivatedTitle}</h5>
            <h4> Notiz: </h4>
            <ul>
                <li class="deleted_li">
                    ${archivatedNote}
                    <div> 
                        <button class="button back_to_notes" onclick="moveNote(${indexArchivated}, 'archivatedNotes', 'notes')">
                         N
                        </button>
                        <button class="delete" onclick="deleteIt(${indexArchivated})">
                         D
                        </button>
                    </div>
                </li>
        
            </ul>
            `
}
