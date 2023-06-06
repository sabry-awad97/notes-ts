import React from 'react';
import { INote } from '../types';

interface Props {
  noteList: INote[];
}

const Index: React.FC<Props> = ({ noteList }) => (
  <ul>
    {noteList.map(note => (
      <li key={note.key}>
        {note.key}: <a href={`/notes/view?key=${note.key}`}>{note.title}</a>
      </li>
    ))}
  </ul>
);

export default Index;
