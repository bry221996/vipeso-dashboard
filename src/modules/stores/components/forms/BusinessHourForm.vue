<template>
  <div class="business-hours">
    <business-hour-option v-for="day in days" :key="day" :day="day"></business-hour-option>
  </div>
</template>

<script>
import BusinessHourOption from './BusinessHourOption.vue';

export default {
  name: 'BusinessHourForm',
  data() {
    return {
      days: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    };
  },
  components: {
    BusinessHourOption,
  },
};
</script>
