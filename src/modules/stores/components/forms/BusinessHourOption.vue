<template>
  <div class="form-row">
    <div class="form-group col-lg-2 d-flex justify-content-end align-items-center">
      <label class="form-label"></label>
      <d-checkbox class="mt-4 mr-3" :checked="isChecked" @input="onCBoxChange"></d-checkbox>
    </div>

    <div class="form-group col-lg-5">
      <label class="form-label text-capitalize">{{ day }}</label>
      <time-picker
        class="opening mr-1"
        ref="opening"
        data-type="opening"
        :disabled="! isChecked"
        :data-day="day"
        @input="onOpeningInput"
      ></time-picker>
    </div>

    <div class="form-group col-lg-5">
      <label for></label>
      <time-picker
        class="closing mr-1"
        ref="closing"
        data-type="closing"
        :disabled="! isChecked"
        :data-day="day"
        @input="onClosingInput"
      ></time-picker>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import TimePicker from '../TimePicker.vue';

export default {
  name: 'BusinessHourOption',
  props: {
    day: {
      type: String,
      required: true,
    },
  },
  components: {
    TimePicker,
  },
  data() {
    return {
      enabled: false,
      closing: {
        time: null,
        min: null,
      },
    };
  },
  computed: {
    ...mapState('store', {
      form: 'form',
    }),
    isEditing() {
      return this.$route.name === 'edit-store';
    },
    isChecked() {
      return this.form.store_hours.some(
        hour => hour.day.toLowerCase() === this.day.toLowerCase(),
      );
    },
    dayReference() {
      return this.form.store_hours.find(
        hour => hour.day.toLowerCase() === this.day.toLowerCase(),
      );
    },
    dayReferenceIndex() {
      return this.form.store_hours.findIndex(
        hour => hour.day.toLowerCase() === this.day.toLowerCase(),
      );
    },
  },
  methods: {
    onCBoxChange(checked) {
      if (this.dayReferenceIndex < 0) {
        const storeHours = [...this.form.store_hours];
        if (checked) {
          storeHours.push({ day: this.day, opening: null, closing: null });
        } else {
          const index = storeHours.findIndex(
            hour => hour.day.toLowerCase() === this.day.toLowerCase(),
          );
          storeHours.splice(index, 1);
        }
        this.$store.commit('store/SET_STORE_HOURS', storeHours);
      }
    },

    onOpeningInput(value) {
      this.$refs.closing.setDirty();

      this.commitChanges('opening', value);
      this.$refs.closing.setDirty();
      this.autoFillClosing(value);
    },

    onClosingInput(value) {
      this.commitChanges('closing', value);
    },

    autoFillClosing(value) {
      const splitted = value.split(':');
      const closingTime = moment()
        .hour(splitted[0])
        .minute(splitted[1])
        .add(15, 'm')
        .second(0)
        .format('HH:mm:ss');

      this.commitChanges('closing', closingTime);
    },

    commitChanges(key, value) {
      const hour = Object.assign({}, this.dayReference);
      hour[key] = value;

      this.$store.commit('store/SET_SPECIFIC_STORE_HOUR', {
        index: this.dayReferenceIndex,
        hour,
      });
    },
  },
};
</script>
