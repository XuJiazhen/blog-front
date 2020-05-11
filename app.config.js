export default {
  BASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.xujiazhen.website/api/'
      : 'http://localhost:8130/api/'
}
