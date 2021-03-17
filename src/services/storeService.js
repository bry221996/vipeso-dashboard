import Service from './service';

const resource = 'stores';

export default {
  fetch(query = '') {
    return Service().get(`api/v1/${resource}?${query}`);
  },

  show(id) {
    return Service().get(`/api/v1/${resource}/${id}`);
  },

  store(data) {
    return Service().post(`/api/v1/${resource}`, data);
  },

  update(storeId, params) {
    return Service().put(`/api/stores/${storeId}`, params);
  },

  fetchOrderAnalytics(storeId, start, end) {
    return Service().get(`/api/v1/${resource}/${storeId}/analytics/orders?start_date=${start}&end_date=${end}`);
  },

  fetchGameCouponsAnalytics(storeId) {
    return Service().get(`/api/v1/${resource}/${storeId}/analytics/coupons`);
  },

  addBusinessHours(storeId, params) {
    return Service().post(`/api/v1/${resource}/${storeId}/hours`, {
      hours: params,
    });
  },

  uploadLogo(storeId, file) {
    const form = new FormData();

    form.append('logo', file);

    return Service().post(`/api/stores/${storeId}/logo`, form);
  },

  uploadPhotos(storeId, photos) {
    const form = new FormData();

    photos.map(photo => form.append('images[]', photo.file));

    return Service().post(`/api/stores/${storeId}/photos`, form);
  },

  analytics(storeId) {
    return Service().get(`/api/v1/stores/${storeId}/analytics`);
  },

  orderAnalytics(storeId, start, end) {
    return Service().get(`/api/v1/stores/${storeId}/analytics/orders?start_date=${start}&end_date=${end}`);
  },

  gameCouponsAnalytics(storeId) {
    return Service().get(`/api/v1/stores/${storeId}/analytics/coupons`);
  },

};
