<template>
  <div class="image-upload__preview">
    <button type="button" class="btn-x-file" @click="removePhoto" v-if="buttons">
      <i translate="translate" class="material-icons notranslate">
        clear
      </i>
    </button>
    <div class="overlay"></div>
    <img :src="src" style="max-width: none; max-height: 100%;">
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    src: {
      default: '',
      type: String,
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removePhoto() {
      this.$emit('on-remove');
    },
  },
};
</script>
