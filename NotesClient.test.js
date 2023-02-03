const NotesClient = require('./NotesClient');

require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  it('calls fetch and loads data', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(
      JSON.stringify(['This note is coming from the server'])
      );

    client.loadNotes((notes) => {
      expect(notes[0]).toEqual('This note is coming from the server');

      done();
    });
  });
});
