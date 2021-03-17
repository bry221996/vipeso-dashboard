<template>
  <div class="form">
    <div class="row d-flex justify-content-center" v-if="loaded">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="container">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-label">Store Logo</label>
                      <image-upload ref="logo" @change="onChangeLogo">Upload logo</image-upload>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="form-row d-flex justify-content-end h-100 align-items-end">
                      <div class="form-group col-lg-10">Store Business Hours</div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-label">Store Name</label>
                      <input
                        name="store_name"
                        v-validate="'required'"
                        class="form-control"
                        :value="form.store_name"
                        @input="updateForm"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Mobile</label>
                      <input
                        name="mobile_number"
                        v-validate="'required'"
                        class="form-control"
                        :value="form.mobile_number"
                        @input="updateForm"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Telephone</label>
                      <input
                        name="phone_number"
                        v-validate="'required'"
                        class="form-control"
                        :value="form.phone_number"
                        @input="updateForm"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label">Location</label>
                      <google-map-input
                        ref="gmapInput"
                        @input="onGmapInput"
                        @validity-changed="onGMapValidityChanged"
                      ></google-map-input>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Store Images</label>
                      <multi-image-upload
                        ref="images"
                        @change="onChangePhotos">
                        Upload Images
                      </multi-image-upload>
                    </div>
                  </div>

                  <div class="col-lg-7">
                    <business-hour-form></business-hour-form>
                  </div>
                </div>

                <div class="row">
                  <div class="col d-flex justify-content-end">
                    <submit-button
                      :is-disabled="isButtonDisable"
                      ref="button"
                      class="btn-primary"
                      submit-text="Submitting"
                      @click="onFormSubmit"
                    >Submit</submit-button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <loading-indicator style="margin-top: 35vh; width: 5rem; height: 5rem" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { setTimeout } from 'timers';
import GoogleMapInput from '../../core/components/common/vendor/GoogleMapInput.vue';
import BusinessHourForm from '../components/forms/BusinessHourForm.vue';
import ImageUpload from '../../core/components/common/images/ImageUpload.vue';
import SubmitButton from '../../core/components/common/SubmitButton.vue';
import MultiImageUpload from '../../core/components/common/images/MultiImageUpload.vue';
import LoadingIndicator from '../../core/components/common/LoadingIndicator.vue';

export default {
  name: 'StoreForm',
  components: {
    ImageUpload,
    GoogleMapInput,
    BusinessHourForm,
    SubmitButton,
    MultiImageUpload,
    LoadingIndicator,
  },
  data() {
    return {
      formValid: false,
      googleMapValitidy: false,
      logoValidity: false,
      loaded: false,
    };
  },
  computed: {
    ...mapState('store', {
      form: 'form',
    }),
    isButtonDisable() {
      return !(
        this.formValid
        && this.logoValidity
        && this.googleMapValitidy
        && this.isStoreHoursValid
      );
    },
    isStoreHoursValid() {
      if (this.form.store_hours.length > 0) {
        return this.form.store_hours.every(
          hour => !!hour.opening && !!hour.closing,
        );
      }
      return true;
    },
    isEditing() {
      return this.$route.meta.editing;
    },
    isUploadingNewLogo() {
      return typeof this.form.logo !== 'string';
    },
    toUploadImage() {
      return this.form.images.filter(photo => photo.file);
    },
  },
  mounted() {
    if (this.isEditing) {
      this.fetchSelected();
    } else {
      this.loaded = true;
    }
  },
  methods: {
    async fetchSelected() {
      const store = await this.$store.dispatch(
        'store/showDetails',
        this.$route.params.id,
      );

      const storeCopy = { ...store };

      const formattedHours = storeCopy.store_hours.map(hour => ({
        opening: moment(hour.opening, ['h:mm A']).format('HH:mm:ss'),
        closing: moment(hour.closing, ['h:mm A']).format('HH:mm:ss'),
        day: hour.day,
      }));

      storeCopy.store_hours = formattedHours;

      const images = storeCopy.images.map(image => ({
        url: image.image,
      }));

      this.$store.commit('store/SET_FORM', storeCopy);

      this.loaded = true;

      // wait for a second to load the child components
      setTimeout(() => {
        this.$refs.logo.setImage(storeCopy.logo);
        this.$refs.gmapInput.setInitialValue(storeCopy.complete_address);
        this.$refs.images.setImages(images);
        this.logoValidity = true;
        this.validate();
      }, 1000);
    },
    updateForm(e) {
      this.commitChanges(e.target.name, e.target.value);

      this.validate();
    },
    validate() {
      this.$validator.validateAll().then((valid) => {
        this.formValid = valid;
      });
    },
    onGMapValidityChanged(validity) {
      this.googleMapValitidy = validity;
    },
    onGmapInput(address) {
      const keys = Object.keys(address);

      keys.forEach((key) => {
        this.commitChanges(key, address[key]);
      });
    },
    commitChanges(key, value) {
      const form = Object.assign({}, this.form);
      form[key] = value;
      this.$store.commit('store/SET_FORM', form);
    },
    onChangeLogo(file) {
      this.logoValidity = !!file;
      this.commitChanges('logo', file);
    },
    onChangePhotos(photos) {
      const images = [...photos];
      this.$store.commit('store/ADD_PHOTOS', images);
    },
    async onFormSubmit() {
      let storeId = this.form.store_id;
      if (this.isEditing) {
        await this.$store.dispatch('store/updateDetails');
        if (this.isUploadingNewLogo) {
          await this.$store.dispatch('store/updateLogo', storeId);
        }
      } else {
        const storeResponse = await this.$store.dispatch('store/createNew');
        storeId = storeResponse.meta.store_id;
        await this.$store.dispatch('store/updateLogo', storeId);
        await this.$store.dispatch('store/addBusinessHours', storeId);
      }

      if (this.toUploadImage.length > 0) {
        await this.$store.dispatch('store/addPhotos', storeId);
      }

      this.$refs.button.doneSubmit();
      this.$router.push('/stores');
      this.$store.commit('store/CLEAR_FORM');
    },
  },
};
</script>
