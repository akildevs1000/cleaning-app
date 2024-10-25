<template>
  <span class="pt-15">
    <v-row>
      <v-col cols="12" class="text-right">
        <v-icon color="black" @click="room_list">mdi-reload</v-icon>
      </v-col>
      <v-col v-for="(item, index) in cards" :key="index">
        <v-card
          elevation="0"
          height="70"
          class="text-center pt-1"
          :style="`background-color:${item.bgColor}; color:${item.color}; border-radius: 12px`"
          @click="setTabId(index)"
        >
          <small class="px-1" style="font-size: 9px">{{ item.label }}</small>
          <div class="pa-1 mt-1" style="font-size: 14px">
            {{ item.value }} <span v-if="item.sub_value">/</span>
            <small v-if="item.sub_value" style="font-size: 9px">{{
              item.sub_value
            }}</small>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="pt-5">
        <AssetsProgressCustom
          v-if="progress"
          :total="progress.total"
          :engaged="progress.engaged"
        />
      </v-col>
      <v-col cols="12">
        <WidgetsVacantRoomCard
          bgColor="#d9534f"
          color="white"
          v-if="tabId == 0"
          @selectedRoom="handleSelectedRoom"
          :items="rooms.DirtyRooms"
        />
        <WidgetsVacantRoomCard
          bgColor="#ddbc91"
          color="black"
          v-if="tabId == 1"
          @selectedRoom="handleSelectedRoom"
          :items="rooms.Occupied"
        />
        <WidgetsVacantRoomCard
          bgColor="#f5ece3"
          color="black"
          v-if="tabId == 2"
          @selectedRoom="handleSelectedRoom"
          :items="rooms.vacantRooms"
        />
        <WidgetsVacantRoomCard
          bgColor="#75a29f"
          color="white"
          v-if="tabId == 3"
          @selectedRoom="handleSelectedRoom"
          :items="rooms.blockedRooms"
        />
      </v-col>
      <v-col cols="8">
        <v-card
          class="pa-3"
          outlined
          style="min-height: 100px; border-radius: 10px"
        >
          <v-row>
            <v-col cols="4">
              <div style="display: flex">
                <v-avatar size="20">
                  <v-img src="/cleaner.png"></v-img>
                </v-avatar>
                <div
                  class="ml-2"
                  style="display: inline-block; line-height: 1.1"
                >
                  <small>{{ selectedRoom?.room_no || "---" }}</small>
                  <br />
                  <small>{{ selectedRoom?.room_type || "---" }}</small>
                </div>
              </div>
            </v-col>
            <v-col cols="8" class="text-right">
              <v-icon color="green" @click="setStatus(`Cleaned`)"
                >mdi-emoticon-happy-outline</v-icon
              >
              <v-icon color="red" @click="setStatus(`Dirty`)"
                >mdi-emoticon-sad-outline</v-icon
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2">
              <div style="display: flex">
                <v-icon>mdi-clock-outline</v-icon>
                <div
                  class="ml-2"
                  style="display: inline-block; line-height: 1.1"
                >
                  <small>{{ FormData?.start_time }}</small>
                  <small>{{ FormData?.end_time }}</small>
                </div>
              </div>
            </v-col>
            <v-col cols="10" class="text-right">
              <span class="primary--text">
                <WidgetsUploadAttachment
                  validationMessage="Room not found"
                  :rule="selectedRoom"
                  :displayPreview="false"
                  :label="`${selectedRoom?.room_no}_${Date.now()}.png`"
                  :name="`${selectedRoom?.room_no}_${Date.now()}.png`"
                  @file-selected="
                    handleFileSelection(
                      $event,
                      `${selectedRoom?.room_no}_${Date.now()}.png`
                    )
                  "
                />
              </span>
              <WidgetsVoice
                @voice-note="
                  handleVoiceNote(
                    $event,
                    `${selectedRoom?.room_no}_${Date.now()}.mp3`
                  )
                "
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" class="px-2">
        <div
          style="min-height: 100px; border-radius: 10px"
          class="align-center justify-center d-flex grey lighten-3"
        >
          <v-avatar size="70" class="">
            <v-img
              style="height: 100%; width: 100%"
              v-if="isStart"
              @click="start"
              src="/start.png"
              class="mt-2"
            ></v-img>
            <v-img v-if="isStop" @click="stop" src="/stop.png"></v-img>
          </v-avatar>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <pre>{{ FormData }}</pre>
      </v-col>
    </v-row> -->
  </span>
