<template>
  <button
    :disabled="isDisabled || isSubmiting"
    type="submit"
    class="btn"
    v-html="htmlDisplay"
    @click.prevent="onSubmit"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    isDisabled: {
      type: Boolean,
      default: true,
    },
    submitText: {
      type: String,
      default: 'Submitting',
    },
  },
  data() {
    return {
      isSubmiting: false,
    };
  },
  computed: {
    htmlDisplay() {
      return this.isSubmiting
        ? `<span class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>${this.submitText}`
        : `${this.text}`;
    },
    text() {
      return this.$slots.default[0].text;
    },
  },
  methods: {
    onSubmit() {
      this.isSubmiting = true;
      this.$emit('click');
    },
    doneSubmit() {
      this.isSubmiting = false;
    },
  },
};
</script>
