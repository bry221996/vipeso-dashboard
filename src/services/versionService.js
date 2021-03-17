import Service from './service';

export default {
  updateBulk(params) {
    return Service().put('api/v1/versions/sync', { versions: params });
  },
};
