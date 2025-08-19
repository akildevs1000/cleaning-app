<template>
  <v-app>
    <style scoped>
      .animated-border {
        padding: 3px;
        border-radius: 5px;
        background: linear-gradient(270deg, #42a5f5, #7e57c2, #ef5350, #42a5f5);
        background-size: 600% 600%;
        animation: borderMove 8s ease infinite;
        transition: box-shadow 0.3s ease-in-out;
      }

      .animated-border:hover {
        box-shadow: 0 0 20px rgba(66, 165, 245, 0.5);
      }

      .animated-border .v-card {
        border-radius: 5px; /* Slightly smaller to show border */
        background-color: #1e1e2f !important;
      }

      @keyframes borderMove {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    </style>

    <v-container
      class="fill-height d-flex flex-column justify-center align-center"
      fluid
    >
      <div class="mb-5">
        <!-- Logo -->
        <v-img src="/logo1.png" max-width="120" contain class=""></v-img>
      </div>

      <!-- Login Form -->
      <v-form
        ref="form"
        method="post"
        v-model="valid"
        class="pa-5"
        style="width: 100%; max-width: 360px"
      >
        <v-text-field
          v-model="pin"
          label="Enter 4-Digit PIN"
          maxlength="4"
          outlined
          dense
          hide-details
        ></v-text-field>
         <v-text-field class="mt-3"
          v-model="property_code"
          label="Enter Property Code"
          maxlength="10"
          outlined
          dense
          hide-details
        ></v-text-field>

        <!-- Error Message -->
        <span
          v-if="msg"
          class="error--text"
          style="font-size: 12px; display: inline-block; margin-bottom: 10px"
        >
          {{ msg }}
        </span>

        <!-- Login Button -->
        <v-btn
          block
          :loading="loading"
          @click="login"
          class="mt-2 white--text"
          style="background-color: #2c3e50"
        >
          Enter
        </v-btn>
      </v-form>

      <br>
       <WidgetsVoice />
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "login",
  data: () => ({
    remember: false,
    logo: "/logo1.png",
    valid: true,
    loading: false,
    snackbar: false,
    pin: "",
    property_code: "",
    device_id: "",
    msg: "",
  }),
  mounted() {
    this.device_id = this.generateDeviceId();
  },
  methods: {
    generateDeviceId() {
      const existing = localStorage.getItem("device_id");
      if (existing) return existing;

      const id =
        "DEV-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).substring(2, 10);
      localStorage.setItem("device_id", id);
      return id;
    },
    login() {
      if (this.$refs.form.validate()) {
        this.msg = "";
        this.loading = true;
        let credentials = {
          pin: this.pin,
          property_code: this.property_code,
          device_id: this.device_id, // ✅ Include device ID
        };
        this.$auth
          .loginWith(
            "local",
            { data: credentials },
            {
              "Access-Control-Allow-Origin": "*",
            }
          )
          .then(({ data }) => {
            this.$auth.user_verified_mobileotp = true;
            const updatedUser = Object.assign({}, this.$auth.user, {
              is_verified: 1,
            });
            this.$auth.setUser(updatedUser);
            if (this.remember) {
              localStorage.setItem("pin", this.pin);
              localStorage.setItem("property_code", this.property_code);
            } else {
              localStorage.removeItem("pin");
              localStorage.removeItem("property_code");
            }

            this.$router.push(`/`);
            // return;
          })
          .catch(({ response }) => {
            if (!response) {
              return false;
            }
            let { status, data, statusText } = response;
            this.msg = status == 422 ? data.message : statusText;
            setTimeout(() => (this.loading = false), 2000);
          });
      }
    },
  },
};
</script>
