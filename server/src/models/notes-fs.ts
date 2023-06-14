import path from 'path';
import fs from 'fs/promises';
import { __dirname as approotdir } from '../approotdir.js';
import { INote, Note, AbstractNotesStore } from './Notes.js';
import { default as DBG } from 'debug';
const debug = DBG('notes:notes-fs');
const error = DBG('notes:error-fs');

export default class FSNotesStore extends AbstractNotesStore {
  async update(key: string, title: string, body: string): Promise<INote> {
    if (key.indexOf('/') >= 0) {
      throw new Error(`key '${key}' cannot contain '/'`);
    }
    const dir = await notesDir();
    const file = path.join(dir, `${key}.json`);
    const note = new Note(key, title, body);
    const data = note.JSON;
    await fs.writeFile(file, data);
    debug(`WRITE ${file} ${data}`);
    return note;
  }
  async create(key: string, title: string, body: string): Promise<INote> {
    if (key.indexOf('/') >= 0) {
      throw new Error(`key '${key}' cannot contain '/'`);
    }
    const dir = await notesDir();
    const file = path.join(dir, `${key}.json`);
    const note = new Note(key, title, body);
    const data = note.JSON;
    await fs.writeFile(file, data);
    debug(`WRITE ${file} ${data}`);
    return note;
  }
  async read(key: string): Promise<INote> {
    const dir = await notesDir();
    const filePath = path.join(dir, `${key}.json`);
    const note = await readJSON(filePath);
    return note;
  }
  async destroy(key: string): Promise<INote> {
    const dir = await notesDir();
    const filePath = path.join(dir, `${key}.json`);
    const note = await readJSON(filePath);
    await fs.unlink(filePath);
    return note;
  }
  async keyList(): Promise<string[]> {
    const dir = await notesDir();
    const files = await fs.readdir(dir);
    const keys = files.map(file => path.parse(file).name);
    return keys;
  }
  async count(): Promise<number> {
    const dir = await notesDir();
    const files = await fs.readdir(dir);
    return files.length;
  }
  async close(): Promise<void> {}
}

async function readJSON(filePath: string) {
  const data = await fs.readFile(filePath, 'utf8');
  const note = Note.fromJSON(data);
  return note;
}

async function notesDir() {
  const dir =
    process.env.NOTES_FS_DIR || path.join(approotdir, '..', 'data', 'notes-fs');
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
