import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
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
