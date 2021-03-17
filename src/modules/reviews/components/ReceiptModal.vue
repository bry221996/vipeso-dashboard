<template>
  <d-modal v-if="isShown" @close="close" centered>
    <div class="modal-header">
      <h5 class="modal-title">Review Receipt</h5>
      <button aria-label="Close" class="close" @click="close">×</button>
    </div>

    <div class="modal-body">
      <img :src="imageUrl" class="img-thumbnail img-fluid d-block mx-auto" />
    </div>
  </d-modal>
</template>

<script>
export default {
  name: 'ReceiptModal',
  data() {
    return {
      isShown: false,
      imageUrl: '',
    };
  },
  methods: {
    show(url) {
      this.imageUrl = url;
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
  },
};
</script>
