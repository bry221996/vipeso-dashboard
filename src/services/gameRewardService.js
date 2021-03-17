import Service from './service';

export default {
  all(query = '') {
    return Service().get(`/api/v1/games/1/rewards?page_size=100&${query}`);
  },

  show(id) {
    return Service().get(`/api/v1/games/1/rewards/${id}`);
  },

  store(params) {
    return Service().post('/api/v1/games/1/rewards', params);
  },

  uploadLogo(file, type, id) {
    const form = new FormData();
    form.append('image', file);

    return Service().post(`/api/v1/${type}/${id}/logo`, form);
  },

  uploadBanner(file, type, id) {
    const form = new FormData();
    form.append('image', file);

    return Service().post(`/api/v1/${type}/${id}/banner`, form);
  },
};
