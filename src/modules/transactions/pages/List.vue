<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Transactions</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table table-id="staffs" url="transactions" :columns="columns"></data-table>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'Transactions',
  components: {
    DataTable,
  },
  computed: {
    columns() {
      return {
        header: [
          'ID',
          'Sender',
          'S.Credits',
          'Type',
          'Receiver',
          'R.Credits',
          'Amount',
          'Date',
        ],
        record: [
          { data: 'transaction_id', searchable: true, orderable: true },
          { data: 'sender', searchable: false, orderable: false },
          { data: 'sender_credits', searchable: false, orderable: false },
          { data: 'transaction_type', searchable: false, orderable: false },
          { data: 'receiver', searchable: false, orderable: false },
          { data: 'receiver_credits', searchable: false, orderable: false },
          { data: 'amount', searchable: false, orderable: true },
          { data: 'created_at', searchable: false, orderable: true },
        ],
        defs: [
          {
            targets: 1,
            render(sender) {
              return sender.mobile || sender.username;
            },
          },
          {
            targets: 3,
            render(type) {
              return type.name;
            },
          },
          {
            targets: 4,
            render(receiver) {
              return receiver.mobile || receiver.username;
            },
          },
          {
            targets: '_all',
            className: 'text-center',
          },
        ],
      };
    },
  },
};
</script>
