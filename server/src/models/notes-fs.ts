import { AbstractNotesStore, INote } from './Notes.js';

export default class FSNotesStore extends AbstractNotesStore {
  async update(key: string, title: string, body: string): Promise<INote> {
    throw new Error('Method not implemented.');
  }
  async create(key: string, title: string, body: string): Promise<INote> {
    throw new Error('Method not implemented.');
  }
  async read(key: string): Promise<INote> {
    throw new Error('Method not implemented.');
  }
  async destroy(key: string): Promise<INote> {
    throw new Error('Method not implemented.');
  }
  async keyList(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  async count(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async close(): Promise<void> {}
}
