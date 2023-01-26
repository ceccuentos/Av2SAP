// require('dotenv').config()

// const axios = require('axios').default;

// module.exports = axios.create({
//     baseURL : 'https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details',
//     headers: {'api-key': process.env.KEYAV}

// })


//import axios from 'axios';
const axios = require('axios').default;

const customAxios = (dynamicBaseURL, dynamicHeader) => {
  // axios instance for making requests
  const axiosInstance = axios.create({
    baseURL: dynamicBaseURL,
    headers: {'api-key': dynamicHeader}
  });

  return axiosInstance;
};

module.exports= customAxios;