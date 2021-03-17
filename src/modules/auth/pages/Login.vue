<template>
  <div class="row h-100 no-gutters">
    <div class="auth-form mx-auto my-auto col-md-5 col-lg-3 col-md-6 col-sm-8 col-11">
      <div class="card">
        <div class="card-body">
          <img
            src="@/assets/images/vipeso.png"
            alt="Vipeso Dashboard - Login"
            class="auth-form__logo d-table mx-auto mb-3"
          />
          <h5 class="auth-form__title text-center mb-4">Access Your Account</h5>

          <form class>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                :value="form.username"
                name="username"
                placeholder="Enter username"
                class="form-control"
                v-validate="'required'"
                @input="updateForm"
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                :value="form.password"
                name="password"
                type="password"
                placeholder="Password"
                class="form-control"
                v-validate="'required'"
                @input="updateForm"
              />
            </div>

            <submit-button
              :is-disabled="!formValid"
              ref="button"
              class="btn-pill btn-accent d-table mx-auto"
              submit-text="Accessing"
              @click="onFormSubmit"
            >Access Account</submit-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SubmitButton from '../../core/components/common/SubmitButton.vue';

export default {
  name: 'Login',

  components: {
    SubmitButton,
  },

  data() {
    return {
      formValid: false,
    };
  },

  computed: {
    ...mapState('auth', {
      form: 'form',
      current: 'user',
    }),
  },

  methods: {
    updateForm(e) {
      const form = Object.assign({}, this.form);
      form[e.target.name] = e.target.value;
      this.$store.commit('auth/SET_FORM', form);

      this.$validator.validateAll().then((valid) => {
        this.formValid = valid;
      });
    },
    async onFormSubmit() {
      try {
        await this.$store.dispatch('auth/attemptLogin');
        const user = await this.$store.dispatch('auth/getCurrentUser');

        if (this.$store.getters['auth/hasAccess']) {
          const currentStoreId = user.roles[0].pivot.store_id;
          await this.$store.dispatch('auth/getCurrentStore', currentStoreId);
          this.$store.commit('auth/SET_FORM', {});
          this.$toast.success('Login Succesful');
          this.$router.push('/analytics');
        } else {
          this.$store.commit('auth/SET_USER', {});
          this.$store.commit('auth/SET_PASSPORT', {});
          this.$toast.error('Account dont have an access');
        }
      } catch (error) {
        this.$toast.error('Invalid Credentials');
      }
      this.$refs.button.doneSubmit();
    },
  },
};
</script>
