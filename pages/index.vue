<template>
  <span class="pt-15">
    <v-row>
      <v-col v-for="(item, index) in cards" :key="index">
        <AssetsCardSmall
          :key="index"
          :color="item.color"
          :bgColor="item.bgColor"
          :label="item.label"
          :value="item.value"
          :sub_value="item.sub_value"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card
          elevation="0"
          :style="`background-color:#f2f6f5; border-radius: 12px`"
          class="pt-1"
        >
          <v-container v-if="overAllBooking">
            <div>Overall Booking</div>
            <DonutSmall
              :key="keyTabAll"
              name="margin"
              :total="overAllBooking.total"
              :colors="overAllBooking.colors"
              :labels="overAllBooking.labels"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          height="120"
          elevation="0"
          dark
          class="text-center"
          :style="`background-color:#d9534f; border-radius: 12px`"
        >
          <div class="pt-2">
            <small class="px-1" style="font-size: 9px">Income</small>
            <div v-if="income" class="pa-1" style="font-size: 14px">
              {{ $utils.currency_format(income.total) }}
            </div>
          </div>
          <div class="pt-2">
            <small class="px-1" style="font-size: 9px">Expenses</small>
            <div v-if="expense" class="pa-1" style="font-size: 14px">
              {{ $utils.currency_format(expense.total) }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pt-3">
      <v-col cols="7">
        <WidgetsSevenDaysForCast />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <v-row>
          <v-col>
            <span style="font-size: 11px">Food</span>
          </v-col>
          <v-col class="text-right">
            <v-icon small color="purple">mdi-food</v-icon>
          </v-col>
          <v-col cols="12">
            <table v-if="foodOrdersCount" style="width: 100%">
              <tr
                v-for="(item, index) in [
                  {
                    color: `blue`,
                    text: `Breakfast`,
                    value: foodOrdersCount.breakfast,
                  },
                  {
                    color: `green`,
                    text: `Lunch`,
                    value: foodOrdersCount.lunch,
                  },
                  {
                    color: `orange`,
                    text: `Dinner`,
                    value: foodOrdersCount.dinner,
                  },
                ]"
                :key="index"
              >
                <td style="font-size: 11px" class="text-color border-bottom">
                  {{ item.text }}
                </td>
                <td
                  style="font-size: 11px"
                  class="text-color border-bottom text-right"
                >
                  <span>
                    {{ item.value == 0 ? 0 : parseInt(item.value) }}
                  </span>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-10">
      <v-col cols="12">
        <div style="font-size: 11px">Source</div>
      </v-col>
      <v-col v-for="(stat, index) in history" :key="index">
        <v-divider></v-divider>

        <div cols="pt-15" style="display: flex">
          <span class="pa-2">
            <v-icon small class="mx-1" :color="stat.color">{{
              stat.icon
            }}</v-icon>
            <small
              style="font-size: 9px; padding-top: 2px"
              class=""
              :class="`${stat.color}--text`"
            >
              {{ stat.value }}
            </small>
          </span>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-card
      elevation="0"
      :style="`background-color:#f2f6f5; border-radius: 12px`"
      class="pt-1 mt-3"
    >
      <v-container v-if="income">
        <v-row>
          <v-col cols="6">
            <div class="pb-2">Income</div>
            <table style="width: 100%">
              <tr>
                <td class="text-left text-color">Cash</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cash) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">UPI</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.UPI) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Online</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Online) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Bank</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Bank) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Cheque</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cheque) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">City Ledger</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.CityLedger) }}
                </td>
              </tr>
            </table>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="6">
            <div class="pb-2">&nbsp;</div>
            <table style="width: 100%">
              <tr>
                <td class="text-left text-color">Room</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cash) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Hall</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cash) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Posting</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cash) }}
                </td>
              </tr>
              <tr>
                <td class="text-left text-color">Others</td>
                <td class="text-right text-color">
                  {{ $utils.currency_format(income.Cash) }}
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </span>
</template>
<script>
export default {
  data() {
    return {
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
    this.getIncome();
    this.getExpense();
  },

  methods: {
    room_list() {
      let payload = {
        params: {
          company_id: this.$auth.user && this.$auth.user.company.id,
          check_in: new Date().toJSON().slice(0, 10),
          // check_in: this.filterDate,
          filter_date: this.filterDate,
        },
      };
      this.$axios.get(`room_list_grid`, payload).then(({ data }) => {
        if (!data.status) {
          this.alert("Failure!", data.data, "error");
          return false;
        }

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
            label: "Checkin",
            value: expectCheckOut.length + Occupied.length,
            sub_value: sold.length,
          },
          {
            color: "black",
            bgColor: "#ddbc91",
            label: "Checkout",
            value: dirtyRooms.length,
            sub_value: expectCheckOut.length || "0",
          },
          {
            color: "black",
            bgColor: "#f5ece3",
            label: "Continue",
            value: Occupied.length,
          },
          {
            color: "white",
            bgColor: "#75a29f",
            label: "Vacant",
            value: vacantRooms.length,
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

        this.isIndex = true;
        // setTimeout(() => {
        //   this.isPageLoad = true;
        // }, 100);
        this.keyTabAll += 1;
      });
    },
    getIncome() {
      let options = {
        params: {
          company_id: this.$auth.user.company.id,
          from_date: this.from_date,
          to_date: this.to_date,
          search: this.search,
        },
      };
      this.$axios.get(`payments`, options).then(({ data }) => {
        this.income = data.stats;
      });
    },
    getExpense() {
      let options = {
        params: {
          company_id: this.$auth.user.company.id,
          from_date: this.from_date,
          to_date: this.to_date,
        },
      };
      this.$axios.get(`expense-count`, options).then(({ data }) => {
        this.expense = data.stats;
      });
    },
  },
};
</script>
