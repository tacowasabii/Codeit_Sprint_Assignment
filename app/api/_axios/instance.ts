import axios from 'axios';

// axios instance
const baseURL = 'https://assignment-todolist-api.vercel.app/api/tacowasabii';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
