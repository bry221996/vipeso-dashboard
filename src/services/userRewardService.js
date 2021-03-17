import Service from './service';

const resource = 'user_rewards';

export default {
  all(query = '') {
    return Service().get(`/api/v1/${resource}?include=game_reward,user,logs&page_size=10000&${query}`);
  },
};
