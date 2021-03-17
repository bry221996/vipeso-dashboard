import Service from './service';

const resource = 'reviews';

export default {
  show(id) {
    return Service().get(`api/v1/${resource}/${id}?include=user,store,photos`);
  },

  verifyReview(id, rewardValue) {
    return Service().put(`/api/v1/${resource}/${id}/verify`, { reward_value: rewardValue });
  },
};
