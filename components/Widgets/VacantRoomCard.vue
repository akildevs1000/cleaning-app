<template>
  <div style="max-height: 550px; overflow: scroll">
    <v-row no-gutters v-if="filteredItems && filteredItems.length > 0">
      <v-col cols="4" v-for="(item, index) in filteredItems" :key="index">
        <!-- <pre>{{ item.room_status }}</pre> -->
        <div class="ma-1 text-center" style="border-radius: 12px">
          <v-card rounded elevation="0" dark class="pa-3" :style="getRelatedStyle(item)"
            :class="selectedIndex === index ? 'blue white--text' : ''" @click="selectRoom(index, item)">
            <v-avatar size="40">
              <v-icon :color="getRelatedIconColor(item)">
                {{ getRelatedIcon(item) }}
              </v-icon>
            </v-avatar>
            <br />
            <span class="mt-1">{{
              item.room_no.length < 5 ? item.room_no : item.room_no.slice(0, 5) }} </span>

                <span>{{ item.room_type }} </span>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- <div v-else
      style="display: flex; justify-content: center; align-items: center; height: 400px; margin-top: 20px; font-size: 16px; font-family: sans-serif;">
      No rooms found.</div> -->
  </div>
</template>

<script>
export default {
  props: ["items", "bgColor", "color", "room_type", "floor_no","action_type"],
  data() {
    return {
      selectedIndex: null, // State to keep track of the selected index
    };
  },
  computed: {
    filteredItems() {
      const floor_no = this.$store.state.floor_no;

      if (!floor_no) {
        return this.items;
      }

      let items = this.items || [];

      items.sort((a, b) => Number(a.room_no) - Number(b.room_no));


      return items.filter((e) => e.floor_no == floor_no);
    },
  },
  methods: {
    getRelatedStyle({ backgroundColor, color }) {
      return { backgroundColor, color };
    },
    getRelatedIcon(item) {
      let status = item?.last_cleaned?.status;

      if (status == "Neutral") {
        return "mdi-emoticon-neutral";
      } else if (status == "Dirty") {
        return "mdi-emoticon-sad";
      } else if (status == "Cleaned") {
        return "mdi-emoticon-happy";
      } else {
        return "mdi-emoticon-neutral";
      }
    },

    getRelatedIconColor(item) {
      let status = item?.last_cleaned?.status;
      if (item.room_status == "checked_out") {
        if (status == "Neutral") {
          return "yellow darken-1";
        } else if (status == "Dirty") {
          return "error";
        } else if (status == "Cleaned") {
          return "success darken-2";
        } else {
          return "grey";
        }
      }

      if (item.room_status == "checked_in") {
        if (status == "Neutral") {
          return "yellow darken-7";
        } else if (status == "Dirty") {
          return "error";
        } else if (status == "Cleaned") {
          return "success darken-3";
        } else {
          return "white";
        }
      }
      if (item.room_status == "blocked") {
        if (status == "Neutral") {
          return "yellow darken-7";
        } else if (status == "Dirty") {
          return "error";
        } else if (status == "Cleaned") {
          return "success";
        } else {
          return "white";
        }
      }
      if (item.room_status == "available") {
        if (status == "Neutral") {
          return "yellow darken-3";
        } else if (status == "Dirty") {
          return "error";
        } else if (status == "Cleaned") {
          return "success";
        } else {
          return "grey";
        }
      }
    },

    selectRoom(index, item) {
      item.action_type = this.action_type;
      this.selectedIndex = index;
      const queryData = encodeURIComponent(JSON.stringify(item));
      this.$router.push({ path: "/selected_room", query: { data: queryData } });
    },
  },
};
</script>
