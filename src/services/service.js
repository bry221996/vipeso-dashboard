import axios from 'axios';

export default () => {
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
  });

  service.defaults.headers.common['Content-Type'] = 'application/json';
  service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  if ('passport' in localStorage) {
    const token = JSON.parse(localStorage.getItem('passport')).access_token;
    service.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return service;
};
