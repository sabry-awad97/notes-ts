export interface INote {
  key: string;
  title: string;
  body: string;
}

export class Note implements INote {
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

  get JSON() {
    return JSON.stringify(
      {
        key: this.key,
        title: this.title,
        body: this.body,
      },
      null,
      4
    );
  }

  static fromJSON(json: string) {
    const data = JSON.parse(json);
    if (
      typeof data !== 'object' ||
      !data.hasOwnProperty('key') ||
      typeof data.key !== 'string' ||
      !data.hasOwnProperty('title') ||
      typeof data.title !== 'string' ||
      !data.hasOwnProperty('body') ||
      typeof data.body !== 'string'
    ) {
      throw new Error(`Not a Note: ${json}`);
    }
    const note = new Note(data.key, data.title, data.body);
    return note;
  }
}

export abstract class AbstractNotesStore {
  /**
   * Asynchronous method to update a note
   */
  abstract update(key: string, title: string, body: string): Promise<INote>;

  /**
   * Asynchronous method to create a new note
   */
  abstract create(key: string, title: string, body: string): Promise<INote>;

  /**
   * Asynchronous method to read a note
   */
  abstract read(key: string): Promise<INote>;

  /**
   * Asynchronous method to delete a note
   */
  abstract destroy(key: string): Promise<INote>;

  /**
   * Asynchronous method to retrieve a list of note keys
   */
  abstract keyList(): Promise<string[]>;

  /**
   * Asynchronous method to count the number of notes
   */
  abstract count(): Promise<number>;

  /**
   * Asynchronous method to close the connection to the database
   */
  abstract close(): Promise<void>;
}
