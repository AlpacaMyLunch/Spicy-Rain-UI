<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      Looking for the map? -> <v-btn text href="/altis" target="_blank" color="primary">Altis Map</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      title: "Spicy Rain",
    };
  },
};
</script>

<style scoped>
.v-application {
  background-color: #3d4d6e;
}
</style>
