<template>
  <flat-pickr
    class="form-control"
    :value="time"
    :config="config"
    :disabled="$attrs.disabled"
    @on-change="emitOnChange"
  ></flat-pickr>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { mapState } from 'vuex';

export default {
  name: 'TimePicker',
  components: {
    flatPickr,
  },
  data() {
    return {
      dirty: false,
    };
  },
  computed: {
    ...mapState('store', {
      form: 'form',
    }),
    config() {
      return {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i:S',
        minuteIncrement: 15,
        time_24hr: true,
      };
    },
    hourReference() {
      return this.form.store_hours.find(
        hour => hour.day.toLowerCase() === this.$attrs['data-day'].toLowerCase(),
      );
    },
    dayAttribute() {
      return this.$attrs['data-day'];
    },
    typeAttribute() {
      return this.$attrs['data-type'];
    },
    time() {
      return this.hourReference ? this.hourReference[this.typeAttribute] : null;
    },
  },
  methods: {
    emitOnChange(time, dateStr) {
      const value = this.dirty ? dateStr : '12:00:00';
      this.dirty = true;
      this.$emit('input', value);
    },
    setDirty() {
      this.dirty = true;
    },
  },
};
</script>
