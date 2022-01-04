<template>
  <v-dialog v-model="show" max-width="450px">
    <v-card>
      <v-card-title>Grid Help</v-card-title>
      <v-card-text>
        <v-container>
          <p>
            Arma 3 provides a map with a six digit grid - three for the latitude
            and three for the longitude. A six digit grid represents a 100m x
            100m square.
          </p>

          <p>
            To be more accurate you will need to estimate an eight digit grid -
            four for the latitude and four for the longitude. This will
            represent a 10m x 10m square.
          </p>

          <p>
            A ten digit grid will give the best results however this is
            difficult to estimate on the map provided. If you are playing on the
            Altis map you should consider using the map version of this
            calculator as it will automatically provide a 10 digit grid as well
            as an altitude.
          </p>

          <p>Altitude is a very important aspect of the calculations.</p>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
