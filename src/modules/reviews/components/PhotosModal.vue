<template>
  <d-modal v-if="isShown" @close="close" centered>
    <div class="modal-header">
      <h5 class="modal-title">Review Photos</h5>
      <button aria-label="Close" class="close" @click="close">×</button>
    </div>

    <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <carousel :per-page="1" autoplay :autoplay-timeout="1000">
              <slide v-for="(photo, id) in review.photos" :key="id">
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <div class="square" :style="`background-image: url('${photo.image}')`"></div>
                  </div>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PhotosModal',
  data() {
    return {
      isShown: false,
    };
  },
  computed: {
    ...mapState('review', {
      review: 'selected',
    }),
  },
  methods: {
    show() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
  },
};
</script>
