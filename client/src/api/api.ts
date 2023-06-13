import axios from 'axios';
import type { INote } from '../types';

const baseURL = '';

const api = axios.create({ baseURL });

enum NoteAPI {
  GET_NOTES = '/notes',
  SAVE_NOTE = '/notes/save/',
  UPDATE_NOTE = '/notes/save/:key',
  READ_NOTE = '/notes/view?key=:key',
  DELETE_NOTE = '/notes/destroy',
}

export const getNotes = async () => {
  let response = await api.get<{ notes: INote[] }>(NoteAPI.GET_NOTES);
  return response.data;
};

export const saveNote = async (note: INote) => {
  let response = await api.post<INote>(NoteAPI.SAVE_NOTE, note);
  return response.data;
};

export const updateNote = async (data: INote) => {
  const { key } = data;
  let response = await api.put<INote>(
    NoteAPI.UPDATE_NOTE.replace(':key', key),
    data
  );
  return response.data;
};

export const readNote = async (key: string) => {
  let response = await api.get<INote>(NoteAPI.READ_NOTE.replace(':key', key));
  return response.data;
};

export const deleteNote = async (key: string) => {
  const response = await api.delete(NoteAPI.DELETE_NOTE, {
    params: {
      key,
    },
  });
  return response.data;
};
