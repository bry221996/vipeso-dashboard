<template>
  <div class="card datatable__container">
    <div class="card-body">
      <table
        :ref="`${tableId}table`"
        :id="tableId"
        class="datatable__main display responsive cell-border"
        style="width:100%"
      >
        <thead>
          <tr>
            <th v-for="(header, index) in columns.header" :key="index">{{ header }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint no-param-reassign: "error" */
import 'datatables.net';
import 'datatables.net-responsive';

import { mapGetters } from 'vuex';

export default {
  name: 'Datatable',
  props: {
    tableId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    columns: {
      type: Object,
      default: () => ({
        header: [],
        record: [],
        defs: [],
      }),
    },
    additionalSearchColumns: {
      type: Array,
      default: () => [],
    },
    menuActions: {
      type: Array,
      default: () => [],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    orderable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loadingHtml() {
      let html = '<div class="loading">';
      for (let index = 1; index < 13; index += 1) {
        html += `<div class="loading__item loading__item-${index}"></div>`;
      }
      html += '</div>';

      return html;
    },
    ...mapGetters('auth', {
      token: 'token',
    }),
  },
  mounted() {
    this.render();
    this.registerActions();
  },
  methods: {
    render() {
      const THIS = this;
      $(`#${THIS.tableId}`)
        .on('preXhr.dt', (e, settings, data) => {
          if (data.order.length > 0) {
            const orderingColumn = data.columns[data.order[0].column];
            if (data.order[0].dir === 'asc') {
              data.sort = orderingColumn.data;
            } else {
              data.sort = `-${orderingColumn.data}`;
            }
          }
          data.filter = {};
          // <----- DATA FILTERING USED IN SEARCH ----->
          if (data.search.value) {
            data.columns.forEach((column) => {
              if (column.searchable) {
                data.filter[column.data] = data.search.value;
              }
            });
            if (THIS.additionalSearchColumns.length) {
              THIS.additionalSearchColumns.forEach((column) => {
                data.filter[column] = data.search.value;
              });
            }
          }
          // <----- DATA PAGINATION ----->
          if (data.start === 0) {
            data.page = 1;
          } else {
            data.page = data.start / data.length + 1;
          }
          data.page_size = data.length;
          delete data.columns;
        })
        .on('xhr.dt', (e, settings, json) => {
          json.recordsTotal = json.meta.total;
          json.recordsFiltered = json.meta.total;

          THIS.$emit('loaded', json);
        })
        .DataTable({
          asStripeClasses: [],
          ajax: {
            url: `${process.env.VUE_APP_API_URL}/${THIS.url}`,
            dataSrc: 'data',
            async: true,
            beforeSend(request) {
              request.setRequestHeader('Authorization', `Bearer ${THIS.token}`);
            },
          },
          bAutoWidth: false,
          responsive: true,
          processing: true,
          serverSide: true,
          lengthMenu: [5, 10, 15, 20],
          pageLength: 10,
          pagingType: 'numbers',
          language: {
            processing: THIS.loadingHtml,
            emptyTable: 'No data available.',
          },
          columns: THIS.columns.record,
          columnDefs: THIS.columns.defs,
          searching: THIS.searchable,
          ordering: THIS.orderable,
        });
    },
    registerActions() {
      this.menuActions.forEach((menu) => {
        $(`#${this.tableId}`).on('click', `.${menu}`, (event) => {
          this.$emit(
            menu,
            event.currentTarget.getAttribute('data-id'),
            event.currentTarget.getAttribute('data-data'),
          );
        });
      });
    },
    refresh() {
      $(`#${this.tableId}`)
        .DataTable()
        .ajax.reload();
    },
  },
};
</script>
