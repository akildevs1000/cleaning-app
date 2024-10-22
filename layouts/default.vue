<template>
  <v-app class="main_bg">
    <style>
      body {
        font-size: 11px !important;
      }

      .text-color {
        color: #8a8a8a;
      }
    </style>
    <v-app-bar fixed app dense flat>
      <v-row align="center" no-gutters>
        <!-- Left side with location and date -->
        <v-col class="text-left" cols="4">
          <v-row no-gutters>
            <v-col cols="8">
              <div style="font-size: 11px" class="text-center text-color">
                <span class="text-color">
                  {{ $dateFormat.dmy(new Date()) }}</span
                >
                <br />
                <span class="text-color"> {{ currentTime }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <!-- Center title -->
        <v-col class="text-center" cols="4">
          <img src="/login/login-logo.png" style="width: 100%" />
          <br />
          <span class="text-color">{{ $auth?.user?.company?.name }}</span>
        </v-col>

        <!-- Right side with avatar -->
        <v-col class="text-right" cols="4">
          <v-menu
            nudge-bottom="50"
            nudge-left="20"
            transition="scale-transition"
            origin="center center"
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-avatar v-bind="attrs" v-on="on">
                <img :src="getLogo || '/no-image.PNG'" />
              </v-avatar>
            </template>

            <v-list light nav dense>
              <v-list-item-group color="primary">
                <v-list-item @click="goToCompany()">
                  <v-list-item-icon>
                    <v-icon>mdi-account-multiple-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="grey--text"
                      >Profile</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="goToReport()">
                  <v-list-item-icon>
                    <v-icon>mdi mdi-text-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="grey--text"
                      >Report</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="grey--text"
                      >Logout</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer fixed app dense flat class="white pb-5">
      <v-row align="center" no-gutters>
        <v-col cols="12" class="mb-1">
          <v-divider></v-divider>
        </v-col>
        <!-- Left side with location and date -->
        <v-col class="text-center">
          <v-icon color="#968f9f">mdi-home</v-icon>
        </v-col>
        <v-col class="text-center">
          <v-icon color="#b8afaa" to="/cleaning">mdi-bed</v-icon>
        </v-col>
        <v-col class="text-center">
          <v-icon color="#cfbeb4">mdi-cash-multiple</v-icon>
        </v-col>
        <v-col class="text-center">
          <v-icon color="#b1b6ba">mdi-chart-areaspline</v-icon>
        </v-col>
      </v-row>
    </v-footer>
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
      currentTime: "00:00:00",
      todayDate: "---",
      activeMenu: null, // Keep track of the active menu
      topMenus: [
        {
          label: "Dashboard",
          name: "dashboard",
        },
        {
          label: "Customer",
          name: "customer",
        },
        {
          label: "Account",
          name: "account",
        },
        {
          label: "Sales",
          name: "sales",
        },
        {
          label: "Reports",
          name: "reports",
        },
        {
          label: "Setting",
          name: "setting",
        },
      ],
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
      clipped: false,
      open_menu: [],
      drawer: true,
      fixed: false,
      order_count: "",
      menus: [
        {
          topMenu: "dashboard",
          icon: "mdi-home",
          title: "Home",
          to: "/",
          menu: "dashboard",
        },
        {
          topMenu: "dashboard",
          icon: "mdi-calendar",
          title: "Calendar",
          to: "/hotel/calendar1",
          menu: "calendar_access",
        },
        {
          topMenu: "reports",
          icon: "mdi-chart-areaspline",
          title: "Analytics",
          to: "/reports",
          menu: "dashboard",
        },
        {
          topMenu: "reports",
          icon: "mdi-chart-areaspline",
          title: "Night Audit",
          to: "/management/report/night_audit",
          menu: "night_audit_access",
        },
        {
          topMenu: "dashboard",
          icon: "mdi-bed",
          title: "History",
          to: "/history",
          menu: "guest_access",
        },
        // {
        //   topMenu: "customer",
        //   icon: "mdi mdi-account-tie",
        //   title: "Guest",
        //   to: "/customer/list",
        //   menu: "guest_access",
        // },
        {
          topMenu: "customer",
          icon: "mdi-ticket-account",
          title: "Customers",
          to: "/source",
          menu: "source_access",
        },
        {
          topMenu: "account",
          icon: "mdi-bank-transfer",
          title: "Income",
          to: "/account",
          menu: "accounts_posting_access",
        },

        {
          topMenu: "account",
          icon: "mdi-bank-transfer",
          title: "City Ledger",
          to: "/city_ledger",
          menu: "accounts_posting_access",
        },

        {
          topMenu: "sales",
          icon: "mdi-cash",
          title: "Inquiry",
          to: "/inquiry",
          menu: "accounts_posting_access",
        },
        {
          topMenu: "sales",
          icon: "mdi-cash",
          title: "Quotation",
          to: "/sales",
          menu: "accounts_posting_access",
        },
        {
          topMenu: "sales",
          icon: "mdi-cash",
          title: "Invoice",
          to: "/invoices",
          menu: "accounts_posting_access",
        },
        {
          topMenu: "account",
          icon: "mdi mdi-food",
          title: "Posting",
          to: "/posting",
          menu: "accounts_posting_access",
        },
        {
          topMenu: "account",
          icon: "mdi mdi-bank-transfer-out",
          title: "Expense",
          to: "/expense",
          menu: "accounts_expences_access",
        },
        {
          topMenu: "account",
          icon: "mdi-cash",
          title: "GST Bills",
          to: "/taxable",
          menu: "accounts_gst_access",
        },
        {
          topMenu: "account",
          icon: "mdi-account",
          title: "Vendor",
          to: "/vendors",
          menu: "accounts_posting_access",
        },

        {
          topMenu: "dashboard",
          icon: "mdi-home-search-outline",
          title: "Lost & Found  ",
          to: "/lost_and_found_items",
          menu: "lost_and_found_access",
        },
        {
          topMenu: "setting",
          icon: "mdi mdi-account-details",
          title: "Company",
          to: "/companies",
          menu: "settings_permissions_access",
        },
        {
          topMenu: "setting",
          icon: "mdi-email",
          title: "Automation",
          to: "/template",
          menu: "settings_rooms_category_access",
        },
        {
          topMenu: "setting",
          icon: "mdi-bed",
          title: "Rooms",
          to: "/room_category",
          menu: "settings_rooms_category_access",
        },
        {
          topMenu: "setting",
          icon: "mdi-sofa", // give appropriate icon here
          title: "Hall",
          to: "/hall",
          menu: "settings_rooms_category_access",
        },
        {
          topMenu: "setting",
          icon: "mdi-tools",
          title: "Price Setup",
          to: "/manage",
          menu: "settings_room_price_access",
        },
        {
          topMenu: "setting",
          icon: "mdi-cog",
          title: "Setup",
          to: "/setup",
          menu: "settings_room_price_access",
        },
        {
          topMenu: "setting",
          icon: "mdi mdi-account-tie",
          title: "Employee",
          to: "/employee",
          menu: "settings_users_access",
        },
        {
          topMenu: "setting",
          icon: "mdi mdi-account-details",
          title: "Devices",
          to: "/devices",
          menu: "devices_permissions_access",
        },
        {
          topMenu: "setting",
          icon: "mdi mdi-account-check-outline",
          title: "Roles",
          to: "/role",
          menu: "settings_roles_access",
        },
      ],
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
    setTimeout(() => {
      this.loadNotificationMenu();
    }, 1000 * 60);
    setInterval(() => {
      this.loadNotificationMenu();
    }, 1000 * 60 * 5);
    let user = this.$auth.user;
    let permissions = user.permissions;

    this.menus.forEach((ele) => {
      if (
        permissions.includes(ele.menu) ||
        this.$auth.user.user_type == "company"
      ) {
        this.items.push(ele);
      }
    });

    this.getCompanyDetails();

    this.filteredMenu = this.items;
    this.$router.push(this.filteredMenu[0].to ?? "/");

    this.setActive({
      label: "Dashboard",
      name: "dashboard",
    });
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
