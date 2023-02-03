/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');
jest.mock('./notesClient')

describe('Notes view', () => {
  beforeEach(() => {
    NotesClient.mockClear();
  });

  it('displays two notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    // 1. Setting up model and view
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('A first note');
    model.addNote('Another one');
    
    // 2. Display the notes on the page
    view.displayNotes();

    // 3. There should now be 2 div.note on the page
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('adds a new note', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  
    const model = new NotesModel();
    const view = new NotesView(model);
  
    // 1. Fill the input
    const input = document.querySelector('#add-note-input');
    input.value = 'My new amazing test note';
  
    // 2. Click the button
    const button = document.querySelector('#add-note-btn');
    button.click();
  
    // 3. The note should be on the page
    expect(document.querySelectorAll('div.note').length).toEqual(1);
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual('My new amazing test note');
  });

  it('clears the list of previous notes before displaying', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('one');
    model.addNote('two');

    view.displayNotes();
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

    it('displays notes from Api', (done) => {
      document.body.innerHTML = fs.readFileSync('./index.html');

      const mockClient = new NotesClient();
      const model = new NotesModel();
      const view = new NotesView(model, mockClient);

      mockClient.loadNotes.mockImplementation((callback) => {
        callback(["This note is coming from the server"]);
      });
      
      view.displayNotesFromApi();
      expect(document.querySelectorAll("div.note").length).toEqual(1);
      expect(document.querySelectorAll("div.note")[0].textContent).toBe(
        "This note is coming from the server"
      );

      expect(mockClient.loadNotes).toHaveBeenCalledTimes(1);
      expect(model.getNotes()).toEqual(["This note is coming from the server"]);
      done();
    });
  });
 