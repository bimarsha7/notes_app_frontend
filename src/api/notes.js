import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL + '/notes';

export const createNote = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw new Error(error);
  }
};

export const getAllNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data
  } catch (error) {
    console.error(`Error fetching notes`, error);
    throw new Error(error);
  }
}

export const updateNote = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error);
    throw new Error(error);
  }
}

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw new Error(error);
  }
};

export const sendNoteReminder = async (id, data) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/reminder`, data)
    return response.data
  } catch (error) {
    console.error(`Error sending reminder of note with ID ${id}:`, error);
    throw new Error(error);
  }
}
