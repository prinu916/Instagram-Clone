import axios from 'axios';

const DEFAULT_BACKEND = 'http://localhost:4000';

export const getBackendBaseUrl = () => {
  const configured = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_URL;
  if (configured) return configured;

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return DEFAULT_BACKEND;
  }

  return '';
};

export const configureAxios = () => {
  const baseURL = getBackendBaseUrl();

  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;

  return baseURL;
};

export const getApiUrl = (path) => {
  const base = getBackendBaseUrl();
  if (!path) return base;
  if (!base) return path.startsWith('/') ? path : `/${path}`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return getApiUrl(imageUrl);
};

configureAxios();
