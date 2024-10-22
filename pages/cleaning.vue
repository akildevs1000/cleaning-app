<template>
  <span class="pt-15">
    <v-row>
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
          :items="rooms.DirtyRooms"
        />
        <WidgetsVacantRoomCard
          bgColor="#ddbc91"
          color="black"
          v-if="tabId == 1"
          :items="rooms.Occupied"
        />
        <WidgetsVacantRoomCard
          bgColor="#f5ece3"
          color="black"
          v-if="tabId == 2"
          :items="rooms.vacantRooms"
        />
        <WidgetsVacantRoomCard
          bgColor="#75a29f"
          color="white"
          v-if="tabId == 3"
          :items="rooms.blockedRooms"
        />
      </v-col>
    </v-row>
  </span>
</template>
<script>
export default {
  data() {
    return {
      tabId: 0,
      income: null,
      expense: null,
      history: [
        {
          icon: "mdi-walk",
          value: "00",
          label: "WALKING",
          col: 7,
          color: "green",
        },
        {
          icon: "mdi-laptop",
          value: "00",
          label: "OTA",
          col: 7,
          color: "blue",
        },
        {
          icon: "mdi-account-tie",
          value: "00",
          label: "Corporate",
          col: 7,
          color: "orange",
        },
        {
          icon: "mdi-cloud-outline",
          value: "00",
          label: "WebSite",
          col: 7,
          color: "purple",
        },
        {
          icon: "mdi-gift-outline",
          value: "00",
          label: "Complimentary",
          col: 7,
          color: "pink",
        },
        {
          icon: "mdi-account-outline",
          value: "00",
          label: "Travel Agent",
          col: 7,
          color: "teal",
        },
      ],
      cards: [],
      keyTabAll: 1,
      isActiveTab: 1,
      BookingQuickCheckInCompKey: 1,
      calenderColorCodes: [],
      tab: 0,
      filterDate: new Date().toJSON().slice(0, 10),
      menu2: false,
      colors: ["#92d050", "#ff0000", "#ffc000", "#0D652D", "#174EA6"],
      key: 1,
      reservation: [],
      rightClickRoomId: "",
      selected_booked_room_id: "",
      selected_booking_id: "",
      cancelCheckInDialog: false,
      checkInCancelReason: "",
      chart: {
        eco: 35,
      },

      check_out_menu: false,
      check_out: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      temp: "",
      isPageLoad: false,
      loading: false,
      cancelLoad: false,
      snackbar: false,
      response: "",
      isDirty: true,
      payingAdvance: false,

      ArrivalReportDialog: false,
      CheckOutReportDialog: false,
      InHouseDialog: false,
      FoodDialog: false,
      checkInDialog: false,
      checkInKey: 1,
      checkOutDialog: false,
      GRCDialog: false,
      postingDialog: false,
      viewPostingDialog: false,
      cancelDialog: false,
      NewBooking: false,

      formTitle: "",
      selectedItem: 0,
      showMenu: false,
      showMenuForNewBooking: false,

      bookingStatus: 0,
      eventStatus: "",
      x: 0,
      y: 0,

      elevations: [6, 12, 18],
      first_login_auth: 1,
      loading: true,

      logs: [],

      orders: "",
      products: "",
      customers: "",
      daily_orders: "",
      weekly_orders: "",
      monthly_orders: "",
      evenIid: "",
      eventStatus: "",
      rooms: [],
      postings: [],
      availableRooms: [],
      checkIn: [],
      checkOut: [],
      BookedRooms: [],
      reason: "",
      totalTransactionAmount: 0,
      new_payment: 0,
      new_advance: 0,
      AdvancePayLoading: false,
      reference: 0,
      full_payment: 0,
      isPrintInvoice: false,
      items: [],
      transactions: [],
      checkData: {},
      roomData: null,
      customerId: "",
      bookingId: "",
      document: null,
      lastTapTime: null,
      isDbCLick: false,
      members: {
        adult: 0,
        child: 0,
        total: 0,
      },
      foodOrdersCount: null,
      overAllBooking: null,
      progress: null,
      newBookingRoom: {},
      isIndex: true,

      showMenu: false,

      filtered: {
        AvailableRooms: [],
      },

      searchQuery: null,
      filterQuery: ``,
      from_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      to_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  watch: {
    fieldName() {},
  },
  created() {
    this.room_list();
  },

  methods: {
    setTabId(e) {
      this.tabId = e;
    },
    room_list() {
      let payload = {
        params: {
          // company_id: this.$auth.user && this.$auth.user.company.id,
          company_id: 3,
          check_in: new Date().toJSON().slice(0, 10),
          filter_date: this.filterDate,
        },
      };
      this.$axios.get(`room_list_grid`, payload).then(({ data }) => {
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

        this.members = data.members;
        this.foodOrdersCount = data.foodOrdersCount;
        this.Occupied = data.checkIn;

        this.cards = [
          {
            color: "white",
            bgColor: "#d9534f",
            label: "Dirty",
            value: dirtyRooms.length,
            sub_value: dirtyRooms.length || "0",
          },
          {
            color: "black",
            bgColor: "#ddbc91",
            label: "Occupied",
            value: Occupied.length,
            sub_value: Occupied.length || "0",
          },
          {
            color: "black",
            bgColor: "#f5ece3",
            label: "Vacant",
            value: vacantRooms.length,
            sub_value: vacantRooms.length || "0",
          },
          {
            color: "white",
            bgColor: "#75a29f",
            label: "Blocked",
            value: blockedRooms.length,
            sub_value: blockedRooms.length || "0",
          },
        ];

        this.overAllBooking = {
          total: allRoomList.length,
          colors: ["#91d23d", "#3a5824"],
          labels: [
            {
              color: `#91d23d`,
              text: `Sold`,
              value: sold.length,
            },
            {
              color: `#3a5824`,
              text: `Vacant`,
              value: vacantRooms.length,
            },
          ],
        };

        this.progress = {
          total: allRoomList.length,
          engaged: sold.length,
        };

        this.rooms = {
          DirtyRooms: data.dirtyRoomsList,
          Occupied: data.checkIn,
          vacantRooms,
          blockedRooms: data.blockedRooms,
        };

        this.isIndex = true;
        // setTimeout(() => {
        //   this.isPageLoad = true;
        // }, 100);
        this.keyTabAll += 1;
      });
    },
  },
};
</script>
