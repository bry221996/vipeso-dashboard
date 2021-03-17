<template>
  <div class="card card-small">
    <!-- Card Header -->
    <div class="card-header border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </div>

    <div class="pt-0 card-body">
      <div class="border-bottom py-2 mb-3 bg-light row">
        <!-- Date Range -->
        <div class="col-12 col-sm-6 col-lg-8 d-flex mb-2 mb-sm-0">
          <d-input-group
            size="sm"
            class="date-range d-flex justify-content-left"
            v-if="dateOptions"
          >
            <d-datepicker
              v-model="dateRange.from"
              placeholder="Start Date"
              :disabled-dates="startDisabled"
              typeable
              small
              @input="fetchData"
            />
            <d-datepicker
              v-model="dateRange.to"
              placeholder="End Date"
              :disabled-dates="endDisabled"
              @input="fetchData"
              typeable
              small
            />
          </d-input-group>
        </div>

        <!-- Refresh Chart Data -->
        <div class="col-12 col-sm-6 col-lg-4">
          <button
            class="btn d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 btn-sm btn-primary"
            :disabled="isLoading"
            @click="fetchData"
            v-html="buttonHtml"
          ></button>
        </div>
      </div>

      <!-- Chart View -->
      <div class="row">
        <div class="col">
          <component :is="type" :chartData="datacollection" :styles="chartStyle" :legend="legend" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import LineChart from '../charts/LineChart.vue';
import BarChart from '../charts/BarChart.vue';
import Doughnut from '../charts/Doughnut.vue';

export default {
  name: 'ChartDisplay',

  components: {
    LineChart,
    BarChart,
    Doughnut,
  },

  props: {
    dateOptions: {
      type: Boolean,
      default: true,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Chart Title',
    },
    dataSets: {
      type: Array,
      default: () => [],
    },
    legend: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dateRange: {
        from: moment()
          .subtract(31, 'days')
          .toDate(),
        to: moment()
          .subtract(1, 'days')
          .toDate(),
      },
      isLoading: false,
    };
  },

  computed: {
    datacollection() {
      return {
        labels: this.labels,
        datasets: this.dataSets,
      };
    },
    buttonHtml() {
      return this.isLoading
        ? '<span class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...'
        : 'Refresh';
    },
    chartStyle() {
      return {
        height: '300px',
        position: 'relative',
      };
    },
    startDisabled() {
      return {
        to: new Date(2017, 12, 1),
        from: this.dateRange.to,
      };
    },
    endDisabled() {
      return {
        from: moment()
          .subtract(1, 'days')
          .toDate(),
        to: this.dateRange.from,
      };
    },
    start() {
      return moment(this.dateRange.from).format('YYYY-MM-DD');
    },
    end() {
      return moment(this.dateRange.to).format('YYYY-MM-DD');
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.isLoading = true;

      const data = {
        start: this.start,
        end: this.end,
      };

      this.$emit('on-fetch', data);
    },
    doneLoading() {
      this.isLoading = false;
    },
  },
};
</script>