</template>
<script>
export default {
  data() {
    return {
      isStart: true,
      isStop: false,
      selectedRoom: null,
      isInitialState: true,
      FormData: {
        start_time: "00:00:00",
        end_time: "00:00:00",
        status: "Dirty",
      },
      tabId: 0,
      cards: [],
      filterDate: new Date().toJSON().slice(0, 10),

      loading: true,
      rooms: [],
      progress: null,
      attachments: [],
    };
  },
  watch: {
    fieldName() {},
  },
  created() {
    this.room_list();
    // setInterval(() => {
    //   this.room_list();
    // }, 1000 * 10);
  },

  methods: {
    handleSelectedRoom(e) {
      this.selectedRoom = e;
    },
    handleFileSelection(e, name) {
      this.FormData = {
        ...this.FormData,
        start_time: this.isInitialState
          ? this.formatTime(new Date())
          : this.FormData.start_time,
        ...this.selectedRoom,
        before_attachment: e,
        before_attachment_name: name,
      };
      this.isInitialState = false;
    },

    handleVoiceNote(e, name) {
      this.FormData = {
        ...this.FormData,
        voice_note: e,
        voice_note_name: name,
      };
    },

    formatTime(date) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    },
    start() {
      if (!this.selectedRoom) {
        alert(`Room not Selected`);
        return;
      }
      this.FormData = {
        ...this.FormData,
        start_time: this.isInitialState
          ? this.formatTime(new Date())
          : this.FormData.start_time,
        end_time: "00:00:00", // Reset end time when starting
      };

      this.isStart = false;
      this.isStop = true;
      this.isInitialState = false; // Flag that initial state is done
    },
    setStatus(status) {
      this.FormData = {
        ...this.FormData,
        start_time: this.isInitialState
          ? this.formatTime(new Date())
          : this.FormData.start_time,
        ...this.selectedRoom,
        status,
      };
    },
    async stop() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      this.FormData = {
        ...this.FormData,
        end_time: `${hours}:${minutes}:${seconds}`,

        total_time: this.$utils.calculateTotalTime(
          this.FormData.start_time,
          `${hours}:${minutes}:${seconds}`
        ),
        cleaned_by_user_id: this.$auth.user.id,
        company_id: this.$auth.user.company_id,
        room_id: this.selectedRoom.id,
      };

      console.log(this.FormData);

      // return;

      await this.$axios.post(`room-cleaning`, this.FormData);

      this.isStop = false;
      this.isStart = true;
      this.isInitialState = true;
      this.room_list();
    },
    setTabId(e) {
      if (!this.isInitialState) {
        return;
      }
      this.tabId = e;
      this.FormData = {
        start_time: "00:00:00",
        end_time: "00:00:00",
        status: "Dirty",
      };
      this.selectedRoom = null;
      this.isInitialState = true;
      this.isStop = false;
      this.isStart = true;
    },
    async room_list() {
      let payload = {
        params: {
          company_id: this.$auth.user && this.$auth.user.company.id,
          check_in: new Date().toJSON().slice(0, 10),
          filter_date: this.filterDate,
        },
      };
      this.$axios.get(`room_list_grid`, payload).then(async ({ data }) => {
        if (!data.status) {
          this.alert("Failure!", data.data, "error");
          return false;
        }
        this.rooms = data;

        let BookedRooms = data.bookedRooms;

        let sold = BookedRooms.map((e) => e.room_no);
        let expectCheckOut = data.expectCheckOut.map((e) => e.room_no);
        let Occupied = data.checkIn.map((e) => e.room_no);
        let blockedRooms = data.blockedRooms.map((e) => e.room_no);
        let dirtyRooms = data.dirtyRoomsList.map((e) => e.room_no);

        let allRoomNumbers = [
          ...sold,
          ...expectCheckOut,
          ...Occupied,
          ...blockedRooms,
          ...dirtyRooms,
        ];

        let uniqueRoomNumbers = [...new Set(allRoomNumbers)];

        let allRoomList = data.allRooms;
        let vacantRooms = allRoomList.filter(
          (e) => !uniqueRoomNumbers.includes(e.room_no)
        );

        this.Occupied = data.checkIn;

        let totalDirty = await this.getRoomStatus(
          data.dirtyRoomsList.map((e) => e.id)
        );
        let totalOccupied = await this.getRoomStatus(
          data.checkIn.map((e) => e.id)
        );
        let totalVac = await this.getRoomStatus(vacantRooms.map((e) => e.id));
        let totalBlocked = await this.getRoomStatus(
          data.blockedRooms.map((e) => e.id)
        );

        let vrs = vacantRooms.map((e) => ({
          id: e.id,
          room_no: e.room_no,
          room_type: e.room_type.name,
          is_cleaned: e.is_cleaned.length,
        }));

        let drs = data.dirtyRoomsList.map((e) => ({
          id: e.id,
          room_no: e.room_no,
          room_type: e.room_type.name,
          is_cleaned: e.is_cleaned.length,
          can_change_status: true,
        }));

        let ors = data.checkIn.map((e) => ({
          id: e.id,
          room_no: e.room_no,
          room_type: e.room_type.name,
          is_cleaned: e.is_cleaned.length,
        }));

        let brs = data.blockedRooms.map((e) => ({
          id: e.id,
          room_no: e.room_no,
          room_type: e.room_type.name,
          is_cleaned: e.is_cleaned.length,
        }));

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
            value: drs.filter((e) => e.is_cleaned).length,
            sub_value: this.getSubValue(dirtyRooms.length, totalDirty),
          },
          {
            color: "black",
            bgColor: "#ddbc91",
            label: "Occupied",
            value: ors.filter((e) => e.is_cleaned).length,
            sub_value: this.getSubValue(Occupied.length, totalOccupied),
          },
          {
            color: "black",
            bgColor: "#f5ece3",
            label: "Vacant",
            value: vrs.filter((e) => e.is_cleaned).length,
            sub_value: this.getSubValue(vacantRooms.length, totalVac),
          },
          {
            color: "white",
            bgColor: "#75a29f",
            label: "Blocked",
            value: brs.filter((e) => e.is_cleaned).length,
            sub_value: this.getSubValue(blockedRooms.length, totalBlocked),
          },
        ];

        this.progress = {
          total: allRoomList.length + blockedRooms.length,
          engaged: this.$utils.getSum(this.cards.map((e) => e.value)),
        };
      });
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