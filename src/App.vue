<template>
  <v-app>
    <v-app-bar app color="white" elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6 font-weight-bold">
        <v-icon color="red darken-3" left>mdi-fruit-cherries</v-icon>
        Strawberry Phi
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/" link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/new-job" link>
          <v-list-item-icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>New Fine-tuning Job</v-list-item-title>
        </v-list-item>
        <v-list-item to="/jobs" link>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Job Status</v-list-item-title>
        </v-list-item>
        <v-list-item to="/test" link>
          <v-list-item-icon>
            <v-icon>mdi-test-tube</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Model Testing</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const drawer = ref(false)

    return {
      drawer
    }
  }
}
</script>

<style>
.v-application {
  background-color: #f5f5f5 !important;
}

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #b71c1c;
}
</style>