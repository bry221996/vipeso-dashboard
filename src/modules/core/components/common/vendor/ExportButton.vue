<template>
  <json-excel
    :fetch="fetchData"
    :fields="columns"
    :name="fileName"
    :before-generate="startExport"
    :before-finish="finishExport"
  >
    <button
      class="btn btn-outline-info btn-pill px-5"
      :disabled="isExporting"
      v-html="exportButtonHtml"
    ></button>
  </json-excel>
</template>

<script>
import JsonExcel from 'vue-json-excel/JsonExcel.vue';

export default {
  name: 'ExportButton',
  // Component Properties
  props: {
    columns: {
      type: Object,
      required: true,
    },
    service: {
      required: true,
    },
    fileName: {
      type: String,
      default: 'data.xls',
    },
    query: {
      type: String,
      default: '',
    },
  },
  // Component Data
  data() {
    return {
      isExporting: false,
    };
  },
  // Component sub-components
  components: {
    JsonExcel,
  },
  // Component computed properties
  computed: {
    exportButtonHtml() {
      return this.isExporting
        ? '<span class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Exporting...'
        : 'Export as Excel';
    },
  },
  // Component Methods
  methods: {
    async fetchData() {
      const response = await this.service.all(this.query);

      return response.data.data;
    },
    startExport() {
      this.isExporting = true;
    },
    finishExport() {
      this.isExporting = false;
    },
  },
};
</script>
