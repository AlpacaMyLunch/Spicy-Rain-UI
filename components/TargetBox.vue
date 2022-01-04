<template>
  <div>
    <v-card elevation="16" class="rounded-xl" color="background darken-2">
      <v-card-title>
        {{ targetData.title }}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon small color="red darken-1" v-on:click="deleteDialog = true">
            mdi-delete
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        {{ subtitle }}
      </v-card-subtitle>
      <v-card-text>
        <div class="fe-basic">
          {{ targetData.calculated.extrapolation.elevation }}°
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-on:click="detailed = !detailed">
          <v-icon color="primary">
            {{ detailed ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </v-card-actions>

      <!--  DETAILED VIEW  -->
      <v-expand-transition>
        <div v-show="detailed">
          <v-card-text>
            <v-row>
              <v-col>
                <em>Range</em><br />
                {{ targetData.calculated.distance }}m
              </v-col>
              <v-col>
                <em>Alt +/-</em><br />
                {{ targetData.calculated.altDiff }}m
              </v-col>
              <v-col>
                <em>Azimuth</em><br />
                {{ targetData.calculated.azimuth }}°
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="condensed">
                  <b><u>Extrapolation</u></b><br>
                  {{ targetData.calculated.extrapolation.elevation }}°<br />
                  ~ {{ targetData.calculated.extrapolation.flight_time }} seconds<br />
                  {{ targetData.calculated.extrapolation.velocity }} m/s (final)
                </div>
              </v-col>
              <v-col>
                <div class="condensed">
                  <b><u>Equation</u></b><br>
                  {{ targetData.calculated.equation.elevation }}°<br />
                  ~ {{ targetData.calculated.equation.flight_time }} seconds<br />
                  {{ targetData.calculated.equation.velocity }} m/s (avg)
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <!-- Confirm dialog box -->
    <v-dialog v-model="deleteDialog" persistent max-width="250">
      <v-card>
        <v-card-title class="headline">Delete Target?</v-card-title>
        <v-card-text>Are you sure you wish to delete this target?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text v-on:click="deleteDialog = false">Cancel</v-btn>
          <v-btn text color="red darken-1" v-on:click="deleteTarget()">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["targetData"],
  data() {
    return {
      deleteDialog: false,
      detailed: false,
    };
  },
  computed: {
    subtitle() {
      //   {{ distance }}m, Alt: {{ altDiff }}m
      return (
        this.targetData.latitude +
        ", " +
        this.targetData.longitude +
        " (" +
        this.targetData.altitude +
        "m)"
      );
    },
  },
  methods: {
    async deleteTarget() {
      this.deleteDialog = false;
      this.$emit("delete", this.targetData.id);
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.fe-basic {
  color: green;
  font-size: 2.5em;
  text-align: center;
}
.rounded-card {
  border-radius: 50px;
}
.condensed {
  font-size: 0.9em;
}
</style>
