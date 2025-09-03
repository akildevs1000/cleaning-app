<template>
  <!-- <v-progress-linear
      :value="15"
      color="primary"
      height="10"
      rounded
    >
    </v-progress-linear> -->
  <span>
    <div class="mx-3">
      <div style="display: flex; justify-content: space-between;">
        <div>Cleaning Progress</div>
        <div>{{ engaged }} / {{ total }}</div>
      </div>
    </div>
    <div>
      <v-slider
        readonly
        v-model="engagedValue"
        :max="total"
        :step="1"
        track-color="#d8bfff"
        color="primary"
        thumb-color="primary"
        hide-details
      ></v-slider>
    </div>
  </span>
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
