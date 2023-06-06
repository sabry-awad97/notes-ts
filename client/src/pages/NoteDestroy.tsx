import React from 'react';
import { INote } from '../types';
interface Props {
  note?: INote;
}

const NoteDestroy: React.FC<Props> = ({ note }) => (
  <form method="POST" action="/notes/destroy/confirm">
    <input type="hidden" name="notekey" value={note ? note.key : ''} />
    <p>Delete {note && note.title}?</p>
    <br />
    <input type="submit" value="DELETE" />
    <a href={`/notes/view?key=${note && note.key}`}>Cancel</a>
  </form>
);

export default NoteDestroy;
