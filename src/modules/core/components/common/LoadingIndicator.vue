<template>
  <div class="loading">
    <div v-for="index in 12" :key="index" :class="`loading__item-${index}`" class="loading__item" />
  </div>
</template>

<script>
export default {
  name: 'LoadingIndicator',
};
</script>
