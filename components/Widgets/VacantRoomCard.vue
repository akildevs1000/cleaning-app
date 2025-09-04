<template>
  <div>
    <v-card v-for="(item, index) in filteredItems" :key="index" outlined :style="{
      borderRadius: '15px',
      borderLeft: `4px solid ${item.color} !important`,
      height: '90px',
    }" class="mb-3" @click="selectRoom(index, item)">
      <v-card-text>
        <v-row no-gutters align="center" justify="space-between">
          <!-- Left Side -->
          <v-col class="d-flex align-center" cols="9">
            <!-- Icon inside circle -->
            <v-avatar size="40" class="mr-4" tile>
              <div class="d-flex align-center justify-center" :style="{
                backgroundColor: item.backgroundColor,
                width: `40px`,
                height: `40px`,
                borderRadius: `50%`,
              }">
                <v-icon :color="item.color">mdi-bed</v-icon>
              </div>
            </v-avatar>

            <!-- Room Info -->
            <div>
              <div class="font-weight-bold text-subtitle-1 black--text">
                Room
                {{
                  item.room_no.length < 5 ? item.room_no : item.room_no.slice(0, 5) }} </div>
                  <div class="grey--text text--darken-1 text-caption">
                    {{ item.room_status }}
                  </div>
              </div>
          </v-col>

          <!-- Right Side -->
          <v-col cols="3" class="text-right">
            <div>
              <v-progress-circular v-if="getRelatedStatus(item) == 'In Progress'" indeterminate :color="item.color"
                size="20" :width="3"></v-progress-circular>
              <v-icon v-else class="mb-1" :color="item.color">
                {{ getRelatedIcon(item) }}
              </v-icon>
            </div>
            <div>
              <span class="caption font-weight-bold">
                {{ getRelatedStatus(item) }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["items", "bgColor", "color", "room_type", "floor_no", "action_type"],
  data() {
    return {
      selectedIndex: null, // State to keep track of the selected index
    };
  },
  computed: {
    filteredItems() {
      const floor_no = this.$store.state.floor_no;

      if (!floor_no) {
        let items = this.items;
        if (this.action_type == 'checkout') {

          items = this.items.filter((e) => e.room_status == 'checked_out');

        }

        return items

      }

      let items = this.items || [];

      items.sort((a, b) => Number(a.room_no) - Number(b.room_no));

      let filtered_items = items.filter((e) => e.floor_no == floor_no);

      if (this.action_type == 'checkout') {

        return filtered_items.filter((e) => e.room_status == 'checked_out');

      }

      return filtered_items;

    },
  },
  methods: {
    getRelatedIcon(item) {
      let status = item?.last_cleaned?.status;

      if (status == "Neutral") {
        return "mdi-check";
      } else if (status == "Dirty") {
        return "mdi-alert-circle-outline";
      } else if (status == "Cleaned") {
        return "mdi-check";
      } else {
        return "mdi-clock-outline";
      }
    },

    getRelatedStatus(item) {
      let status = item?.last_cleaned?.status;

      if (status == "Neutral") {
        return "Neutral";
      } else if (status == "Dirty") {
        return "Dirty";
      } else if (status == "Cleaned") {
        return "Cleaned";
      } else if (status == null) {
        return "Pending";
      } else {
        return "In Progress";
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
