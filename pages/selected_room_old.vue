<template>
  <span class="pt-6">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card outlined style="border-radius: 15px; padding: 16px">
            <!-- Guest Info -->
            <div class="d-flex align-center mb-4">
              <v-icon color="black" class="mr-2">mdi-briefcase</v-icon>
              <span class="text-subtitle-1 font-weight-medium"
                >Guest: Jhon Wick</span
              >
            </div>

            <!-- Room Details -->
            <v-card-text class="pa-0 mb-4">
              <div
                class="d-flex justify-space-between px-4 py-2"
                style="font-weight: 600; font-size: 1rem"
              >
                <div>
                  Room: <b>{{ selectedRoom?.room_no || "---" }}</b>
                </div>
                <div>
                  Room Type: <b>{{ selectedRoom?.room_type || "---" }}</b>
                </div>
              </div>
            </v-card-text>

            <!-- Main Content -->
            <v-card-title
              class="d-flex flex-column flex-sm-row align-center pa-0"
            >
              <div class="pa-3">
                <img
                  src="/bed.png"
                  alt="Room Bed"
                  style="height: 80px; width: 80px; border-radius: 8px"
                />
              </div>
            </v-card-title>

            <v-row class="py-5">
              <!-- Left side: Upload + Voice -->
              <v-col cols="6">
                <div style="display: flex">
                  <div>
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
                  </div>
                  <div>
                    <WidgetsVoice
                      @voice-note="
                        handleVoiceNote(
                          $event,
                          `${selectedRoom?.room_no}_${Date.now()}.mp3`
                        )
                      "
                    />
                  </div>
                </div>
              </v-col>

              <!-- Right side: Status Emojis -->
              <v-col cols="6" class="text-right">
                <div style="display: flex; justify-content: end">
                  <div>
                    <v-icon
                      large
                      :color="happyStatus.color"
                      @click="setStatus('Cleaned')"
                      style="cursor: pointer"
                    >
                      {{ happyStatus.icon }}
                    </v-icon>
                  </div>
                  <div>
                    <v-icon
                      large
                      :color="neutralStatus.color"
                      @click="setStatus('Neutral')"
                      style="cursor: pointer"
                    >
                      {{ neutralStatus.icon }}
                    </v-icon>
                  </div>
                  <div>
                    <v-icon
                      large
                      :color="sadStatus.color"
                      @click="setStatus('Dirty')"
                      style="cursor: pointer"
                    >
                      {{ sadStatus.icon }}
                    </v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="d-flex justify-space-between flex-wrap">
                  <div class="d-flex align-center mb-2 mb-sm-0">
                    <v-icon color="black" class="mr-2"
                      >mdi-clock-outline</v-icon
                    >
                    <span class="text-subtitle-1"
                      >Check In {{ FormData?.start_time }}</span
                    >
                  </div>

                  <div class="d-flex align-center">
                    <v-icon color="black" class="mr-2"
                      >mdi-clock-outline</v-icon
                    >
                    <span class="text-subtitle-1"
                      >Last Cleaned {{ FormData?.end_time }}</span
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-10">
              <v-col cols="12" class="mb-3">
                <v-btn
                  class="success darken-1 white--text"
                  block
                  @click="start"
                >
                  Start Cleaning
                </v-btn>
              </v-col>

              <v-col cols="12">
                <v-btn
                  block
                  class="white--text"
                  style="background-color: #ec5a5a"
                  @click="stop"
                >
                  Stop Cleaning
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<script>
export default {
  data() {
    return {
      happyStatus: {
        icon: `mdi-emoticon-happy`,
        color: `green lighten-1`,
      },
      sadStatus: {
        icon: `mdi-emoticon-sad`,
        color: `red lighten-1`,
      },
      neutralStatus: {
        icon: `mdi-emoticon-neutral`,
        color: `yellow darken-1`,
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
  mounted() {
    const data = this.$route.query.data;
    if (data) {
      try {
        this.selectedRoom = JSON.parse(decodeURIComponent(data));
      } catch {
        this.selectedRoom = data;
      }
    }
  },
  methods: {
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
        icon: "mdi-emoticon-happy",
        color: "green lighten-1",
      };

      this.sadStatus = {
        icon: "mdi-emoticon-sad",
        color: "red lighten-1",
      };

      this.neutralStatus = {
        icon: "mdi-emoticon-neutral",
        color: "yellow darken-1",
      };

      if (status === "Cleaned") {
        this.happyStatus.color = "green darken-1";
      } else if (status === "Dirty") {
        this.sadStatus.color = "red darken-1";
      } else if (status === "Neutral") {
        this.neutralStatus.color = "yellow darken-2";
      }

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

      this.$router.push("/");
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
