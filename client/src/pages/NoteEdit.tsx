import React from 'react';
import { INote } from '../types';

interface Props {
  docreate: 'create' | 'update';
  note: INote;
}

const NoteEdit: React.FC<Props> = ({ docreate, note }) => (
  <form method="POST" action="/notes/save">
    <input
      type="hidden"
      name="docreate"
      value={docreate ? 'create' : 'update'}
    />
    <p>
      Key: {docreate ? <input type="text" name="notekey" value="" /> : note.key}
      <input type="hidden" name="notekey" value={note ? note.key : ''} />
    </p>
    <p>
      Title: <input type="text" name="title" value={note ? note.title : ''} />
    </p>
    <br />
    <textarea rows={5} cols={40} name="body" value={note ? note.body : ''} />
    <br />
    <input type="submit" value="Submit" />
  </form>
);

export default NoteEdit;
