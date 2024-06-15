import axios from 'axios';

const baseURL = 'https://assignment-todolist-api.vercel.app/api/tacowasabii';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
