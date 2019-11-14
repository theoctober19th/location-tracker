import axios from 'axios';

const instance = axios.create(
  {
    baseURL: 'http://192.168.137.6:8000/rest-auth'
  }
)

export default instance;
