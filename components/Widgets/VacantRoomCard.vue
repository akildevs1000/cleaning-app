<template>
  <div style="max-height: 300px; overflow-y: scroll" class="mt-5 mb-10">
    <v-row no-gutters v-if="items && items.length > 0">
      <v-col cols="2" v-for="(item, index) in items" :key="index">
        <div class="ma-1 text-center" style="border-radius: 12px">
          <v-card
            rounded
            elevation="0"
            dark
            class="pa-2 mx-auto"
            :style="getRelatedStyle(item)"
            :class="selectedIndex === index ? 'blue white--text' : ''"
            @click="selectRoom(index, item)"
          >
            <span>{{
              item.room_no.length < 5
                ? item.room_no
                : item.room_no.slice(0, 5) + "..."
            }}</span>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["items", "bgColor", "color"],
  data() {
    return {
      selectedIndex: null, // State to keep track of the selected index
    };
  },
  methods: {
    getRelatedStyle(item) {
      return item.is_cleaned
        ? `background-color:#2ce860;color:white;`
        : `background-color:${this.bgColor};color:${this.color};`;
    },
    // selectRoom(index, item) {
    //   this.selectedIndex = index; // Set the selected index
    //   this.$emit("selectedRoom", item); // Emit the event
    // },

    selectRoom(index, item) {
      this.selectedIndex = index;
      const queryData = encodeURIComponent(JSON.stringify(item));
      this.$router.push({ path: "/selected_room", query: { data: queryData } });
    },
  },
};
</script>
