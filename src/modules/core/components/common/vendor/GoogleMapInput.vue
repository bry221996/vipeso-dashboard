<template>
  <gmap-autocomplete
    id="google-map"
    :value="location.complete_address"
    :class="classes"
    @place_changed="onPlaceChanged"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'GoogleMapInput',
  data() {
    return {
      isValid: false,
      isDirty: false,
      location: {
        complete_address: null,
        latitude: null,
        longitude: null,
        viewport: null,
        formatted_address: null,
        street_number: null,
        postal_code: null,
        locality: null,
        region: null,
        country_name: 'Philippines',
        country_shortcode: 'PH',
      },
    };
  },
  computed: {
    classes() {
      const defaults = ['form-control'];

      if (!this.isDirty) {
        return defaults;
      }

      if (this.isValid) {
        defaults.push('is-valid');
      } else {
        defaults.push('is-invalid');
      }

      return defaults;
    },
  },
  methods: {
    onInput() {
      this.isValid = false;
      this.isDirty = true;
      this.$emit('validity-changed', this.isValid);
    },

    onPlaceChanged(place) {
      if (place.geometry) {
        this.location.latitude = place.geometry.location.lat();
        this.location.longitude = place.geometry.location.lng();
        this.location.complete_address = $('#google-map').val();
        this.location.formatted_address = place.formatted_address;
        this.location.viewport = place.geometry.viewport.toString();

        this.extractAddressComponents(place.address_components);

        this.isValid = true;
        this.$emit('validity-changed', this.isValid);
        this.$emit('input', this.location);
      }
    },

    extractAddressComponents(addressComponents) {
      const components = {};

      addressComponents.forEach((k) => {
        k.types.forEach((k2) => {
          components[k2] = k.long_name;
        });
      });

      components.region = components.administrative_area_level_1;

      const keys = Object.keys(components);

      keys.forEach((key) => {
        if (key in this.location) {
          this.location[key] = components[key];
        }
      });
    },

    setInitialValue(value) {
      this.isDirty = true;
      this.isValid = true;
      this.location.complete_address = value;
      this.$emit('validity-changed', this.isValid);
    },
  },
};
</script>
