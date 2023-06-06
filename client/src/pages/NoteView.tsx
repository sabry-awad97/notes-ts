import React from 'react';
import { INote } from '../types';

interface Props {
  notekey: string;
  note: INote;
}

const NoteView: React.FC<Props> = ({ note, notekey }) => (
  <div>
    {note && <h3>{note.title}</h3>}
    {note && <p>{note.body}</p>}
    <p>Key: {notekey}</p>
    {notekey && (
      <>
        <hr />
        <p>
          <a href={`/notes/destroy?key=${notekey}`}>Delete</a> |{' '}
          <a href={`/notes/edit?key=${notekey}`}>Edit</a>
        </p>
      </>
    )}
  </div>
);

export default NoteView;
