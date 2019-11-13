import axios from 'axios';

const instance = axios.create(
  {
    baseURL: 'http://192.168.1.79:8000/rest-auth'
  }
)

export default instance;
