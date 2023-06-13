import React, { useEffect, useState } from 'react';
import { INote } from '../types';
import Header from './Header';
import { getNotes } from '../api/api';
import { Link } from 'react-router-dom';

interface Props {}

const Index: React.FC<Props> = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    getNotes().then(({ notes }) => {
      setNotes(notes);
    });
  }, []);

  return (
    <>
      <Header title="Notes" />
      <ul>
        {notes.map(note => (
          <li key={note.key}>
            {note.key}:{' '}
            <Link to={`/notes/view?key=${note.key}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Index;
