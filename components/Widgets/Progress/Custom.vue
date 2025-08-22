<template>
  <v-container>
    <v-slider
      readonly
      v-model="engagedValue"
      :max="total"
      :step="1"
      track-color="#d8bfff"
      color="primary"
      thumb-color="primary"
      thumb-label="always"
      hide-details
    ></v-slider>
  </v-container>
</template>

<script>
export default {
  props: {
    engaged: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  data() {
    return {
      engagedValue: this.engaged,
    };
  },
  watch: {
    engaged(newVal) {
      this.engagedValue = newVal;
    },
    engagedValue(newVal) {
      this.$emit("update:engaged", newVal);
    },
  },
};
</script>
