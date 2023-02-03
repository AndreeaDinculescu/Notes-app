const NotesModel = require('./notesModel.js');

describe('Notes model class', () => {
   it('starts with no notes', () => {
      const notes = new NotesModel();

      expect(notes.getNotes()).toEqual([]);
   });

   it('adds a notes', () => {
      const notes = new NotesModel();
      notes.addNote('Buy milk');

      expect(notes.getNotes()).toEqual(['Buy milk']);
   });

   it('resets the list of notes', () => {
      const notes = new NotesModel();
      notes.addNote('Buy milk');
      notes.reset();

      expect(notes.getNotes()).toEqual([]);
   });
});