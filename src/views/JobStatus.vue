<template>
  <v-container>
    <h1 class="text-h4 mb-4">Job Status</h1>
    <v-data-table
      :headers="headers"
      :items="jobs"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'JobStatus',
  setup() {
    const headers = [
      { title: 'Job ID', key: 'id' },
      { title: 'Model', key: 'model' },
      { title: 'Status', key: 'status' },
      { title: 'Created At', key: 'createdAt' },
    ]

    const jobs = ref([
      // Sample data, replace with actual job data
      {
        id: '1',
        model: 'GPT-4o',
        status: 'In Progress',
        createdAt: '2023-04-01 10:00:00',
      },
      {
        id: '2',
        model: 'GPT-4o-mini',
        status: 'Completed',
        createdAt: '2023-03-31 15:30:00',
      },
    ])

    return {
      headers,
      jobs,
    }
  }
}
</script>