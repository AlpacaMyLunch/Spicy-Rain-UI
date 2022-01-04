<template>
  <v-container fluid>

        <v-tabs
          v-model="tab"
          centered
          icons-and-text
          color="secondary"
          background-color="transparent"
          grow
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#targetlist">
            Target List
            <v-icon>mdi-playlist-edit</v-icon>
          </v-tab>
          <v-tab href="#lineofsight">
            Line of Sight
            <v-icon>mdi-binoculars</v-icon>
          </v-tab>

        </v-tabs>


        <!-- Tab 1 - Target List -->
        <v-tabs-items v-model="tab" style="background-color: #3d4d6e">
          <v-tab-item key="targetlist" id="targetlist">
            <v-container class="py-6">
              <TargetList />
            </v-container>
          </v-tab-item>

          <!-- Tab 2 - Line of Sight -->
          <v-tab-item key="lineofsight" id="lineofsight">
            <v-container class="py-6">
            <v-row>
            <v-spacer></v-spacer>
              <LineOfSight /> 
              <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-tab-item>


        </v-tabs-items>


  </v-container>
</template>

<script>
import LineOfSight from "@/components/LineOfSight";
import TargetList from "@/components/TargetList";

export default {
  name: "FATDS",

  components: {
    LineOfSight,
    TargetList
    
  },

  methods: {
  },

  data: () => ({
    tab: null,
  }),
};
</script>
