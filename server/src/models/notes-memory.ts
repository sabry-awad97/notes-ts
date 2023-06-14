import { Note, AbstractNotesStore, INote } from './Notes.js';

const notes = {} as { [key: string]: INote };

export class InMemoryNotesStore extends AbstractNotesStore {
  async update(key: string, title: string, body: string): Promise<INote> {
    notes[key] = new Note(key, title, body);
    return notes[key];
  }

  async create(key: string, title: string, body: string): Promise<INote> {
    notes[key] = new Note(key, title, body);
    return notes[key];
  }

  async read(key: string): Promise<INote> {
    if (notes[key]) {
      const { title, body } = notes[key];
      return { key, title, body } as INote;
    } else throw new Error(`Note ${key} does not exist`);
  }

  async destroy(key: string): Promise<INote> {
    if (notes[key]) {
      const note = notes[key];
      delete notes[key];
      return note;
    } else throw new Error(`Note ${key} does not exist`);
  }

  async keyList(): Promise<string[]> {
    return Object.keys(notes);
  }

  async count(): Promise<number> {
    let keyList = await this.keyList();
    return keyList.length;
  }

  async close(): Promise<void> {}
}
