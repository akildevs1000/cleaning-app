<template>
  <span>
    <style>
      /* Apply body background directly to v-app to ensure it's not overridden */
      .v-application {
        background-color: #e8ebf0 !important;
        /* Changed to a slightly darker light grey for more prominence */
      }

      /* Ensure the primary color is applied directly to the button component */
      .v-btn.v-btn--has-bg.primary {
        background-color: #26a69a !important;
        /* Specific button background color */
        border-color: #26a69a !important;
        /* Specific button border color */
      }

      /* Style for the individual information rows (cards) with white background */
      .info-item-card {
        background-color: white;
        /* Card background is white */
        border-radius: 12px;
        /* Rounded corners for the info rows */
        margin-bottom: 12px;
        /* Spacing between info rows */
        padding: 12px 16px;
        /* Padding inside the info rows */
        display: flex;
        align-items: center;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        /* Subtle shadow for individual info cards */
      }

      /* Remove generic icon color CSS as colors are now applied via props */
      .info-item-card .v-list-item__icon .v-icon,
      .info-item-card .v-icon {
        margin-right: 16px;
        /* Space between icon and text */
        /* color is now set by individual v-icon color prop */
      }

      .info-item-card .info-text-container {
        flex-grow: 1;
      }

      .info-item-card .info-label {
        font-size: 0.75rem;
        /* Smaller font for labels (e.g., "Number", "Guest Name") */
        color: rgba(0, 0, 0, 0.6);
        /* Lighter color for labels */
        line-height: 1;
      }

      .info-item-card .info-value {
        font-size: 1rem;
        /* Standard font size for values (e.g., "305", "John Doe") */
        font-weight: 500;
        /* Medium font weight for values */
        color: rgba(0, 0, 0, 0.87);
        /* Darker color for values */
        line-height: 1.5;
      }

      /* Center the toolbar title */
      .v-toolbar__title {
        text-align: center;
        flex-grow: 1;
      }

      /* Enforce mobile-like width for the main content card */
      .v-card {
        width: 100%;
        /* Ensures the card takes full width up to max-width */
        max-width: 400px;
        /* Constrains the max width to simulate a mobile device */
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
          0px 2px 2px 0px rgba(0, 0, 0, 0.14),
          0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        /* Add subtle shadow */
        background-color: white !important;
        /* Main card background is white */
        border-radius: 15px !important;
        /* Applied border-radius 15px as requested */
      }

      /* Style for the app bar to make it prominent */
      .v-app-bar.v-toolbar {
        background-color: #ffffff !important;
        /* White background for the app bar */
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
          0px 4px 5px 0px rgba(0, 0, 0, 0.14),
          0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
        /* More pronounced shadow */
        border-radius: 15px 15px 0 0 !important;
        /* Match top border radius of the card */
      }

      .v-app-bar .v-toolbar__title {
        font-size: 1.5rem !important;
        /* Larger font size for the header title */
        font-weight: 600 !important;
        /* Bolder title */
        color: #333333 !important;
        /* Darker color for the title */
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
    <v-card flat class="mx-auto" width="100%">
      <!-- New Header - v-app-bar -->

      <!-- Guest Information Section (visible when not cleaning) -->
      <v-card-text v-if="!displayTime" class="pa-6">
        <h2 class="text-h6 font-weight-medium mb-4">Guest Information</h2>

        <!-- Room Number -->
        <div class="info-item-card">
          <v-icon color="#42A5F5">mdi-door</v-icon>
          <!-- Blue -->
          <div class="info-text-container">
            <div class="info-label">Number</div>
            <div class="info-value">{{ selectedRoom?.room_no || "---" }}</div>
          </div>
        </div>

        <!-- Room Type -->
        <div class="info-item-card">
          <v-icon color="#FFC107">mdi-bed</v-icon>
          <!-- Amber -->
          <div class="info-text-container">
            <div class="info-label">Type</div>
            <div class="info-value">{{ selectedRoom?.room_type || "---" }}</div>
          </div>
        </div>

        <!-- Guest Name -->
        <div class="info-item-card">
          <v-icon color="#9C27B0">mdi-account</v-icon>
          <!-- Purple -->
          <div class="info-text-container">
            <div class="info-label">Guest Name</div>
            <div class="info-value">
              {{ selectedRoom?.guest_name || "---" }}
            </div>
          </div>
        </div>

        <!-- Check In -->
        <div class="info-item-card">
          <v-icon color="#E57373">mdi-calendar</v-icon>
          <!-- Light Red -->
          <div class="info-text-container">
            <div class="info-label">Check In</div>
            <div class="info-value">
              {{ selectedRoom?.checkin_datetime_only_display || "---" }}
            </div>
          </div>
        </div>

        <!-- Check Out -->
        <div class="info-item-card">
          <v-icon color="#E57373">mdi-calendar</v-icon>
          <!-- Light Red -->
          <div class="info-text-container">
            <div class="info-label">Check Out</div>
            <div class="info-value">
              {{ selectedRoom?.checkin_datetime_only_display || "---" }}
            </div>
          </div>
        </div>

        <!-- Last Cleaned -->
        <div class="info-item-card">
          <v-icon color="#4CAF50">mdi-clock-outline</v-icon>
          <!-- Green -->
          <div class="info-text-container">
            <div class="info-label">Last Cleaned</div>
            <div class="info-value">
              {{ selectedRoom?.last_cleaned_at || "Not Available" }}
            </div>
          </div>
        </div>

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
              START CLEANING
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- New Section for Cleaning Actions (visible when cleaning) -->
      <v-card-text v-else class="pa-6 cleaning-actions-card">
        <v-row v-if="displayTime" justify="center" class="pb-5">
          <v-col cols="12" class="text-center">
            <v-card class="pa-3 d-inline-block" elevation="2" rounded="lg">
              <span class="text-h6 font-weight-bold blue--text">
                {{ displayTime }}
              </span>
            </v-card>
          </v-col>
        </v-row>

        <v-card
          class="pa-4 mb-6"
          :style="
            error ? 'border: 1px solid #f96363; border-radius: 12px;' : ''
          "
          rounded="lg"
          flat
          outlined
        >
          <v-row dense justify="space-around">
            <v-col>
              <div class="text-center mb-4">
                <div
                  class="mb-3"
                  :class="isDark ? 'white--text' : 'grey--text'"
                >
                  Give feedback
                </div>
                <v-btn-toggle v-model="FormData.status" rounded outlined>
                  <v-btn dense x-large value="Dirty" @click="error = false">
                    <v-icon x-large color="error">mdi-emoticon-sad</v-icon>
                  </v-btn>
                  <v-btn dense x-large value="Neutral" @click="error = false">
                    <v-icon x-large color="yellow darken-3"
                      >mdi-emoticon-neutral</v-icon
                    >
                  </v-btn>
                  <v-btn dense x-large value="Cleaned" @click="error = false">
                    <v-icon x-large color="success">mdi-emoticon-happy</v-icon>
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
          Stop Cleaning
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
        id: this.lastInsertedRecord.id
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
