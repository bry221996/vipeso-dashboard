<template>
  <d-modal v-if="isShown" @close="close" centered>
    <div class="modal-header">
      <h5 class="modal-title">Edit Tier Settings</h5>
      <button aria-label="Close" class="close" @click="close">×</button>
    </div>

    <div class="modal-body">
      <form>
        <div class="form-group">
          <label class="form-label">Name</label>
          <input
            name="name"
            class="form-control"
            v-validate="'required'"
            :value="form.name"
            @input="updateForm"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Minimum Points</label>
          <input class="form-control" type="number" :value="form.minimum_points" disabled />
        </div>

        <div class="form-group">
          <label class="form-label">Maximum Points</label>
          <input class="form-control" type="number" :value="form.maximum_points" disabled />
        </div>

        <div class="form-group">
          <label class="form-label">Percent Discount</label>
          <input
            name="percent_discount"
            class="form-control"
            type="number"
            v-validate="'required'"
            :value="form.percent_discount"
            @input="updateForm"
          />
        </div>

        <div class="form-row justify-content-end">
          <button class="btn btn-light mr-2" @click.prevent="close">Cancel</button>
          <submit-button
            :is-disabled="isButtonDisable"
            ref="button"
            class="btn-primary"
            submit-text="update"
            @click="onFormSubmit"
          >Update</submit-button>
        </div>
      </form>
    </div>
  </d-modal>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState('tier', {
      form: 'form',
      tier: 'selected',
    }),
    isButtonDisable() {
      return !this.formValid || this.isUnchanged;
    },
    isUnchanged() {
      return (
        this.form.name === this.tier.name
        && this.form.percent_discount === this.tier.percent_discount
      );
    },
  },
  methods: {
    show() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
      this.$store.commit('tier/SET_FORM', {});
      this.$store.commit('tier/SET_SELECTED', {});
    },
    updateForm(e) {
      const { value, name } = e.target;
      const form = Object.assign({}, this.form);

      form[name] = value;
      this.$store.commit('tier/SET_FORM', form);

      this.validate();
    },
    validate() {
      this.$validator.validateAll().then((valid) => {
        this.formValid = valid;
      });
    },
    async onFormSubmit() {
      await this.$store.dispatch('tier/updateDetails');
      this.$emit('updated');
      this.close();
    },
  },
};
</script>
