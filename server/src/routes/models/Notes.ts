export class Note {
  private _note_key: string;
  private _note_title: string;
  private _note_body: string;

  constructor(key: string, title: string, body: string) {
    this._note_key = key;
    this._note_title = title;
    this._note_body = body;
  }

  get key() {
    return this._note_key;
  }

  get title() {
    return this._note_title;
  }

  set title(newTitle: string) {
    this._note_title = newTitle;
  }

  get body() {
    return this._note_body;
  }

  set body(newBody: string) {
    this._note_body = newBody;
  }
}

export abstract class AbstractNotesStore {
  /**
   * Asynchronous method to update a note
   */
  abstract update(key: string, title: string, body: string): Promise<Note>;

  /**
   * Asynchronous method to create a new note
   */
  abstract create(key: string, title: string, body: string): Promise<Note>;

  /**
   * Asynchronous method to read a note
   */
  abstract read(key: string): Promise<Note>;

  /**
   * Asynchronous method to delete a note
   */
  abstract destroy(key: string): Promise<void>;

  /**
   * Asynchronous method to retrieve a list of note keys
   */
  abstract keyList(): Promise<string[]>;

  /**
   * Asynchronous method to count the number of notes
   */
  abstract count(): Promise<number>;
}
