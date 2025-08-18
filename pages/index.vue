<template>
  <span class="pt-15">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="search-wrapper">
            <!-- <transition name="slide-right">
              <v-autocomplete
                v-show="showSearch"
                label="Room Type"
                outlined
                dense
                hide-details
                item-value="name"
                item-text="name"
                v-model="room_type"
                :items="[{ name: 'Select All' }, ...roomTypes]"
                @change="dialog = false"
                class="search-input"
              ></v-autocomplete>
            </transition>

            <v-icon
              color="primary"
              @click="showSearch = !showSearch"
              class="search-icon ml-1"
            >
              mdi-magnify
            </v-icon> -->

            <v-autocomplete
              label="Floor No"
              v-model="floor_no"
              outlined
              dense
              small
              hide-details
              :items="floors"
              item-text="name"
              item-value="id"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-5 mb-1">
        <!-- <v-col cols="12" class="text-right">
        <v-icon color="black" @click="room_list">mdi-reload</v-icon>
      </v-col> -->

        <v-col v-for="(item, index) in cards" :key="index">
          <v-card
            elevation="0"
            height="70"
            class="text-center pt-2"
            :style="`background-color:${item.bgColor}; color:${item.color}; border-radius: 12px`"
          >
            <small class="px-1" style="font-size: 12px">{{ item.label }}</small>
            <div class="pa-1 mt-1" style="font-size: 14px">
              {{ item.value }} <span v-if="item.sub_value">/</span>
              <small v-if="item.sub_value" style="font-size: 11px">{{
                item.sub_value
              }}</small>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <div v-if="tabId">
            <WidgetsVacantRoomCard
              bgColor="#d9534f"
              color="white"
              v-if="tabId == 0"
              :items="rooms.DirtyRooms"
              :room_type="room_type"
              room_status="checked_out"
            />
            <WidgetsVacantRoomCard
              bgColor="#ddbc91"
              color="black"
              v-if="tabId == 1"
              :items="rooms.Occupied"
              :room_type="room_type"
              room_status="checked_in"
            />
            <WidgetsVacantRoomCard
              bgColor="#f5ece3"
              color="black"
              v-if="tabId == 2"
              :items="rooms.vacantRooms"
              :room_type="room_type"
              room_status="available"
            />
            <WidgetsVacantRoomCard
              bgColor="#75a29f"
              color="white"
              v-if="tabId == 3"
              :items="rooms.blockedRooms"
              :room_type="room_type"
              room_status="blocked"
            />
          </div>
          <div v-else style="max-height: 500px; overflow: scroll">
            <WidgetsVacantRoomCard
              :floor_no="floor_no"
              :items="[
                ...(rooms.DirtyRooms || []),
                ...(rooms.Occupied || []),
                ...(rooms.blockedRooms || []),
                ...(rooms.vacantRooms || []),
              ]"
            />
          </div>
        </v-col>
      </v-row>

      <v-footer fixed app dense flat class="white">
        <div style="width: 100%" class="pa-5">
          <WidgetsProgressCustom
            v-if="progress"
            :total="progress.total"
            :engaged="progress.engaged"
          />
        </div>
      </v-footer>
    </v-container>
  </span>
