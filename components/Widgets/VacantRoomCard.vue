<template>
  <span class="px-5">
    <v-row no-gutters v-if="items && items.length > 0">
      <v-col cols="2" v-for="(item, index) in items" :key="index">
        <div class="ma-1 text-center" style="border-radius: 12px">
          <v-card
            rounded
            elevation="0"
            dark
            class="pa-2 mx-auto"
            :style="`background-color:${bgColor};color:${color};`"
          >
            <span>{{
              item.room_no.length < 5
                ? item.room_no
                : item.room_no.slice(0, 5) + "..."
            }}</span>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-col cols="12">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #d3d3d3;
            border-radius: 3px;
            min-height: 200px;
          "
        >
          No Room
        </div>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {
  props: ["items","bgColor", "color"],
};
</script>
