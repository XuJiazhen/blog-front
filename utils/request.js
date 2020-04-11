import axios from 'axios'
import config from '../app.config'

const service = axios.create({
  baseURL: config.BASE_URL,
  timeout: 3000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
