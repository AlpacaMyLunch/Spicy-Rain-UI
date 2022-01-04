<template>
  <v-container>
    <v-row>
      <!-- FIRING POINT -->
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <FiringPoint ref="fpDetails" @update="fpUpdate" />
      </v-col>
      <!-- /END FIRING POINT -->
      <v-spacer></v-spacer>

      <!-- ADD TARGET BUTTON -->
      <v-btn
        text
        color="secondary"
        ripple
        v-on:click="newTargetDialog = !newTargetDialog"
      >
        <v-icon small>mdi-plus</v-icon>
        Add Target
      </v-btn>

      <NewTarget v-model="newTargetDialog" @new="newTarget" />

      <!-- /END ADD TARGET BUTTON -->

      <!-- TEST BUTTON -->

      <v-btn text color="info" v-on:click="addTestTargets">TEST</v-btn>
      <!-- /END TEST BUTTON -->
    </v-row>

    <v-row>
      <v-divider inset></v-divider>
    </v-row>

    <!-- TARGET LIST -->
    <v-row justify="center" align="center">
      <v-col
        v-for="target in targets"
        :key="target.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <TargetBox :targetData="target" @delete="deleteTarget" />
      </v-col>
    </v-row>
    <!-- /END TARGET LIST -->
  </v-container>
</template>

<script>
import TargetBox from "@/components/TargetBox";
import FiringPoint from "@/components/FiringPoint";
import NewTarget from "@/components/NewTarget";
import FATDSService from "@/functions/api";

export default {
  components: {
    TargetBox,
    FiringPoint,
    NewTarget,
  },

  methods: {
    deleteTarget(id) {
      // Remove target from list
      let tgt = this.targets.filter((obj) => obj.id === id)[0];

      this.targets = this.targets.filter((item) => item.id !== id);
    },
    async fpUpdate() {
      // Firing point moved.  Update all targets.

      if (this.targets.length === 0) {
        return;
      }

      const fp = this.$refs.fpDetails;

      let resp = await FATDSService.MultiTarget(fp, this.targets);

      // match the API response with the targets in memory
      for (const idx in resp) {
        for (const tIdx in this.targets) {
          if (
            //does everything match?
            this.targets[tIdx].latitude == resp[idx].latitude &&
            this.targets[tIdx].longitude == resp[idx].longitude &&
            this.targets[tIdx].altitude == resp[idx].altitude
          ) {
            // make the update
            this.targets[tIdx].calculated = resp[idx];
          }
        }
      }
    },
    async newTarget(tgt) {
      // add a new target
      tgt.id = this.idIncrement;
      this.idIncrement += 1;

      const fp = this.$refs.fpDetails;

      let resp = await FATDSService.SingleTarget(fp, tgt);

      tgt.calculated = resp;

      this.targets.push(tgt);
    },
    addTestTargets() {
      // add 5 targets for quick testing

      const fp = this.$refs.fpDetails;

      const minCoordLat = parseInt(fp.latitude) - 2000;
      const maxCoordLat = parseInt(fp.latitude) + 2000;
      const minCoordLon = parseInt(fp.longitude) - 2000;
      const maxCoordLon = parseInt(fp.longitude) + 2000;
      const minAlt = -50;
      const maxAlt = 130;
      for (let i = 0; i < 5; i++) {
        this.newTarget({
          latitude: this.randomIntFromInterval(minCoordLat, maxCoordLat),
          longitude: this.randomIntFromInterval(minCoordLon, maxCoordLon),
          altitude: this.randomIntFromInterval(minAlt, maxAlt),
          title: "Test Target " + this.idIncrement,
        });
      }
    },

    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  data() {
    return {
      newTargetDialog: false,
      idIncrement: 0,
      targets: [],
    };
  },
};
</script>
