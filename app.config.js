export default {
  BASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'http://120.27.63.13:8130/'
      : 'http://localhost:8130/'
}
