<template>
  <v-container>
    <h1 class="text-h4 mb-4">Dashboard</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Active Jobs</v-card-title>
          <v-card-text>
            <p>No active jobs at the moment.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Recent Jobs</v-card-title>
          <v-card-text>
            <p>No recent jobs to display.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>