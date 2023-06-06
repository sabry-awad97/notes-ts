import { Note, AbstractNotesStore } from './Notes.js';

const notes = {} as { [key: string]: Note };

export class InMemoryNotesStore extends AbstractNotesStore {
  async update(key: string, title: string, body: string) {
    notes[key] = new Note(key, title, body);
    return notes[key];
  }

  async create(key: string, title: string, body: string) {
    notes[key] = new Note(key, title, body);
    return notes[key];
  }

  async read(key: string) {
    if (notes[key]) {
      return notes[key];
    } else throw new Error(`Note ${key} does not exist`);
  }

  async destroy(key: string) {
    if (notes[key]) {
      delete notes[key];
    } else throw new Error(`Note ${key} does not exist`);
  }

  async keyList() {
    return Object.keys(notes);
  }

  async count() {
    let keyList = await this.keyList();
    return keyList.length;
  }
}
