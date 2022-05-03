//import { env } from 'process';
require('dotenv').config();

module.exports = {
  app_id: process.env.REACT_APP_APP_ID,
  app_key: process.env.REACT_APP_APP_KEY,
  api: process.env.REACT_APP_API,
};
