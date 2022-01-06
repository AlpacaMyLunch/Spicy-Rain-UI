<template>
  <div>
    <v-dialog v-model="show" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Target</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8" sm="8" md="8">
                <v-text-field
                  label="Title"
                  v-model="newTitle"
                  :rules="[rules.required]"
                  dense
                  maxlength="30"
                  counter
                  v-on:keyup="validateForm"
                ></v-text-field> </v-col
              ><v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Latitude"
                  v-model="newLatitude"
                  :rules="[rules.required, rules.minFour]"
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
                  :rules="[rules.required, rules.minFour]"
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
    <GridHelp v-model="helpDialog" />
  </div>
</template>

<script>
import GridHelp from "@/components/GridHelp";

export default {
  props: {
    value: Boolean,
  },
  components: {
    GridHelp,
  },
  data() {
    return {
      helpDialog: false,
      latLonLen: 5,
      altLen: 3,
      newLatitude: "",
      newLongitude: "",
      newAltitude: "",
      newTitle: "",
      formValid: false,
      rules: {
        required: (v) => !!v.toString() || "Required",
        minFour: (v) => v.length > 2 || "Minimum 3 digits",
      },
    };
  },
  created: function () {
    this.validateForm();
  },
  methods: {
    cancelDialog() {
      this.newAltitude = "";
      this.newLongitude = "";
      this.newLatitude = "";
      this.newTitle = "";
      this.show = false;
    },
    saveDialog() {
      this.onlyNumbers();
      let tgt = {
        latitude: this.newLatitude,
        longitude: this.newLongitude,
        altitude: this.newAltitude,
        title: this.newTitle,
      };
      this.$emit("new", tgt);
      this.newAltitude = "";
      this.newLatitude = "";
      this.newLongitude = "";
      this.newTitle = "";
      this.show = false;
    },
    validateForm() {
      if (this.newTitle.length === 0) {
        this.formValid = false;
        return false;
      }
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
