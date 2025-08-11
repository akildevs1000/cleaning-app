<template>
  <span class="pt-15">
    <v-container>
      <v-row>
        <v-col>
          <div>
            <AssetsProgressCustom
              v-if="progress"
              :total="progress.total"
              :engaged="progress.engaged"
            />
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
            @click="setTabId(index)"
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
          <div>
            <WidgetsVacantRoomCard
              bgColor="#d9534f"
              color="white"
              v-if="tabId == 0"
              :items="rooms.DirtyRooms"
            />
            <WidgetsVacantRoomCard
              bgColor="#ddbc91"
              color="black"
              v-if="tabId == 1"
              :items="rooms.Occupied"
            />
            <WidgetsVacantRoomCard
              bgColor="#f5ece3"
              color="black"
              v-if="tabId == 2"
              :items="rooms.vacantRooms"
            />
            <WidgetsVacantRoomCard
              bgColor="#75a29f"
              color="white"
              v-if="tabId == 3"
              :items="rooms.blockedRooms"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<script>
export default {
  data() {
    return {
      tabId: 2,
      cards: [],
      rooms: [],
      progress: null,
    };
  },
  created() {
    this.room_list();
  },

  methods: {
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
        const vacantRooms = allRooms.filter(
          (e) => !uniqueRoomNumbers.includes(e.room_no)
        );

        // Helper: Common room mapping
        const mapRoomData = (list, extra = {}) =>
          list.map((e) => ({
            id: e.id,
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
            room_cleaning_status_count:e.room_cleaning_status_count
          }));

        // Room category arrays
        const vrs = mapRoomData(vacantRooms);
        const drs = mapRoomData(dirtyRoomsList, { can_change_status: true });
        const ors = mapRoomData(checkIn);
        const brs = mapRoomData(blockedRooms);

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
            value: drs.map(e => e.room_cleaning_status_count).reduce((acc,cur) => acc + cur, 0),
            sub_value: this.getSubValue(dirty.length, totalDirty),
          },
          {
            color: "black",
            bgColor: "#ddbc91",
            label: "Occupied",
            value: ors.map(e => e.room_cleaning_status_count).reduce((acc,cur) => acc + cur, 0),
            sub_value: this.getSubValue(occupied.length, totalOccupied),
          },
          {
            color: "black",
            bgColor: "#f5ece3",
            label: "Vacant",
            value: vrs.map(e => e.room_cleaning_status_count).reduce((acc,cur) => acc + cur, 0),
            sub_value: this.getSubValue(vacantRooms.length, totalVac),
          },
          {
            color: "white",
            bgColor: "#75a29f",
            label: "Blocked",
            value: brs.map(e => e.room_cleaning_status_count).reduce((acc,cur) => acc + cur, 0),
            sub_value: this.getSubValue(blocked.length, totalBlocked),
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
