<template>
  <div>
    <v-card max-width="350px" color="background darken-1" outlined>
      <v-card-title>Line of Sight Calculator</v-card-title>
      <v-card-subtitle
        >Uses range and elevation from the laser designator.</v-card-subtitle
      >
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="Range"
                v-model="range"
                :rules="[rules.required]"
                dense
                maxlength="4"
                v-on:keyup="onlyNumbers"
              >
              </v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="Elevation"
                v-model="elevation"
                :rules="[rules.required]"
                dense
                maxlength="5"
                v-on:keyup="onlyNumbers"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- extrapolation -->
            <v-col v-if="firingData.extrapolation">
                <em>Extrapolation</em>
                <div class="fe-los">{{ firingData.extrapolation.elevation }}°</div>
                ~ {{ firingData.extrapolation.flight_time }} seconds<br>
                {{ firingData.extrapolation.velocity }} m/s (final)
            </v-col>

            <!-- equation -->
            <v-col v-if="firingData.equation">
                <em>Equation</em>
                <div class="fe-los">{{ firingData.equation.elevation }}°</div>
                ~ {{ firingData.equation.flight_time }} seconds<br>
                {{ firingData.equation.velocity }} m/s (average)
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text v-on:click="calculate" color="primary" :disabled="!formValid">Calculate</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import FATDSService from "@/functions/api";

export default {
  name: "Line of Sight",

  components: {},

  methods: {
    onlyNumbers() {
      this.range = this.range.replace(/\D/g, "");

      try {
        if (
          this.elevation != "" &&
          this.elevation != "-" &&
          this.elevation.slice(-1) != "."
        ) {
          try {
            this.elevation = parseFloat(this.elevation);
          } catch (err) {
            this.elevation = "0";
          }
        }
      } catch (err) {
        this.validateForm()
        return;
      }
      this.validateForm()
    },
    validateForm() {
      if (
        this.elevation.length === 0 ||
        this.range.length === 0 || 
        parseInt(this.range) < 500
      ) {
        this.formValid = false;
        return false;
      }


      this.formValid = true;
      return true;
    },
    async calculate() {
      let resp = await FATDSService.LineOfSight(this.range, this.elevation);
      this.firingData = resp;
    },
  },

  data: () => ({
    range: "0",
    elevation: "0",
    firingData: {},
    formValid: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
};
</script>

<style>
.fe-los{
    color: green;
    font-size: 2em;
    /* text-align: center; */
    padding-top: 5px;
}
</style>