import axios from 'axios'
import sconfig from './../config'

export default (token) => {
  var api = axios.create({
    // baseURL: "http://dwdev.info"
    baseURL: sconfig.auth_url
    // baseURL: sconfig.api_url
  })
  return api
}