
class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');

    document.querySelector('#add-note-btn').addEventListener('click', () => {
      let newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);
      document.getElementById("add-note-input").value = "";
      
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
  }
  
  displayNotes() {
    const notes = this.model.getNotes()

    // For each note, create and append a new element on the main container
    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
  };

  displayNotes() {
    // 1. Remove all previous notes
    document.querySelectorAll('.note').forEach(element => {
      element.remove();
    });

    const notes = this.model.getNotes();
  
    // For each note, create and append a new element on the main container
    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
  };

  displayNotesFromApi() {
    this.client.loadNotes(notes => {
      this.model.setNotes(notes)

      this.displayNotes();
    });
  };
};


module.exports = NotesView;