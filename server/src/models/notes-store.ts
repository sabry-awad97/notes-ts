import { default as DBG } from 'debug';
import { AbstractNotesStore } from './Notes';
const debug = DBG('notes:notes-store');
const error = DBG('notes:error-store');

let _NotesStore: AbstractNotesStore;

export async function useModel(model: string): Promise<AbstractNotesStore> {
  try {
    const NotesStoreModule = await import(`./notes-${model}.js`);
    debug(NotesStoreModule);
    const NotesStoreClass = NotesStoreModule.default;
    debug(NotesStoreClass);
    const name = NotesStoreClass.name;
    _NotesStore = new NotesStoreClass();
    return name;
  } catch (err) {
    error(err);
    throw new Error(`No recognized NotesStore in ${model} because ${err}`);
  }
}

export { _NotesStore as NotesStore };
