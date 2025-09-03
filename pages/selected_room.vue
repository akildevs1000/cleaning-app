<template>
  <span>
    <style>
      /* Ensure the primary color is applied directly to the button component */
      .v-btn.v-btn--has-bg.primary {
        background-color: #26a69a !important;
        /* Specific button background color */
        border-color: #26a69a !important;
        /* Specific button border color */
      }

      /* Center the toolbar title */
      .v-toolbar__title {
        text-align: center;
        flex-grow: 1;
      }

      /* Styling for the new cleaning actions section */
      .cleaning-actions-card {
        padding: 24px;
        padding-bottom: 90px;
        /* Add padding at the bottom to make space for the fixed button */
      }

      .cleaning-actions-card .v-btn {
        margin-bottom: 12px;
        /* Add spacing between buttons */
      }

      .cleaning-actions-card .v-file-input {
        margin-bottom: 24px;
        /* More space below file input */
      }

      /* Custom style for big icons on buttons */
      .v-btn .v-icon.v-icon--left {
        font-size: 36px !important;
        /* Increase icon size for buttons */
      }

      /* Styles for the v-file-input to make its icon big and match height */
      .v-file-input .v-input__prepend-outer .v-icon {
        font-size: 36px !important;
        /* Make file input icon big */
      }

      /* Adjust the height and alignment of the file input control */
      .v-file-input .v-input__control {
        min-height: 56px !important;
        /* Match x-large button height */
      }

      /* Adjust vertical alignment for the prepend icon in the file input */
      .v-file-input .v-input__prepend-outer {
        margin-top: 8px !important;
        /* Adjust vertical alignment for consistency */
      }

      /* Styles for the fixed "Stop Cleaning" button container */
      .fixed-bottom-button-container {
        position: fixed;
        bottom: 0;
        left: 50%;
        /* Center horizontally */
        transform: translateX(-50%);
        /* Adjust for perfect centering */
        width: 100%;
        max-width: 400px;
        /* Match the max-width of the main card */
        padding: 16px 24px;
        /* Add padding around the button */
        z-index: 10;
        /* Ensure it stays on top */
        border-top-left-radius: 15px;
        /* Apply border radius to match card corners */
        border-top-right-radius: 15px;
        /* Apply border radius to match card corners */
      }
      @keyframes flickerGlow {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      .flicker-btn {
        animation: flickerGlow 1.2s infinite ease-in-out;
      }
    </style>

    <v-container class="pa-8">
      <v-row>
        <v-col>
          <v-card
            flat
            outlined
            class="mx-auto"
            width="100%"
            style="border-radius: 10px"
          >
            <v-card-text>
              <WidgetsProgressCustom
                v-if="$store.state.progress"
                :total="$store.state.progress.total"
                :engaged="$store.state.progress.engaged"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            flat
            outlined
            class="mx-auto"
            width="100%"
            style="border-radius: 10px"
          >
            <!-- Guest Information Section (visible when not cleaning) -->
            <v-card-text v-if="!displayTime" class="pa-6">
              <v-row dense>
                <!-- Room Number -->
                <v-col cols="12">
                  <h2 class="text-h6 font-weight-medium mb-4">
                    Guest Information
                  </h2>
                </v-col>

                <v-col cols="12">
                  <v-card
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="red lighten-4">
                      <v-icon color="red">mdi-key-outline</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">{{
                      selectedRoom?.room_no || "---"
                    }}</span>
                  </v-card>
                </v-col>

                <!-- Hotel Name -->
                <v-col cols="12">
                  <v-card
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="blue lighten-4">
                      <v-icon color="blue">mdi-bed</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">{{
                      selectedRoom?.room_type || "---"
                    }}</span>
                  </v-card>
                </v-col>

                <!-- Guest Name -->
                <v-col cols="12">
                  <v-card elevation="0"
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="green lighten-4">
                      <v-icon color="green">mdi-account</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">
                      {{ selectedRoom?.guest_name || "---" }}</span
                    >
                  </v-card>
                </v-col>

                <!-- Check-in -->
                <v-col cols="12">
                  <v-card
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="green lighten-4">
                      <v-icon color="green">mdi-login</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">{{
                      selectedRoom?.checkin_datetime_only_display || "---"
                    }}</span>
                  </v-card>
                </v-col>

                <!-- Check-out -->
                <v-col cols="12">
                  <v-card
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="red lighten-4">
                      <v-icon color="red">mdi-logout</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">{{
                      selectedRoom?.checkout_datetime_only_display || "---"
                    }}</span>
                  </v-card>
                </v-col>

                <!-- Cleaning -->
                <v-col cols="12">
                  <v-card
                    style="border-radius: 10px"
                    outlined
                    class="d-flex align-center pa-3"
                  >
                    <v-avatar size="40" class="mr-3" color="indigo lighten-4">
                      <v-icon color="indigo">mdi-broom</v-icon>
                    </v-avatar>
                    <span class="subtitle-1 font-weight-medium">{{
                      selectedRoom?.last_cleaned_at || "Not Available"
                    }}</span>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12 pt-10">
                  <v-btn
                    block
                    dark
                    class="rounded-pill pa-5 flicker-btn"
                    color="primary"
                    @click="start"
                  >
                    <v-icon left>mdi-play</v-icon>
                    START {{ selectedRoom?.action_type }}
                  </v-btn>
                  <br />
                  <v-btn
                    block
                    dark
                    class="rounded-pill pa-5"
                    color="red"
                    @click="$router.push(`/`)"
                  >
                    <v-icon left large>mdi-close</v-icon>
                    CANCEL
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>

            <!-- New Section for Cleaning Actions (visible when cleaning) -->
            <v-card-text v-else class="pa-6 cleaning-actions-card">
               <v-card v-if="displayTime && selectedRoom.action_type == 'cleaning'"
                class="pa-4 mb-6"
                rounded="lg"
                flat
                outlined
              >
                <v-row dense>
                  <v-col>
                    <div class="text-center mb-4">
                      <div
                        class="mb-3"
                        :class="isDark ? 'white--text' : 'grey--text'"
                      >
                      </div>
                      <span class="text-h6 font-weight-bold blue--text">
                      {{ displayTime }}
                    </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>

              <v-card
                class="pa-4 mb-6"
                :style="
                  error ? 'border: 1px solid #f96363; border-radius: 12px;' : ''
                "
                rounded="lg"
                flat
                outlined
              >
                <v-row dense>
                  <v-col>
                    <div class="text-center mb-4">
                      <div
                        class="mb-3"
                        :class="isDark ? 'white--text' : 'grey--text'"
                      >
                        Give feedback
                      </div>
                      <v-btn-toggle v-model="FormData.status" rounded outlined>
                        <v-btn dense large value="Dirty" @click="error = false">
                          <v-icon x-large color="error"
                            >mdi-emoticon-sad</v-icon
                          >
                        </v-btn>
                        <v-btn
                          dense
                          large
                          value="Neutral"
                          @click="error = false"
                        >
                          <v-icon x-large color="yellow darken-3"
                            >mdi-emoticon-neutral</v-icon
                          >
                        </v-btn>
                        <v-btn
                          dense
                          large
                          value="Cleaned"
                          @click="error = false"
                        >
                          <v-icon x-large color="success"
                            >mdi-emoticon-happy</v-icon
                          >
                        </v-btn>
                      </v-btn-toggle>
                    </div>
                  </v-col>
                </v-row>
              </v-card>

              <v-card
                class="pt-8 px-8 pb-2"
                rounded="lg"
                flat
                outlined
                :color="isDark ? darkColors.card : ''"
                :dark="isDark"
                :light="!isDark"
              >
                <v-row dense>
                  <v-col
                    class="text-center"
                    :class="isDark ? 'white--text' : 'grey--text'"
                  >
                    Take Photo or Record Voice
                  </v-col>
                  <v-col cols="12">
                    <WidgetsUploadAttachment
                      validationMessage="Room not found"
                      :rule="selectedRoom"
                      :displayPreview="false"
                      :label="`${selectedRoom?.room_no}_${Date.now()}.png`"
                      @files-selected="handleFileSelection"
                    />
                  </v-col>
                  <v-col cols="12">
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

              <v-btn
                v-if="displayTime"
                block
                dark
                color="error"
                class="rounded-pill pa-5 flicker-btn mt-10"
                @click="stop"
              >
                <v-icon left>mdi-stop-circle-outline</v-icon>
                Stop {{ selectedRoom?.action_type }}
              </v-btn>

              <!-- <v-btn
          v-if="!isCleaningStarted"
          block
          dark
          color="blue"
          class="rounded-pill pa-5 mt-10"
          @click="submit"
        >
          Save
        </v-btn> -->
            </v-card-text>
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
      error: false,
      displayTime: null,
      isDark: false,
      selectedRoom: null,
      isCleaningStarted: false, // New data property to control section visibility
      isInitialState: true,

      FormData: {
        start_time: "00:00:00",
        end_time: "00:00:00",
        status: null,
      },
      attachments: [],
      timer: null,
      lastInsertedRecord: null,
    };
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
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    handleFileSelection(e) {
      this.FormData = {
        ...this.FormData,
        start_time: this.isInitialState
          ? this.formatTime(new Date())
          : this.FormData.start_time,
        ...this.selectedRoom,
        attachments: e,
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
    async start() {
      this.isCleaningStarted = true;

      let start_time = this.getStartTime();

      this.FormData = {
        ...this.FormData,
        start_time: start_time,
        room_id: this.selectedRoom.id,
        action_type: this.selectedRoom.action_type,
        end_time: "00:00:00",
        cleaned_by_user_id: this.$auth.user.id,
        company_id: this.$auth.user.company_id,
      };

      this.startTimer(this.FormData.end_time);

      this.isInitialState = false;

      let { data } = await this.$axios.post(
        `room-cleaning-start`,
        this.FormData
      );

      this.lastInsertedRecord = data.record;
    },
    async stop() {
      this.isCleaningStarted = false;

      let end_time = this.formatTime(new Date());
      let total_time = this.$utils.calculateTotalTime(
        this.FormData.start_time,
        end_time
      );

      this.FormData = {
        ...this.FormData,
        end_time: end_time,
        total_time: total_time,
        cleaned_by_user_id: this.$auth.user.id,
        company_id: this.$auth.user.company_id,
        room_id: this.selectedRoom.id,
        id: this.lastInsertedRecord.id,
      };

      this.submit(this.FormData);
    },

    async submit(FormData) {
      this.error = !FormData.status;

      if (this.error) return;

      await this.$axios.post(`room-cleaning`, FormData);

      this.isInitialState = true;

      this.setAvailable();
    },

    async setAvailable() {
      const selectedRoom = this.selectedRoom;

      // Validate room selection
      if (!selectedRoom?.booked_room_id || !selectedRoom?.booking_id) {
        console.log("Skipping room as available...");
        this.$router.push("/");
        return;
      }

      try {
        console.log("Setting room as available...");

        const payload = {
          cancel_by: this.$auth.user.id,
          bookedRoomId: selectedRoom.booked_room_id, // use consistent naming
        };

        const { data } = await this.$axios.post(
          `/set_available/${selectedRoom.booking_id}`,
          payload
        );

        if (!data.status) {
          console.error(data.message || "Failed to set room as available.");
          return;
        }

        this.$router.push("/");
        // Optionally: refresh rooms list or navigate if needed
        // this.fetchRooms?.();
      } catch (error) {
        console.error("Error in setAvailable:", error);
      }
    },
    getStartTime() {
      return this.isInitialState
        ? this.formatTime(new Date())
        : this.FormData.start_time;
    },
    formatTime(date) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    },
    startTimer(initialTime) {
      let [hours, minutes, seconds] = initialTime.split(":").map(Number);

      // Create Date object for today
      this.dateObj = new Date();
      this.dateObj.setHours(hours, minutes, seconds, 0);

      // Clear previous timer if exists
      if (this.timer) clearInterval(this.timer);

      // Start ticking
      this.timer = setInterval(() => {
        this.dateObj.setSeconds(this.dateObj.getSeconds() + 1);

        this.displayTime = this.dateObj.toLocaleTimeString([], {
          hour12: false,
        });
      }, 1000);
    },
  },
};
</script>
