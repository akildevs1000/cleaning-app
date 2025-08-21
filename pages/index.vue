<template>
  <v-card class="mx-auto mt-5 pb-15" flat max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="imageSrc"></v-img>

    <v-card-title class="pt-10">
      <WidgetsProgressCustom
        v-if="progress"
        :total="progress.total"
        :engaged="progress.engaged"
      />
    </v-card-title>

    <v-card-text class="mx-0 px-0">
      <div v-if="tabId">
        <WidgetsVacantRoomCard
          :action_type="action_type"
          bgColor="#d9534f"
          color="white"
          v-if="tabId == 0"
          :items="rooms.DirtyRooms"
          :room_type="room_type"
          room_status="checked_out"
        />
        <WidgetsVacantRoomCard
          :action_type="action_type"
          bgColor="#ddbc91"
          color="black"
          v-if="tabId == 1"
          :items="rooms.Occupied"
          :room_type="room_type"
          room_status="checked_in"
        />
        <WidgetsVacantRoomCard
          :action_type="action_type"
          bgColor="#f5ece3"
          color="black"
          v-if="tabId == 2"
          :items="rooms.vacantRooms"
          :room_type="room_type"
          room_status="available"
        />
        <WidgetsVacantRoomCard
          :action_type="action_type"
          bgColor="#75a29f"
          color="white"
          v-if="tabId == 3"
          :items="rooms.blockedRooms"
          :room_type="room_type"
          room_status="blocked"
        />
      </div>
      <div v-else style="max-height: 550px; overflow: scroll">
        <WidgetsVacantRoomCard
          :action_type="action_type"
          :items="[
            ...(rooms.DirtyRooms || []),
            ...(rooms.Occupied || []),
            ...(rooms.blockedRooms || []),
            ...(rooms.vacantRooms || []),
          ]"
        />
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <span class="pt-15">
      <v-container>
        <!-- <v-row class="mt-5 mb-1"> -->
        <!-- <v-col cols="12" class="text-right">
        <v-icon color="black" @click="room_list">mdi-reload</v-icon>
      </v-col> -->

        <!-- <v-col v-for="(item, index) in cards" :key="index">
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
        </v-col> -->
        <!-- </v-row> -->

        <v-row align="center">
          <v-col cols="12" class="mb-1"></v-col>

          <v-col class="text-center">
            <v-btn
              block
              dark
              color="#8e44ff"
              class="pa-3"
              @click="setActionType(`cleaning`)"
              rounded
              elevation="2"
            >
              <v-icon left>mdi-broom</v-icon>
              Cleaning
            </v-btn>
          </v-col>

          <v-col class="text-center">
            <v-btn
              block
              dark
              color="#8e44ff"
              class="pa-3"
              @click="setActionType(`checkout`)"
              rounded
              elevation="2"
            >
              <v-icon left>mdi-clock</v-icon>
              Check Out
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </span>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhVT4jPEIpGxT4pXAXp416n4ffJeHRqrKWw&s",
      showSearch: false,
      tabId: null,
      cards: [],
      rooms: [],
      progress: null,
      roomTypes: [],
      room_type: null,
      action_type: null,
    };
  },
  created() {
    this.room_list();
    this.get_room_types();
    this.getFloors();
  },

  methods: {
    setActionType(action) {
      this.action_type = action;

      let actionPayload = {
        cleaning:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhVT4jPEIpGxT4pXAXp416n4ffJeHRqrKWw&s",
        checkout:
          "data:image/jpeg;base64,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",
      };
      this.imageSrc = actionPayload[action];
    },
    getFloors() {
      this.$axios
        .get(`floor-list`, {
          params: {
            company_id: this.$auth.user.company.id,
          },
        })
        .then(({ data }) => {
          if (data.length > 0) {
            this.floors = data;
          }
        });
    },
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
