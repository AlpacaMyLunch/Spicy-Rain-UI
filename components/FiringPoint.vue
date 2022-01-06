<template>
  <div>
    <v-card outlined color="background darken-1">
      <!-- <v-card-title> </v-card-title> -->
      <v-card-text>
        <span class="fp-title">Firing Point: </span> {{ latitude }},
        {{ longitude }} ({{ altitude }}m)
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary" v-bind="attrs" v-on="on">
              Update
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Firing Point</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Latitude"
                      v-model="newLatitude"
                      :rules="[rules.required, rules.minThree]"
                      dense
                      counter
                      :maxlength="latLonLen"
                      v-on:keyup="onlyNumbers"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Longitude"
                      v-model="newLongitude"
                      :rules="[rules.required, rules.minThree]"
                      dense
                      counter
                      :maxlength="latLonLen"
                      v-on:keyup="onlyNumbers"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Altitude"
                      v-model="newAltitude"
                      :rules="[rules.required]"
                      dense
                      counter
                      :maxlength="altLen"
                      v-on:keyup="onlyNumbers"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn icon @click="helpDialog = !helpDialog">
                <v-icon small>mdi-help</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelDialog()">Cancel</v-btn>
              <v-btn
                color="success"
                text
                @click="saveDialog()"
                :disabled="!formValid"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <GridHelp v-model="helpDialog" />
  </div>
</template>

<script>
import GridHelp from "@/components/GridHelp";

export default {
  components: { GridHelp },
  props: [],
  data() {
    return {
      dialog: false,
      helpDialog: false,
      formValid: false,
      latLonLen: 5,
      altLen: 3,
      latitude: "10000",
      longitude: "10000",
      altitude: "0",
      newLatitude: "10000",
      newLongitude: "10000",
      newAltitude: "0",
      rules: {
        required: (v) => !!v.toString() || "Required",
        minThree: (v) => v.length > 2 || "Minimum 3 digits",
      },
    };
  },
  computed: {},
  created: function () {
    this.validateForm();
  },
  methods: {
    onlyNumbers() {
      this.newLatitude = this.newLatitude.replace(/\D/g, "");
      this.newLongitude = this.newLongitude.replace(/\D/g, "");

      try {
        if (this.newAltitude != "" && this.newAltitude != "-") {
          try {
            this.newAltitude = parseInt(this.newAltitude);
          } catch (err) {
            this.newAltitude = "0";
          }
        }
      } catch (err) {
        console.log(err)
      }

      // lat and long can't start with a 0
      try {
        if (this.newLatitude.toString().charAt(0) === "0") {
          this.newLatitude = this.newLatitude.toString().slice(1)
        } else if (this.newLatitude != "") {
          try {
            this.newLatitude = parseInt(this.newLatitude).toString() || "";
          } catch (err) {
            this.newLatitude = "";
          }
        }
      } catch (err) {
        console.log(err)
      }

      try {
        if (this.newLongitude.toString().charAt(0) === "0") {
          this.newLongitude = this.newLongitude.toString().slice(1)
        } else if (this.newLongitude != "") {
          try {
            this.newLongitude = parseInt(this.newLongitude).toString() || "";
          } catch (err) {
            this.newLongitude = "";
          }
        }
      } catch (err) {
        console.log(err)
      }

      this.validateForm();
    },

    validateForm() {
      if (
        this.newLatitude.length < 3 ||
        this.newLongitude.length < 3 ||
        this.newAltitude.length === 0
      ) {
        this.formValid = false;
        return false;
      }

      if (
        this.latitude == this.newLatitude &&
        this.longitude == this.newLongitude &&
        this.altitude == this.newAltitude
      ) {
        this.formValid = false;
        return false;
      }

      this.formValid = true;
      return true;
    },
    cancelDialog() {
      this.dialog = false;
      this.newLatitude = this.latitude;
      this.newLongitude = this.longitude;
      this.newAltitude = this.altitude;
    },
    saveDialog() {
      this.dialog = false;
      this.latitude = this.newLatitude;
      this.longitude = this.newLongitude;
      this.altitude = this.newAltitude;
      this.$emit("update", null);
    },
  },
};
</script>
<style>
.fp-title {
  font-size: 1.2em;
  font-weight: bolder;
}
</style>
