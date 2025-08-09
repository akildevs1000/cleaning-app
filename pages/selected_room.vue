<template>
  <span>
    <style>
      /* Apply body background directly to v-app to ensure it's not overridden */
      .v-application {
        background-color: #e8ebf0 !important; /* Changed to a slightly darker light grey for more prominence */
      }

      /* Ensure the primary color is applied directly to the button component */
      .v-btn.v-btn--has-bg.primary {
        background-color: #26a69a !important; /* Specific button background color */
        border-color: #26a69a !important; /* Specific button border color */
      }

      /* Style for the individual information rows (cards) with white background */
      .info-item-card {
        background-color: white; /* Card background is white */
        border-radius: 12px; /* Rounded corners for the info rows */
        margin-bottom: 12px; /* Spacing between info rows */
        padding: 12px 16px; /* Padding inside the info rows */
        display: flex;
        align-items: center;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for individual info cards */
      }

      /* Remove generic icon color CSS as colors are now applied via props */
      .info-item-card .v-list-item__icon .v-icon,
      .info-item-card .v-icon {
        margin-right: 16px; /* Space between icon and text */
        /* color is now set by individual v-icon color prop */
      }

      .info-item-card .info-text-container {
        flex-grow: 1;
      }
      .info-item-card .info-label {
        font-size: 0.75rem; /* Smaller font for labels (e.g., "Number", "Guest Name") */
        color: rgba(0, 0, 0, 0.6); /* Lighter color for labels */
        line-height: 1;
      }
      .info-item-card .info-value {
        font-size: 1rem; /* Standard font size for values (e.g., "305", "John Doe") */
        font-weight: 500; /* Medium font weight for values */
        color: rgba(0, 0, 0, 0.87); /* Darker color for values */
        line-height: 1.5;
      }

      /* Center the toolbar title */
      .v-toolbar__title {
        text-align: center;
        flex-grow: 1;
      }

      /* Enforce mobile-like width for the main content card */
      .v-card {
        width: 100%; /* Ensures the card takes full width up to max-width */
        max-width: 400px; /* Constrains the max width to simulate a mobile device */
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
          0px 2px 2px 0px rgba(0, 0, 0, 0.14),
          0px 1px 5px 0px rgba(0, 0, 0, 0.12); /* Add subtle shadow */
        background-color: white !important; /* Main card background is white */
        border-radius: 15px !important; /* Applied border-radius 15px as requested */
      }

      /* Style for the app bar to make it prominent */
      .v-app-bar.v-toolbar {
        background-color: #ffffff !important; /* White background for the app bar */
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
          0px 4px 5px 0px rgba(0, 0, 0, 0.14),
          0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important; /* More pronounced shadow */
        border-radius: 15px 15px 0 0 !important; /* Match top border radius of the card */
      }

      .v-app-bar .v-toolbar__title {
        font-size: 1.5rem !important; /* Larger font size for the header title */
        font-weight: 600 !important; /* Bolder title */
        color: #333333 !important; /* Darker color for the title */
      }

      /* Styling for the new cleaning actions section */
      .cleaning-actions-card {
        padding: 24px;
        padding-bottom: 90px; /* Add padding at the bottom to make space for the fixed button */
      }
      .cleaning-actions-card .v-btn {
        margin-bottom: 12px; /* Add spacing between buttons */
      }
      .cleaning-actions-card .v-file-input {
        margin-bottom: 24px; /* More space below file input */
      }

      /* Custom style for big icons on buttons */
      .v-btn .v-icon.v-icon--left {
        font-size: 36px !important; /* Increase icon size for buttons */
      }

      /* Styles for the v-file-input to make its icon big and match height */
      .v-file-input .v-input__prepend-outer .v-icon {
        font-size: 36px !important; /* Make file input icon big */
      }

      /* Adjust the height and alignment of the file input control */
      .v-file-input .v-input__control {
        min-height: 56px !important; /* Match x-large button height */
      }
      /* Adjust vertical alignment for the prepend icon in the file input */
      .v-file-input .v-input__prepend-outer {
        margin-top: 8px !important; /* Adjust vertical alignment for consistency */
      }

      /* Styles for the fixed "Stop Cleaning" button container */
      .fixed-bottom-button-container {
        position: fixed;
        bottom: 0;
        left: 50%; /* Center horizontally */
        transform: translateX(-50%); /* Adjust for perfect centering */
        width: 100%;
        max-width: 400px; /* Match the max-width of the main card */
        padding: 16px 24px; /* Add padding around the button */
        z-index: 10; /* Ensure it stays on top */
        border-top-left-radius: 15px; /* Apply border radius to match card corners */
        border-top-right-radius: 15px; /* Apply border radius to match card corners */
      }
    </style>
    <v-card flat class="mx-auto" width="100%">
      <!-- New Header - v-app-bar -->

      <!-- Guest Information Section (visible when not cleaning) -->
      <v-card-text class="pa-6">
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
            <div class="info-value">Not available</div>
          </div>
        </div>
      </v-card-text>

      <!-- New Section for Cleaning Actions (visible when cleaning) -->
      <v-card-text class="pa-6 cleaning-actions-card">
        <v-card
          class="pa-4 mb-6"
          rounded="lg"
          flat
          outlined
          :color="isDark ? darkColors.card : ''"
          :dark="isDark"
          :light="!isDark"
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
                <v-btn-toggle rounded color="primary">
                  <v-btn value="sad" x-large @click="setStatus('Dirty')">
                    <v-icon x-large color="error">mdi-emoticon-sad</v-icon>
                  </v-btn>
                  <v-btn value="neutral" x-large @click="setStatus('Neutral')">
                    <v-icon x-large color="yellow darken-3"
                      >mdi-emoticon-neutral</v-icon
                    >
                  </v-btn>
                  <v-btn value="happy" x-large @click="setStatus('Cleaned')">
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
              <v-btn
                class="pa-6"
                block
                outlined
                rounded
                color="primary"
                :dark="isDark"
                :light="!isDark"
              >
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
                Photo
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="pa-6"
                block
                outlined
                rounded
                color="primary"
                :dark="isDark"
                :light="!isDark"
              >
                <WidgetsVoice
                  @voice-note="
                    handleVoiceNote(
                      $event,
                      `${selectedRoom?.room_no}_${Date.now()}.mp3`
                    )
                  "
                />
                Voice
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <div class="mt-5">
          <v-btn
            block
            x-large
            dark
            class="rounded-pill"
            color="primary"
            @click="start"
          >
            <v-icon left>mdi-play</v-icon>
            START CLEANING
          </v-btn>
        </div>
        <div>
          <v-btn
            block
            x-large
            dark
            color="error"
            class="rounded-pill"
            @click="stop"
          >
            <v-icon left>mdi-stop-circle-outline</v-icon>
            Stop Cleaning
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </span>
</template>
<script>
export default {
  data() {
    return {
      isDark: false,
      selectedRoom: null,
      isCleaningStarted: false, // New data property to control section visibility
      isInitialState: true,

      FormData: {
        start_time: "00:00:00",
        end_time: "00:00:00",
        status: "Dirty",
      },
      attachments: [],
    };
  },
  mounted() {
    const data = this.$route.query.data;
    if (data) {
      try {
        this.selectedRoom = JSON.parse(decodeURIComponent(data));
        console.log("🚀 ~ mounted ~ this.selectedRoom:", this.selectedRoom);
      } catch {
        this.selectedRoom = data;
        console.log("🚀 ~ mounted ~ this.selectedRoom:", this.selectedRoom);
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

      this.isCleaningStarted = true;

      let startTime = this.isInitialState
        ? this.formatTime(new Date())
        : this.FormData.start_time;
      console.log("🚀 ~ start ~ startTime:", startTime);

      this.FormData = {
        ...this.FormData,
        start_time: startTime,
        end_time: "00:00:00", // Reset end time when starting
      };
      console.log("🚀 ~ start ~ this.FormData:", this.FormData);

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

      this.isCleaningStarted = false;

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

      this.isInitialState = true;

      this.$router.push("/");
    },
  },
};
</script>
