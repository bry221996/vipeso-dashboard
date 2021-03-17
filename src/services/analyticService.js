import Service from './service';

const resource = 'analytics';

export default {
  get() {
    return Service().get(`api/v1/${resource}`);
  },

  show(entity, startDate, endDate) {
    return Service().get(`api/v1/${resource}/${entity}?start_date=${startDate}&end_date=${endDate}`);
  },

  getCoinsBalance() {
    return Service().get('api/v1/coinsph/balance');
  },
};
