<template>
  <span>
    <style>
      .progress-container {
        width: 100%;
        background-color: #bbbbbb; /* Remaining part color */
        border-radius: 50px;
        overflow: hidden;
        height: 25px;
        display: flex;
        align-items: center;
      }

      .progress-bar {
        background-color: #5fafff; /* Engaged color */
        height: 100%;
        color: white;
        text-align: center;
        line-height: 25px;
        transition: width 0.5s ease-in-out;
        white-space: nowrap;
      }
    </style>

    <div class="progress-container" aria-label="Progress bar showing engaged vs remaining">
      <div
        class="progress-bar"
        :style="{ width: engagedPercentage + '%' }"
      >
        {{ engaged }} / {{ total }}
      </div>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    engaged: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    engagedPercentage() {
      return this.total
        ? ((this.engaged / this.total) * 100).toFixed(2)
        : 0;
    },
  },
};
</script>
