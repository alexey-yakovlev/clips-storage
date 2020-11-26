/* eslint-disable no-undef */
const PORT = process.env.REACT_APP_PORT || 8080;
const developmentUrl = ''; // better use: "proxy": "http://localhost:8080", or `http://localhost:${PORT}` with { withCredentials: true } in axios
const productionUrl = window.location.origin;
export const HOST = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;
