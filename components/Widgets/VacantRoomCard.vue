<template>
  <div class="mt-5 mb-10">
    
    <v-row no-gutters v-if="filteredItems && filteredItems.length > 0">
      <v-col cols="4" v-for="(item, index) in filteredItems" :key="index">
        <div class="ma-1 text-center" style="border-radius: 12px">
          <v-card
            rounded
            elevation="0"
            dark
            class="pa-3"
            :style="getRelatedStyle(item)"
            :class="selectedIndex === index ? 'blue white--text' : ''"
            @click="selectRoom(index, item)"
          >
            <span>{{
              item.room_no.length < 5 ? item.room_no : item.room_no.slice(0, 5)
            }}</span>
            <br />
            <span>{{ item.room_type }}</span>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <div v-else>No rooms found.</div>
  </div>
</template>

<script>
export default {
  props: ["items", "bgColor", "color","room_type"],
  data() {
    return {
      selectedIndex: null, // State to keep track of the selected index
    };
  },
  computed: {
    filteredItems() {
      const searchTerm = this.room_type ? this.room_type.trim().toLowerCase() : "";
      if (!searchTerm || searchTerm == "select all") {
        return this.items || [];
      }

      return (this.items || []).filter(({ room_no, room_type }) => {
        const roomNo = room_no?.toString().toLowerCase() || "";
        const roomType = room_type?.toString().toLowerCase() || "";
        return roomNo.includes(searchTerm) || roomType.includes(searchTerm);
      });
    },
  },
  methods: {
    getRelatedStyle(item) {
      const statusColors = {
        cleaned: { backgroundColor: "#32ea91", color: "white" },
        dirty: { backgroundColor: "#e35632", color: "white" },
        neutral: { backgroundColor: "#fab950", color: "white" },
        default: { backgroundColor: this.bgColor, color: this.color },
      };

      if (item.is_cleaned) return statusColors.cleaned;
      if (item.is_dirty) return statusColors.dirty;
      if (item.is_neutral) return statusColors.neutral;

      return statusColors.default;
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
