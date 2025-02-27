const axios = require('axios');
const { OPENAI_API_KEY } = require("../config/env")

const axiosInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
});

module.exports = axiosInstance;

