import axios from 'axios';
import type { INote } from '../types';

const baseURL = import.meta.env.DEV ? 'http://localhost:3000' : '';

const api = axios.create({ baseURL });

export const getNotes = async () => {
  let response = await api.get<{ notes: INote[] }>('/');
  return response.data;
};

export const saveNote = async (note: INote) => {
  let response = await api.post<INote>('/notes/save/', note);
  return response.data;
};

export const updateNote = async (data: INote) => {
  const { key } = data;
  let response = await api.put<INote>(`/notes/save/${key}`, data);
  return response.data;
};

export const readNote = async (key: string) => {
  let response = await api.get<INote>(`/notes/view?key=${key}`);
  return response.data;
};

export const deleteNote = async (key: string) => {
  const response = await api.delete('/notes/destroy', {
    params: {
      key,
    },
  });
  return response.data;
};
