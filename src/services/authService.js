import Service from './service';

export default {
  login({ username, password }) {
    const params = {
      grant_type: 'password',
      client_id: process.env.VUE_APP_API_KEY,
      client_secret: process.env.VUE_APP_API_SECRET,
      username,
      password,
      scope: '',
    };

    return Service().post('/oauth/token', params);
  },

  current() {
    return Service().get('/api/users/current');
  },
};
