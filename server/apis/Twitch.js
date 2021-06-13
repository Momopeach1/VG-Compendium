const axios = require('axios');

module.exports = axios.create({
  baseURL:'https://id.twitch.tv/oauth2/token',
  params: { 
    client_id: process.env.IGDBID,
    client_secret: process.env.IGDBSECRET,
    grant_type: 'client_credentials'
}});