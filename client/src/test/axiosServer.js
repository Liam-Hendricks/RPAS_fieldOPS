const axios = require('axios');

const axiosInstance = axios.default.create({
    baseURL: 'http://localhost:8080'
});

module.exports = axiosInstance;