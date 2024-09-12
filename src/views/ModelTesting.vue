<template>
  <v-container>
    <h1 class="text-h4 mb-4">Model Testing</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
          v-model="prompt"
          label="Enter your prompt"
          rows="4"
        ></v-textarea>
        <v-btn color="primary" @click="testModel">Test Model</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Model Response</v-card-title>
          <v-card-text>
            <p v-if="response">{{ response }}</p>
            <p v-else>No response yet. Test the model to see results.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ModelTesting',
  setup() {
    const prompt = ref('')
    const response = ref('')

    const testModel = () => {
      // Logic to test the model will go here
      console.log('Testing model with prompt:', prompt.value)
      // For now, we'll just set a dummy response
      response.value = 'This is a sample response from the model.'
    }

    return {
      prompt,
      response,
      testModel
    }
  }
}
</script>