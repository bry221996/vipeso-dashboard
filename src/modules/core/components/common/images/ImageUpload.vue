<template>
  <div class="image-upload d-block">

    <div class="image-upload__input" @change="onChange" v-if="! imageUrl">
      <input type="file" accept="image/*" ref="input">
      <span class="text-input">
        <slot></slot>
      </span>
    </div>
    <image-preview :src="imageUrl" buttons v-else @on-remove="removeImage"></image-preview>
  </div>
</template>

<script>
import ImagePreview from './ImagePreview.vue';

export default {
  name: 'ImageUpload',
  components: {
    ImagePreview,
  },
  props: {
    width: {
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      image: null,
      imageUrl: null,
    };
  },
  methods: {
    /**
     * Listen on change input image.
     */
    onChange(e) {
      if (!e.target.files.length) return;

      this.image = e.target.files[0];

      this.$emit('change', this.image);

      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURI = event.target.result;
        if (dataURI) {
          this.imageUrl = dataURI;
        }
      };

      reader.readAsDataURL(this.image);
    },

    /**
     * On remove image.
     */
    removeImage() {
      this.image = null;
      this.imageUrl = null;
      if (this.$refs.input) {
        this.$refs.input.value = null;
      }
      this.$emit('change', this.image);
    },

    setImage(url) {
      this.imageUrl = url;
    },
  },
};
</script>
