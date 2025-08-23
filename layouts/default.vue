<template>
  <v-app>
    <style>
      body {
        font-size: 11px !important;
      }

      .text-color {
        color: #8a8a8a;
      }
      .border-top {
        border-top: 1px solid #e0e0e0;
      }
      .border-bottom {
        border-bottom: 1px solid #e0e0e0;
      }
    </style>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="white"
      class="pa-2"
      style="width: 175px !important"
    >
      <v-list dense>
        <!-- Active selection handler -->
        <v-list-item-group
          v-model="$store.state.floor_no"
          active-class="active-item"
        >
          <template
            v-for="(item, i) in [
              { id: null, number: null, name: `All Floors` },
              ...loadMenus,
            ]"
          >
            <v-list-item
              :key="i"
              :value="item.number"
              @click="
                () => {
                  $store.commit('setFloorNo', item.number);
                  drawer = false;
                }
              "
            >
              <v-list-item-action class="mr-2" style="min-width: auto">
                <v-icon small>mdi-apps</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title class="menu-title">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar
      fixed
      app
      dense
      flat
      :style="{ backgroundColor: currentColor }"
      @touchstart="handleTap"
    >
      <v-menu v-model="showPicker" offset-y>
        <v-color-picker v-model="currentColor"  />
      </v-menu>
      <v-row align="center">
        <v-col class="text-left" cols="4">
          <span class="text-overflow d-flex align-center">
             <v-icon @click.stop="drawer = !drawer" color="white">mdi-menu</v-icon>
          </span>
        </v-col>

        <v-col class="text-center white--text body-1" cols="4">
          MYHOTE2CLOUD
        </v-col>

        <v-col class="text-right" cols="4">
          <v-icon color="white" @click="logout">mdi-logout</v-icon>
        </v-col>
      </v-row>
    </v-app-bar> -->
    <v-main>
     <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap",
        },
      ],
    };
  },
  data() {
    return {
      tapCount: 0,
      showColorPicker: false,
      showPicker: false,
      currentColor: "#0b6339",
      tapTimeout: null,
      loadMenus: [],
      currentTime: "00:00:00",
      todayDate: "---",
      activeMenu: null, // Keep track of the active menu
      pendingNotificationsCount: 0,
      menuName: "",
      show: false,
      y: 0,
      x: 0,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      color: "",
      sideBarcolor: "background",
      year: new Date().getFullYear(),
      dropdown_menus: [{ title: "setting" }, { title: "logout" }],
      open_menu: [],
      drawer: false,
      fixed: false,
      order_count: "",
      items: [],
      filteredMenu: [],
      modules: {
        module_ids: [],
        module_names: [],
      },
      clipped: true,
      currentTime: "",

      title: "",
      logout_btn: {
        icon: "mdi-logout",
        label: "Logout",
      },
    };
  },

  created() {
    this.title = "MyHotel2Cloud"; // this.$auth.user?.company?.company_code;

    this.$router.push("/");

    this.setActive({
      label: "Dashboard",
      name: "dashboard",
    });

    this.getFloors();
  },

  mounted() {
    document.addEventListener("mousemove", this.updateMouseLocation);
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString([], { hour12: false });
    }, 1000);

    const now = new Date();

    // Format day, month, year, and day of the week
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(now);
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const year = now.getFullYear();

    // Construct the final date string
    this.todayDate = `${day}-${month}-${year}, ${dayName}`;
  },

  computed: {
    changeColor() {
      return this.$store.state.color;
    },

    getUser() {
      if (!this.$auth.user) {
        return "";
      }
      // return this.$auth.user.user_type == "employee"
      //   ? this.$auth.user.name
      //   : this.$auth.user.company.name;
      return this.$auth.user.name + " " + this.$auth.user.last_name;
    },

    getLogo() {
      return (this.$auth.user && this.$auth.user.image) || "/no-image.PNG";
    },
  },
  methods: {
    handleTap() {
      this.tapCount++;

      if (this.tapTimeout) clearTimeout(this.tapTimeout);

      this.tapTimeout = setTimeout(() => {
        this.tapCount = 0;
      }, 500); // Reset tap count if no tap in 0.5s

      if (this.tapCount === 3) {
        this.showColorPicker = !this.showColorPicker;
        this.tapCount = 0;
      }
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
            this.loadMenus = data;
          }
        });
    },
    goto(path = "/") {
      this.$router.push(path);
    },
    isActive(menu) {
      return this.activeMenu === menu;
    },
    setActive(menu) {
      console.log(menu);
      // return;
      this.activeMenu = menu;
      this.filteredMenu = this.items.filter((e) => e.topMenu == menu.name);
      this.$router.push(
        (this.filteredMenu[0] && this.filteredMenu[0].to) || "/"
      );
    },
    showTooltipMenu(e) {
      this.show = true;
      this.menuName = e;
    },
    gotoReservationPage() {
      this.pendingNotificationsCount = 0;
      this.$router.push("/reservation/up_coming");
    },
    loadNotificationMenu() {
      let company_id = this.$auth.user?.company?.id || 0;
      //console.log("company_id", company_id);
      if (company_id == 0) {
        return false;
      }
      let options = {
        params: {
          company_id: company_id,
        },
      };
      //this.pendingNotificationsCount = 0;
      let pendingcount = 0;
      this.$axios.get(`get-notifications-count`, options).then(({ data }) => {
        try {
          pendingcount = 0;
          //console.log("data.online_booking_count", data.online_booking_count);
          if (data.online_booking_count) {
            let storedRecords = localStorage.getItem("online_booking_count");

            //console.log("storedRecords", storedRecords);

            let nonMatching = [];

            for (let num of data.online_booking_count) {
              if (!storedRecords.includes(num) && !nonMatching.includes(num)) {
                nonMatching.push(num);
              }
            }

            //console.log("nonMatching", nonMatching);

            localStorage.setItem(
              "online_booking_count",
              data.online_booking_count
            );

            pendingcount = nonMatching.length; // += data.online_booking_count;
          }

          this.pendingNotificationsCount = pendingcount;
        } catch (Exp) {}
      });
    },
    updateMouseLocation(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    },

    changeTopBarColor(color) {
      this.color = color;
      this.$store.commit("change_color", color);
    },

    changeTheme(color) {
      // alert(color);
    },

    changeSideBarColor(color) {
      this.sideBarcolor = color;
    },

    caps(str) {
      return str.replace(/\b\w/g, (c) => c.toUpperCase());
    },

    goToSetting() {
      this.$router.push("/setting");
    },

    goToCompany() {
      let u = this.$auth.user.user_type;
      // if(u){
      // this.$router.push(`/empl/${this.$auth.user?.company?.id}`);
      // }
      this.$router.push(`/companies/${this.$auth.user?.company?.id}`);
    },

    goToReport() {
      this.$router.push(`/management/report/user`);
    },

    getCompanyDetails() {
      let user = this.$auth.user;

      this.$axios.get(`company/${user?.company?.id}`).then(({ data }) => {
        let { modules } = data.record;

        if (modules !== null) {
          this.modules = {
            module_ids: modules.module_ids || [],
            module_names: modules.module_names.map((e) => ({
              icon: "mdi-chart-bubble",
              title: this.caps(e),
              to: "/" + e + "_modules",
              permission: true,
            })),
          };
        }
      });
    },
    can(per) {
      let user = this.$auth.user;
      return (
        (user && user.permissions.some((e) => e == per || per == "/")) ||
        user.is_master
      );
    },

    async logout() {
      this.$axios.get(`/logout`).then(({ res }) => {
        this.$auth.logout();
      });
    },
  },
};
</script>
