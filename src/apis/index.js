import axios from 'axios'
import sconfig from './../config'

export default (token) => {
  var api = axios.create({
    // baseURL: "http://127.0.0.1:20000/config"
    baseURL: sconfig.api_url
  })
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return api
}