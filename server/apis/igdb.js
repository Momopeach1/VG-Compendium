const axios = require('axios');

module.exports = (auth, req) => axios.create({
  baseURL:'https://api.igdb.com/v4',
  headers: { 
    'Client-ID': process.env.IGDBID,
    'Authorization': auth,
    'Content-Type': 'text/plain',
    'Content-Length': 0,
  },
  data: req
});