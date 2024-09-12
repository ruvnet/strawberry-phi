<template>
  <v-container>
    <h1 class="text-h4 mb-4">New Fine-tuning Job</h1>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Upload File</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Select Model</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Configure</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="200px">
            <!-- File upload component will go here -->
          </v-card>
          <v-btn color="primary" @click="step = 2">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" height="200px">
            <!-- Model selection component will go here -->
          </v-card>
          <v-btn color="primary" @click="step = 3">Continue</v-btn>
          <v-btn text @click="step = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="200px">
            <!-- Configuration component will go here -->
          </v-card>
          <v-btn color="primary" @click="startJob">Start Job</v-btn>
          <v-btn text @click="step = 2">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NewJob',
  setup() {
    const step = ref(1)

    const startJob = () => {
      // Logic to start the job will go here
      console.log('Starting new job')
    }

    return {
      step,
      startJob
    }
  }
}
</script>