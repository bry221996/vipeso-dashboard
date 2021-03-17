import Service from './service';

const resource = 'tiers';

export default {
  show(id) {
    return Service().get(`api/v1/${resource}/${id}`);
  },

  update({ tierId, name, percentDiscount }) {
    return Service().put(`/api/v1/${resource}/${tierId}`, {
      name, percent_discount: percentDiscount,
    });
  },
};
