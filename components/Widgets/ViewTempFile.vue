<template>
  <v-dialog v-model="dialog" height="300" width="300">
    <WidgetsClose left="290" @click="dialog = false" />
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on"
        ><v-img 
          v-bind="attrs"
          v-on="on"
          :src="src"
          :alt="altText"
          max-width="50"
          max-height="50"
          class="thumbnail activator"
          contain
          elevation="2"
          rounded
      /></span>
    </template>

    <v-card>
      <v-alert flat dense>{{ label }}</v-alert>
      <v-card-text>
        <v-img :src="src" :alt="altText"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: "View Photo",
    },
    icon: {
      type: String,
      required: true,
      default: "mdi-camera-outline",
    },
    src: {
      type: String,
      required: false,
      default: "",
    },
    altText: {
      type: String,
      default: "Image",
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
