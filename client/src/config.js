/* eslint-disable no-undef */
const PORT = process.env.REACT_APP_PORT || 8080;
const developmentUrl = `http://localhost:${PORT}`;
const productionUrl = window.location.origin;
export const HOST = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;
