/* eslint-disable no-undef */
const isDev = process.env.NODE_ENV !== 'production';
export const PORT = isDev ? process.env.REACT_APP_PORT || 8080 : 80;
const developmentUrl = ''; // better use: "proxy": "http://localhost:8080", or `http://localhost:${PORT}` with { withCredentials: true } in axios
const productionUrl = window.location.origin;
export const HOST = isDev ? developmentUrl : productionUrl;
