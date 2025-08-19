<template>
  <span>
    <style>
      @keyframes pulse {
        0% {
          /* transform: scale(1); */
          box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7);
        }
        70% {
          /* transform: scale(1.2); */
          box-shadow: 0 0 0 7px rgba(33, 150, 243, 0);
        }
        100% {
          /* transform: scale(1); */
          box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
        }
      }

      .recording-active {
        border-radius: 50px;
        animation: pulse 1s infinite;
      }
    </style>

    <v-btn
      class="pa-6"
      block
      outlined
      rounded
      :color="isRecording ? 'red' : 'primary'"
      @mousedown.native="startRecording"
      @mouseup.native="stopRecording"
      @mouseleave.native="stopRecording"
      @touchstart.native.prevent="startRecording"
      @touchend.native="stopRecording"
    >
      <v-icon large :class="isRecording ? 'recording-active' : ''">
        mdi-microphone-outline
      </v-icon>
      Voice
    </v-btn>

    <v-btn
      class="pa-6"
      block
      outlined
      rounded
      color="primary"
      v-if="recordedBlob"
    >
      <v-icon large @click.stop="togglePlay" color="success">
        {{ isPlaying ? "mdi-pause" : "mdi-play" }}
      </v-icon>

      <v-slider
        hide-details
        v-model="progress"
        step="1"
        :max="recordingDuration"
        min="0"
      ></v-slider>

      <span style="min-width: 40px">{{ formatTime(currentTime) }}</span>
      <v-icon @click="recordedBlob = null"> mdi-close </v-icon>

      <audio
        controls
        ref="customAudioPlayer"
        :src="audioUrl"
        @timeupdate="updateProgress"
        @ended="isPlaying = false"
        style="display: none"
      ></audio>
    </v-btn>
  </span>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      recordedBlob: null,
      audioUrl: null,

      isPlaying: false,
      progress: 0,
      currentTime: 0,

      recordingDuration: 0,
      recordingTimer: null,
    };
  },
  methods: {
    async blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Read as Data URL (Base64)
      });
    },

    async startRecording() {
      this.recordedBlob = null;
      this.recordingDuration = 0;

      try {
        // Add video:true to make WebView allow audio
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false, // or true if needed
        });

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;
        this.audioChunks = [];

        this.recordingTimer = setInterval(() => {
          this.recordingDuration++;
        }, 1000);

        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          this.audioChunks.push(event.data);
        });

        this.mediaRecorder.addEventListener("stop", async () => {
          clearInterval(this.recordingTimer);

          this.recordedBlob = new Blob(this.audioChunks, {
            type: "audio/mpeg", // or "audio/webm"
          });
          this.audioUrl = URL.createObjectURL(this.recordedBlob);

          this.$emit("voice-note", await this.blobToBase64(this.recordedBlob));

          // Stop all tracks to release mic/video
          stream.getTracks().forEach((track) => track.stop());
        });
      } catch (error) {
        console.error("Error accessing the microphone", error);
        alert("Mic error: " + error.message);
      }
    },

    async stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.isRecording = false;
        this.currentTime = this.recordingDuration;
        clearInterval(this.recordingTimer); // just to be safe
      }
    },
    togglePlay() {
      const audio = this.$refs.customAudioPlayer;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    },
    updateProgress() {
      const audio = this.$refs.customAudioPlayer;
      this.currentTime = Math.floor(audio.currentTime);
      this.progress = this.currentTime;
    },
    formatTime(sec) {
      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
};
</script>
