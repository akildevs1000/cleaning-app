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
      <v-col cols="12">
        <template>
          <v-card outlined>
            <v-card-title>
              <v-avatar size="70" tile>
                <v-img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAA3NzeJiYkpKSnr6+vc3NwiIiLz8/M6Ojr29vY0NDQvLy9GRkbx8fGPj4+0tLTi4uLDw8OdnZ0cHBxjY2OlpaVSUlJbW1tubm4+Pj5MTEzJycmqqqqXl5e8vLzT09N1dXVoaGiAgIAVFRUXFxd8fHwLCwtzc3Ox5psWAAAI/klEQVR4nO2dbYOyKhCGc8varLbs/T3d2nr+/y88lagoCKMiMJ7ub21UXKvCMDMMnY5iecfpar98jDfh2lX93TYo2DmU9udv0x1SLH/l5LRcm+6TUp3zfC+NfdPdUiZvxwN86mi6Z6q0LwB0nJnprqkR8whSCkx3ToW6AkDHacG8cRQCOkPT/auviZjQuZjuYF1dJIDOyHQP6+ohI8Q+nvpSQOfXdB/raS0ndDzTnayl4sk+1dx0J2tpCSBcmO5kHbnygcZxpqZ7WUd9AKCzM93LOgoghAfTvayj9l9DF0KI+jls/1iqdD78CX4a7Ws1LQCEMJvG3z6bruxbTiqzS72o8V/D/a0gVWuLK2lt37AkXR+OYd8zJs0tnDxlYw1weRg3/2q2t1Uk8dMAL6HNhJ2pkBA6ONpM2NkKAMFeb6sJvVEh4An8JVYTFnu9S8QtLCdUEHuynbDTZx7Gx7qUB8p6wueskblVl9OSMWAEhE9dwknv9liONovysVEchG9V9I4iIqyoDyF+fQgNyC0pyexhFaG/2I4g3vy8BodrsVPKHkJ/OqgAl2pXAGkLoXsV9R6mQ8D7ZksIIb5DgFYcv6gVhJ4oNaic+syX20DoFi90y4vxT1lA+KOQj4NoASEkQlFGQfbrzRMWJVhWV9YLZ5zwpBzQmWR+wDihesBcxptpQrHXt6Iy7nDDhKBgdnnRue6GCSG5XRVE0xgmPDRDSA+nZgkBgd5qonIYzBI2MFVEolKkzRIqWDIVyBbCsDHC1LVhlpANEB4upa/ryZuzf0xXUWYJ2WXTcxDclAN82Wh35q9p+C3+i5HdCx7jmRl0ZBtJGG07PMsoddrEf1kuZoF+QiZ5rUHClx7w0DFSQsfZ681+9/60EzpDrYhaCPMuZq27NLxb84Ssn1Ln7kyWsFeecCMi/Ob4KXXmTntMkKIiIZuxEREG3EzjdhC+HRkFq0+NCcPNEhZ60jWmC3vMjyskDApDWRrniwYJj8VLz6U+wCYJe8UfuLaDUCCdBRmMEGrNaGcJx9UISwRYVzoBTRCGWgENEOre/q2bcKS96otmQs13qDLCA5TQRIEClnBUjRAS4DHja9NJaMRf+v0/JPz6EH4IrSccViMUxCEPsR+hrYRhxzLCvWLCmeHomhLCV3Rtxn/rvQOsHYT8Khr/3j/SDkJu4hGxQy0jnFQj5OzEHMRx7pYQMuVs0uBESwjzeStUrLcthJn8sR6dz94aQirCds247S0jfE3fFQk7fvdVAmMY5pwxLSJ8yvVZX1O7CHmyjPDlOGsTIbuX5EOIjZA1Jz+EHO0lP2IZ4Sv950P4IczJKCG7GeFDiJ/wFWX/EH4Ic/oQNirWzflKUW4/YYEDu0WEUdHYthISN2eZy2g1IVuWPHbk/gzbTiiue4mHkL1LqbSlsAWEP79Md3vUdg9gOQlZJpBBQn6xgUPq8ZQdFmQ5of9V1OUk/+yH2hZ1m3a7U+7edlsJRbWs73EjaiR6F4LgXnVLCcUTXrK9LN39+koA59tzdhLKqpHHiOkWTGSE8lIKcU2E5FojI4wLwTv50TJ9HeSa4iJMBoxzvvKHm9gA8aFqcS4QKsLkHp3l79czVdksLjGDkTAeIN/PGm2avmeJhJm07uIjjFOft9HLdDFIZvpZ9uURH2GcC5rU5vi5rKdnqt4Byf6JLWp8hMRaK94jF9+4xEDdoSPM9p8nMmeQmmRnbITkudoImpAnkawVL9gIyQQnOozKz/wTfGyEpJeiw6i8aIvrKEptciWEsp5rJyTreuGO8ehBfET75mXX0DpCMhcMBOqR5HOkhHCf/Ti6S9ERwku0kSOojtgIpUdxJSJ7kk/YCCXnVFEi8+EUGyG8VOI5+sAVGyG86CxZXPy2lzCI2u/REYLPByDp6A90hOCigT7dQ0yE0MqPS9osRUUIrfBACjpLvRj2EUKNGpIZO8NHyCk2yhXx7K/xEUKnfFIpZ4qPkC2kwBeZ8FftJSSOqC98hGlcRqwg00FUhMA8EjfTQVSEIYwwahyngqMiBPoxosaxAxwVIcyo6UWN5/RLLIQwPwYJTcWRKFSE/PIAeXWjxnG8GBUhzKghbv849QsVoQs6AJCYNHGgHxWhB5rySQpfnGeKihB29Eo04SeV93ERgoyazAofG2EIAHxEhMm4i4sQUk+VxD2TZBRchJApf5VriosQErogOabJ5S4mHIl+qmOGkE3RZ0VMmiTBFBch5LA1ktaW5LrjImSOnOCIZDIkDnJkhNwTC7KKghap+YOMEHDyaBS0SMtKICNkd5LkdYvyMNInFhmh/ODKr5xJg41QHrogGV+pbYCMUG7UEJMmrUuKjFDux8gGLfARck6Uy4lEuNPta9gIXXGoexkf6JuaBtgIOx2/Xyw/rihH3c34CEHatZ2QXoO0ktClM2/aSOhnBtwWEub2YLaK0PO84Jw/Va+YcCz5OgsJuRz1Cce+72o8U04kxYS0Q2E5CWd9SXsNUkrosvHY5dQ0pELCS4F1ONB9am5WyghnhUUNnp/SeRppXooIj4Lj8146a0TKSQmhW3SAZaquVipaKgghh5YId5c1qvqEPqwqykDvCdapahOCt+WYOMXrpbqE0ERy8UbWJlWP0CtTCk3jubm0ahF6sEeQSOcB1pTqEMIyWVJt58fZYvf193e7PSb3maahpwahBy/zxtdOyxmQNQjl07xU64Je2UFY4kjZYmk4TZcbmRqJ33kLEj0HSFQqQI24V+KdbsqNWaVV5++8tyuocUOAa5K87x1uEkc64ud9O5XVtMHKnpjgkFTFb14CQBzjUHWTvhQ0jMgJgt+id3j3Yfo5Zdew8dPJOeFF8mhwLhM1uisZSiMNG577mVlhWwiRqe0ZqkNs2p7Lzdy99D+aK/m5zHpAL+BNxlI17Y/LrIA29C2TmRMnjIt3/q+u4UbUuFE+Tzp6y3n+junqgT83+6f7qqQBzlFxHStlCqaH3mBy5cxNwXnzfOd+EY0Gnnu8zNaL7j0M/+12v6vVdrvZbLa/u/u1e14s1uv16TSbXS7z4zEI+n6/HwTHy2l9DrfDpTPYb8Xm6X/gA5F+AbtUKwAAAABJRU5ErkJggg=="
                ></v-img>
              </v-avatar>
              {{ selectedRoom?.room_no || "---" }}
              {{ selectedRoom?.room_type || "---" }}
              <v-spacer />
              <div>
                <v-icon
                  large
                  :color="happyStatus.color"
                  @click="setStatus(`Cleaned`)"
                  >{{ happyStatus.icon }}</v-icon
                >
                <v-icon
                  large
                  :color="sadStatus.color"
                  @click="setStatus(`Dirty`)"
                  >{{ sadStatus.icon }}</v-icon
                >
              </div>
            </v-card-title>

            <v-card-text class="pt-5">
              <v-row>
                <v-col cols="6">
                  <div style="display: flex">
                    <v-icon large>mdi-clock-outline</v-icon>
                    <div
                      class="ml-2 mt-1"
                      style="display: inline-block; line-height: 1.3"
                    >
                      <div>{{ FormData?.start_time }}</div>
                      <div>{{ FormData?.end_time }}</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" class="text-right">
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
                <v-col cols="12">
                  <v-row class="py-5">
                    <v-col cols="6">
                      <div
                        style="
                          min-height: 100px;
                          border-radius: 10px;
                          border: 1px solid lightgreen;
                        "
                        class="align-center justify-center d-flex"
                      >
                        <v-avatar size="70" class="">
                          <v-img
                            style="height: 100%; width: 100%"
                            @click="start"
                            src="/start.png"
                            class="mt-2"
                          ></v-img>
                        </v-avatar>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div
                        style="
                          min-height: 100px;
                          border-radius: 10px;
                          border: 1px solid lightcoral;
                        "
                        class="align-center justify-center d-flex"
                      >
                        <v-avatar size="70" class="">
                          <v-img @click="stop" src="/stop.png"></v-img>
                        </v-avatar>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
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
      happyStatus: {
        icon: `mdi-emoticon-happy-outline`,
        color: `green lighten-3`,
      },
      sadStatus: {
        icon: `mdi-emoticon-sad-outline`,
        color: `red lighten-3`,
      },
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
      const isCleaned = status === "Cleaned";

      this.happyStatus = {
        icon: isCleaned ? "mdi-emoticon-happy" : "mdi-emoticon-happy-outline",
        color: isCleaned ? "green" : "green lighten-3",
      };

      this.sadStatus = {
        icon: isCleaned ? "mdi-emoticon-sad-outline" : "mdi-emoticon-sad",
        color: isCleaned ? "red lighten-3" : "red",
      };

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