</template>
<script>
export default {
  data() {
    return {
      showSearch: false,
      tabId: null,
      cards: [],
      rooms: [],
      progress: null,
      roomTypes: [],
      room_type: null,
      floor_no: null,
      floors: [
        { id: null, name: "Select All" },
        { id: 1, name: "First Floor" },
        { id: 2, name: "Second Floor" },
        { id: 3, name: "Third Floor" },
        { id: 4, name: "Fourth Floor" },
        { id: 5, name: "Fifth Floor" },
        { id: 6, name: "Sixth Floor" },
        { id: 7, name: "Seventh Floor" },
        { id: 8, name: "Eighth Floor" },
        { id: 9, name: "Ninth Floor" },
        { id: 10, name: "Tenth Floor" },
        { id: 11, name: "Eleventh Floor" },
        { id: 12, name: "Twelfth Floor" },
        { id: 13, name: "Thirteenth Floor" },
        { id: 14, name: "Fourteenth Floor" },
        { id: 15, name: "Fifteenth Floor" },
        { id: 16, name: "Sixteenth Floor" },
        { id: 17, name: "Seventeenth Floor" },
        { id: 18, name: "Eighteenth Floor" },
        { id: 19, name: "Nineteenth Floor" },
        { id: 20, name: "Twentieth Floor" },
      ],
    };
  },
  created() {
    this.room_list();
    this.get_room_types();
  },

  methods: {
    get_room_types() {
      this.$axios
        .get(`room_type`, {
          params: {
            company_id: this.$auth.user.company.id,
          },
        })
        .then(({ data }) => {
          this.roomTypes = data;
        });
    },
    setTabId(index) {
      this.tabId = index;
    },
    async room_list() {
      try {
        const today = new Date().toISOString().slice(0, 10);

        const payload = {
          params: {
            company_id: this.$auth.user?.company.id,
            check_in: today,
            filter_date: today,
          },
        };

        const { data } = await this.$axios.get(
          "room_list_grid_for_house_keeping",
          payload
        );

        if (!data.status) {
          this.alert("Failure!", data.data, "error");
          return;
        }

        const {
          bookedRooms,
          expectCheckOut,
          checkIn,
          blockedRooms,
          dirtyRoomsList,
          allRooms,
        } = data;

        // Helper: Extract room numbers
        const getRoomNumbers = (list) => list.map((e) => e.room_no);

        const sold = getRoomNumbers(bookedRooms);
        const expectCO = getRoomNumbers(expectCheckOut);
        const occupied = getRoomNumbers(checkIn);
        const blocked = getRoomNumbers(blockedRooms);
        const dirty = getRoomNumbers(dirtyRoomsList);

        const uniqueRoomNumbers = [
          ...new Set([...sold, ...expectCO, ...occupied, ...blocked, ...dirty]),
        ];
        const vacantRooms = allRooms;

        // Helper: Common room mapping
        const mapRoomData = (list, extra = {}) =>
          list.map((e) => ({
            id: e.id,
            floor_no: e.floor_no,
            room_no: e.room_no,
            room_type: e.room_type.name,
            is_cleaned: e.is_cleaned.length,
            is_neutral: e.is_neutral.length,
            is_dirty: e.is_dirty.length,
            guest_name: e.booked_room?.customer?.full_name || "---",
            checkin_datetime_only_display:
              e.booked_room?.checkin_datetime_only_display,
            checkout_datetime_only_display:
              e.booked_room?.checkout_datetime_only_display,
            ...extra,
            room_cleaning_status_count: e.room_cleaning_status_count,
            last_cleaned_at:
              e.is_cleaned?.[0]?.last_cleaned_at ??
              e.is_neutral?.[0]?.last_cleaned_at ??
              e.is_dirty?.[0]?.last_cleaned_at ??
              "",
            last_cleaned: e.last_cleaned,
            booked_room_id: e?.booked_room?.id,
            booking_id: e?.booked_room?.booking_id,
          }));

        // Room category arrays
        const vrs = mapRoomData(vacantRooms, {
          room_status: "available",
          backgroundColor: "#f5ece3",
          color: "black",
        });
        const drs = mapRoomData(dirtyRoomsList, {
          can_change_status: true,
          room_status: "checked_out",
          backgroundColor: "#d9534f",
          color: "white",
        });
        const ors = mapRoomData(checkIn, {
          room_status: "checked_in",
          backgroundColor: "#ddbc91",
          color: "black",
        });
        const brs = mapRoomData(blockedRooms, {
          room_status: "blocked",
          backgroundColor: "#75a29f",
          color: "white",
        });

        // Status totals
        const [totalDirty, totalOccupied, totalVac, totalBlocked] =
          await Promise.all([
            this.getRoomStatus(dirtyRoomsList.map((e) => e.id)),
            this.getRoomStatus(checkIn.map((e) => e.id)),
            this.getRoomStatus(vacantRooms.map((e) => e.id)),
            this.getRoomStatus(blockedRooms.map((e) => e.id)),
          ]);

        // Assign to component state
        this.rooms = {
          DirtyRooms: drs,
          Occupied: ors,
          vacantRooms: vrs,
          blockedRooms: brs,
        };

        this.cards = [
          {
            color: "white",
            bgColor: "#d9534f",
            label: "Dirty",
            value: drs.filter((e) => e.is_cleaned).length > 0 ? 1 : 0,
            sub_value: drs.length,
          },
          {
            color: "black",
            bgColor: "#ddbc91",
            label: "Occupied",
            value: ors.filter((e) => e.is_cleaned).length > 0 ? 1 : 0,
            sub_value: ors.length,
          },
          {
            color: "black",
            bgColor: "#f5ece3",
            label: "Vacant",
            value: vrs.filter((e) => e.is_cleaned).length > 0 ? 1 : 0,
            sub_value: vrs.length,
          },
          {
            color: "white",
            bgColor: "#75a29f",
            label: "Blocked",
            value: brs.filter((e) => e.is_cleaned).length > 0 ? 1 : 0,
            sub_value: brs.length,
          },
        ];

        this.progress = {
          total: allRooms.length + blocked.length,
          engaged: this.$utils.getSum(this.cards.map((e) => e.value)),
        };
      } catch (error) {
        console.error(error);
        this.alert(
          "Error!",
          "Something went wrong while fetching rooms.",
          "error"
        );
      }
    },
    getSubValue(length, total) {
      return length - total < 0 ? "0" : (length - total).toString();
    },
    async getRoomStatus(room_ids) {
      let config = {
        params: {
          room_ids: room_ids,
          date: new Date().toISOString().split("T")[0],
          company_id: this.$auth.user.company_id,
        },
      };
      let { data } = await this.$axios.get(`room-cleaning`, config);

      return data.data.length;
    },
  },
};
</script>
