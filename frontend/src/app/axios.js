import axios from 'axios'

const API_END_POINT = 'http://localhost:8080/api'

export const api = axios.create({
  baseURL: API_END_POINT
})
