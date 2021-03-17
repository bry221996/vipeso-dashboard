<template>
  <carousel :per-page="4" autoplay :autoplay-timeout="1000">
    <template v-if="! isEmpty">
      <slide v-for="(image, index) in images" :key="index">
        <image-preview
          :src="image.url"
          :buttons="'file' in image"
          @on-remove="removeImage(index)">
        </image-preview>
      </slide>
    </template>

    <slide>
      <div class="image-upload__input" @change="onChange">
        <input type="file" accept="image/*" ref="input" />
        <span class="text-input">
          <slot></slot>
        </span>
      </div>
    </slide>
  </carousel>
</template>

<script>
import ImagePreview from './ImagePreview.vue';

export default {
  name: 'MultiImageUpload',
  components: {
    ImagePreview,
  },
  data() {
    return {
      images: [],
    };
  },
  computed: {
    isEmpty() {
      return this.images.length === 0;
    },
  },
  methods: {
    /**
     * Listen on change input image.
     */
    onChange(e) {
      if (!e.target.files.length) return;

      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURI = event.target.result;
        if (dataURI) {
          this.images.push({ file, url: dataURI });

          this.$emit('change', this.images);
        }
      };

      reader.readAsDataURL(file);
    },

    /**
     * On remove image.
     */
    removeImage(i) {
      if (this.$refs.input) {
        this.$refs.input.value = null;
      }
      this.images.splice(i, 1);

      this.$emit('change', this.images);
    },

    setImages(images) {
      const imageCopy = [...images];
      this.images = imageCopy;
    },
  },
};
</script>
