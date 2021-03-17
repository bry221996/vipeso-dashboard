<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Reviews</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table
          table-id="reviews"
          ref="table"
          :url="dataTableURL"
          :columns="columns"
          :menu-actions="actions"
          @show-review="onShowReview"
          @show-receipt="onShowReceipt"
          @show-photos="onShowPhotos"
        ></data-table>
      </div>
    </div>

    <details-modal ref="details" @verified="onReviewVerified"></details-modal>

    <receipt-modal ref="receipt"></receipt-modal>

    <photos-modal ref="photos"></photos-modal>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';
import DetailsModal from '../components/DetailsModal.vue';
import ReceiptModal from '../components/ReceiptModal.vue';
import PhotosModal from '../components/PhotosModal.vue';

import StarRatings from '../utilities/startRatings';

export default {
  name: 'Reviews',
  components: {
    DataTable,
    DetailsModal,
    ReceiptModal,
    PhotosModal,
  },
  data() {
    return {
      actions: ['show-review', 'show-receipt', 'show-photos'],
    };
  },
  computed: {
    dataTableURL() {
      const storeId = this.$store.state.auth.store.store_id;
      return this.$store.getters['auth/isPlatformStaff']
        ? 'v1/reviews?include=user,store,photos'
        : `v1/reviews?include=user,store,photos&filter[store_id]=${storeId}`;
    },
    columns() {
      return {
        header: [
          'ID',
          'Store',
          'Customer',
          'Rating',
          'Review',
          'Status',
          'Actions',
        ],
        record: [
          { data: 'review_id', searchable: false, orderable: true },
          { data: 'store', searchable: true, orderable: true },
          { data: 'user', searchable: false, orderable: false },
          { data: 'rating', searchable: true, orderable: true },
          { data: 'review', searchable: false, orderable: true },
          { data: 'verified', searchable: false, orderable: false },
          { data: 'review_id', searchable: false, orderable: false },
        ],
        defs: [
          { targets: '_all', searchable: false },
          {
            targets: 1,
            render(store) {
              return `${store.store_name} - ${store.locality}`;
            },
          },
          {
            targets: 2,
            className: 'text-center',
            render(user) {
              return user.mobile;
            },
          },
          {
            targets: 3,
            className: 'text-center',
            render(rating) {
              return StarRatings(rating);
            },
          },
          {
            targets: 4,
            render(review) {
              if (review) {
                return review.length > 50
                  ? `${review.substring(0, 50)} more...`
                  : review;
              }
              return '* * * * * No Review * * * * *';
            },
          },
          {
            targets: -2,
            className: 'text-center',
            render(isPublished) {
              if (isPublished) {
                return '<span class="badge bg-info">Published</span>';
              }
              return '<span class="badge bg-warning">Unpublished</span>';
            },
          },
          {
            targets: -1,
            orderable: false,
            className: 'text-center',
            render(data, type, review) {
              const receiptButton = review.receipt_image
                ? { title: 'View Receipt', state: 'enabled' }
                : { title: 'No Receipt', state: 'disabled' };
              const photosButton = review.photos.length > 0
                ? { title: 'View Photos', state: 'enabled' }
                : { title: 'No Photos', state: 'disabled' };
              return `
              <div aria-role="group" aria-label="Button group" class="d-flex justify-content-center btn-group-sm btn-group">
                <button 
                  class="btn btn-white btn-primary action-button show-review"
                  title="Show Review"
                  data-id="${data}">
                  <i class="material-icons">info</i>
                </button>
                <button 
                  class="btn btn-white btn-primary action-button show-receipt"
                  title="${receiptButton.title}"
                  data-id="${data}"
                  data-data="${review.receipt_image}" ${receiptButton.state}>
                  <i class="material-icons">receipt</i>
                </button>
                <button 
                  class="btn btn-white btn-primary action-button show-photos"
                  title="${photosButton.title}"
                  data-id="${data}" ${photosButton.state}>
                  <i class="material-icons">image</i>
                </button>
              </div>`;
            },
          },
        ],
      };
    },
  },
  methods: {
    async onShowReview(id) {
      await this.$store.dispatch('review/fetchDetails', id);
      this.$refs.details.show();
    },
    async onShowPhotos(id) {
      await this.$store.dispatch('review/fetchDetails', id);
      this.$refs.photos.show();
    },
    onShowReceipt(id, data) {
      this.$refs.receipt.show(data);
    },
    onReviewVerified() {
      this.$refs.table.refresh();
    },
  },
};
</script>
