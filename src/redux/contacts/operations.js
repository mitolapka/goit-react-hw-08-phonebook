import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://connections-api.herokuapp.com';

export const fetchAll = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      await axios.post(`${BASE_URL}/contacts`, contact);
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/contacts/${id}`);
      const response = await axios.get(`${BASE_URL}/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.config.method);
    }
  }
);

// export const editContact = createAsyncThunk(
//   'contacts/editContact',
//   async ({ id, contact }, thunkAPI) => {
//     try {
//       await axios.patch(`${BASE_URL}/contacts/${id}`, contact);
//       const response = await axios.get(`${BASE_URL}/contacts`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.config.method);
//     }
//   }
// );