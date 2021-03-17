<template>
  <d-modal v-if="isShown" @close="close" centered>
    <div class="modal-header">
      <h5 class="modal-title">Edit Versions</h5>
      <button aria-label="Close" class="close" @click="close">×</button>
    </div>

    <div class="modal-body">
      <form>
        <template v-for="app in apps">
          <div class="form-row" :key="`${app.title}-header`">
            <h6 class="text-capitalize">{{ app.title }} App</h6>
          </div>
          <div class="form-row" :key="`${app.title}-form`">
            <div class="form-group col-6">
              <label class="form-label">Android</label>
              <input
                class="form-control"
                v-validate="'required'"
                :id="app.versions.android.app_id"
                :name="`${app.title}.android`"
                :value="app.versions.android.version"
                @input="onVersionInput"
              />
            </div>

            <div class="form-group col-6">
              <label class="form-label">IOS</label>
              <input
                class="form-control"
                v-validate="'required'"
                :id="app.versions.ios.app_id"
                :name="`${app.title}.ios`"
                :value="app.versions.ios.version"
                @input="onVersionInput"
              />
            </div>
          </div>
        </template>

        <div class="form-row justify-content-end">
          <button class="btn btn-light mr-2" @click.prevent="close">Cancel</button>
          <submit-button
            :is-disabled="isButtonDisable"
            ref="button"
            class="btn-primary"
            submit-text="Updating"
            @click="onFormSubmit"
          >Update</submit-button>
        </div>
      </form>
    </div>
  </d-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SubmitButton from '../../core/components/common/SubmitButton.vue';

export default {
  name: 'EditModal',
  components: {
    SubmitButton,
  },
  props: {
    tierId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isShown: false,
      formValid: true,
    };
  },
  computed: {
    ...mapState('version', {
      form: 'form',
    }),
    ...mapGetters('version', {
      isFormDirty: 'isFormDirty',
    }),
    isButtonDisable() {
      return !this.formValid || !this.isFormDirty;
    },
    apps() {
      return [
        {
          title: 'customer',
          versions: {
            android: this.form[0],
            ios: this.form[1],
          },
        },
        {
          title: 'merchant',
          versions: {
            android: this.form[2],
            ios: this.form[3],
          },
        },
      ];
    },
  },
  methods: {
    show() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
    onVersionInput(e) {
      const { id, value } = e.target;
      const index = this.form.findIndex(form => form.app_id === Number(id));

      const version = {
        app_id: Number(id),
        version: value,
      };

      this.$store.commit('version/UPDATE_VERSION', { index, version });

      this.validate();
    },
    validate() {
      this.$validator.validateAll().then((valid) => {
        this.formValid = valid;
      });
    },
    async onFormSubmit() {
      await this.$store.dispatch('version/update');
      this.$refs.button.doneSubmit();
      this.$emit('updated');
      this.close();
    },
  },
};
</script>
