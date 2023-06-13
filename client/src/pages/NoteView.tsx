import React, { useEffect, useState } from 'react';
import { INote } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { readNote } from '../api/api';

interface Props {}

const NoteView: React.FC<Props> = () => {
  const [note, setNote] = useState<INote | null>(null);
  const [noteKey, setNoteKey] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const key = searchParams.get('key');
    setNoteKey(key);

    const getNote = async () => {
      if (key) {
        const note = await readNote(key);
        setNote(note);
      }
    };

    getNote();
  }, []);

  return (
    <div>
      {note && <h3>{note.title}</h3>}
      {note && <p>{note.body}</p>}
      <p>Key: {noteKey}</p>
      {noteKey && (
        <>
          <hr />
          <p>
            <Link to={`/notes/destroy?key=${noteKey}`}>Delete</Link> |{' '}
            <Link to={`/notes/edit?key=${noteKey}`}>Edit</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default NoteView;
