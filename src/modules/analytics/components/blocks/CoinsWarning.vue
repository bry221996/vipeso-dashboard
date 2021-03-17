<template>
  <div class="row mt-3">
    <div class="col">
      <d-alert show dismissible class="m-0" theme="danger">{{ message }}</d-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinsWarning',
  computed: {
    message() {
      return 'Hi Admin, CoinsPH Account Balance is below minimum threshold. RELOAD IMMEDIATELY!';
    },
  },
};
</script>
