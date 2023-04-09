import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage'
import axios from 'axios'

export const $api = axios.create({
  baseURL: __API__
})

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
  }
  return config
})
